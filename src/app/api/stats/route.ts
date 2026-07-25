import { NextRequest, NextResponse } from "next/server";
import { redis, isRedisConfigured } from "@/lib/redis";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { codes } = body;

    if (!Array.isArray(codes) || codes.length === 0) {
      return NextResponse.json({ stats: {} });
    }

    if (!isRedisConfigured() || !redis) {
      return NextResponse.json({ stats: {} });
    }

    const stats: Record<string, number> = {};

    // Pipeline or mget to fetch all click counts efficiently
    const keys = codes.map((c) => `clicks:${c}`);
    const results = await redis.mget<Array<number | null>>(...keys);

    codes.forEach((code, index) => {
      const val = results[index];
      stats[code] = typeof val === "number" ? val : Number(val) || 0;
    });

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error in /api/stats:", error);
    return NextResponse.json({ stats: {} });
  }
}
