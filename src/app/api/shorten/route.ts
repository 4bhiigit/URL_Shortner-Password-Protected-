import { NextRequest, NextResponse } from "next/server";
import { redis, isRedisConfigured } from "@/lib/redis";
import { generateShortCode, isValidUrl, validateAlias } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let { url, customAlias, password, expiresIn } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Please provide a valid URL." },
        { status: 400 }
      );
    }

    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    if (!isValidUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL format. Please include a valid domain name." },
        { status: 400 }
      );
    }

    if (!isRedisConfigured() || !redis) {
      return NextResponse.json(
        {
          error: "Upstash Redis credentials are not configured correctly in environment variables.",
        },
        { status: 500 }
      );
    }

    let code = "";

    if (customAlias && typeof customAlias === "string" && customAlias.trim().length > 0) {
      const trimmedAlias = customAlias.trim();
      const validation = validateAlias(trimmedAlias);
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.message },
          { status: 400 }
        );
      }

      const existing = await redis.get(`url:${trimmedAlias}`);
      if (existing) {
        return NextResponse.json(
          { error: "This custom alias is already taken. Try another one!" },
          { status: 409 }
        );
      }
      code = trimmedAlias;
    } else {
      code = generateShortCode();
      let attempts = 0;
      while (attempts < 5) {
        const existing = await redis.get(`url:${code}`);
        if (!existing) break;
        code = generateShortCode();
        attempts++;
      }
    }

    const ttlSeconds = typeof expiresIn === "number" && expiresIn > 0 ? expiresIn : 0;
    const expiresAt = ttlSeconds > 0 ? Date.now() + ttlSeconds * 1000 : undefined;

    const dataPayload = {
      url,
      password: password && typeof password === "string" && password.trim() ? password.trim() : undefined,
      createdAt: Date.now(),
      expiresAt,
    };

    await redis.set(`url:${code}`, JSON.stringify(dataPayload));
    await redis.set(`clicks:${code}`, 0);

    if (ttlSeconds > 0) {
      await redis.expire(`url:${code}`, ttlSeconds);
      await redis.expire(`clicks:${code}`, ttlSeconds);
    }

    const origin = req.nextUrl.origin;
    const shortUrl = `${origin}/${code}`;

    return NextResponse.json({
      code,
      shortUrl,
      originalUrl: url,
      createdAt: Date.now(),
      expiresAt,
      isProtected: Boolean(dataPayload.password),
      clicks: 0,
    });
  } catch (error: any) {
    console.error("Error in /api/shorten:", error);
    
    // Security masking: Ensure API tokens/headers are never exposed in UI error responses
    const rawMsg = error?.message || "";
    if (rawMsg.includes("Bearer") || rawMsg.includes("header") || rawMsg.includes("token")) {
      return NextResponse.json(
        { error: "Invalid Upstash Redis Token. Please check for line breaks or duplicate text in your Vercel Environment Variables." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: rawMsg || "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
