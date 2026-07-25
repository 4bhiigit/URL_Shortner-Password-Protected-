import { NextRequest, NextResponse } from "next/server";
import { redis, isRedisConfigured } from "@/lib/redis";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code;

  if (!code || !isRedisConfigured() || !redis) {
    return NextResponse.redirect(new URL(`/not-found?code=${code || ""}`, req.url));
  }

  try {
    const rawData = await redis.get<string | object>(`url:${code}`);

    if (rawData) {
      let targetUrl = "";
      let requiredPassword: string | undefined = undefined;
      let expiresAt: number | undefined = undefined;

      if (typeof rawData === "string") {
        try {
          const parsed = JSON.parse(rawData);
          if (parsed && typeof parsed === "object" && parsed.url) {
            targetUrl = parsed.url;
            requiredPassword = parsed.password;
            expiresAt = parsed.expiresAt;
          } else {
            targetUrl = rawData; // legacy plain string
          }
        } catch {
          targetUrl = rawData; // legacy plain string
        }
      } else if (typeof rawData === "object" && (rawData as any).url) {
        targetUrl = (rawData as any).url;
        requiredPassword = (rawData as any).password;
        expiresAt = (rawData as any).expiresAt;
      }

      // Check Expiration
      if (expiresAt && Date.now() > expiresAt) {
        return NextResponse.redirect(new URL(`/not-found?code=${code}&reason=expired`, req.url));
      }

      // Check Password Protection
      if (requiredPassword) {
        const searchParams = req.nextUrl.searchParams;
        const pwd = searchParams.get("pwd");

        if (!pwd || pwd !== requiredPassword) {
          const isError = Boolean(pwd && pwd !== requiredPassword);

          // Render Password Challenge HTML Page
          const html = `
          <!DOCTYPE html>
          <html lang="en" class="dark">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Protected Link | LinkPulse</title>
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body { background-color: #020617; color: #f8fafc; font-family: system-ui, sans-serif; }
            </style>
          </head>
          <body class="min-h-screen flex items-center justify-center p-4">
            <div class="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-center">
              <div class="w-12 h-12 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20 flex items-center justify-center mx-auto">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              
              <div class="space-y-2">
                <h1 class="text-2xl font-bold text-white">Password Protected Link</h1>
                <p class="text-xs text-slate-400">Enter the access password to proceed to your destination.</p>
              </div>

              ${
                isError
                  ? `<div class="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs">
                      Incorrect password. Please try again!
                     </div>`
                  : ""
              }

              <form method="GET" action="/${code}" class="space-y-4">
                <input 
                  type="password" 
                  name="pwd" 
                  placeholder="Enter Password" 
                  required 
                  autofocus
                  class="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-center font-mono"
                />
                <button 
                  type="submit" 
                  class="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/25"
                >
                  Access Link &rarr;
                </button>
              </form>
            </div>
          </body>
          </html>
          `;

          return new NextResponse(html, {
            headers: { "Content-Type": "text/html" },
          });
        }
      }

      if (targetUrl) {
        // Asynchronously increment click count in Redis
        redis.incr(`clicks:${code}`).catch((err) => {
          console.error(`Failed to increment click count for ${code}:`, err);
        });

        // Redirect 302 to target URL
        return NextResponse.redirect(targetUrl, { status: 302 });
      }
    }
  } catch (error) {
    console.error(`Error redirecting code '${code}':`, error);
  }

  return NextResponse.redirect(new URL(`/not-found?code=${code}`, req.url));
}
