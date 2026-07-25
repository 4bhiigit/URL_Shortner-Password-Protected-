"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Link2Off, ArrowLeft, PlusCircle, Sparkles } from "lucide-react";
import { Suspense } from "react";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center p-4 bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 shadow-lg shadow-red-500/5 mb-2">
          <Link2Off className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Link Not Found
          </h1>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {code ? (
              <>
                The short link code <span className="font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-indigo-400 font-semibold">{code}</span> does not exist or has been removed.
              </>
            ) : (
              "The link you are trying to access does not exist or may have been deleted."
            )}
          </p>
        </div>

        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl text-xs text-slate-400 space-y-1">
          <p className="font-medium text-slate-300">Looking to shorten a long URL?</p>
          <p>You can generate your own custom short link in seconds on our homepage.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            Create Short Link
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center">
        <p className="text-slate-400">Loading...</p>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}
