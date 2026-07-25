"use client";

import { useState, useEffect, useRef } from "react";
import {
  Link2,
  Copy,
  Check,
  QrCode,
  ExternalLink,
  Trash2,
  Sparkles,
  Zap,
  RotateCw,
  AlertCircle,
  BarChart2,
  X,
  Lock,
  Clock,
  Download,
  Share2,
  Search,
  SlidersHorizontal,
  AtSign,
  ShieldCheck,
  Timer,
  ArrowRight,
  Activity,
  MousePointer,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { EXPIRATION_OPTIONS } from "@/lib/utils";

interface ShortenedLink {
  code: string;
  shortUrl: string;
  originalUrl: string;
  createdAt: number;
  expiresAt?: number;
  isProtected?: boolean;
  clicks: number;
}

export default function HomePage() {
  const [url, setUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [password, setPassword] = useState("");
  const [expiresIn, setExpiresIn] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<ShortenedLink | null>(null);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [recentLinks, setRecentLinks] = useState<ShortenedLink[]>([]);
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Animated Subtitle Cycler Index
  const [typedTextIndex, setTypedTextIndex] = useState(0);
  const cyclingTexts = [
    "Shorten Long URLs Instantly",
    "Generate Downloadable PNG QR Codes",
    "Lock Links with Passwords",
    "Track Real-time Click Analytics",
  ];

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrInlineRef = useRef<HTMLDivElement>(null);
  const qrModalRef = useRef<HTMLDivElement>(null);

  // Cycling subtitle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedTextIndex((prev) => (prev + 1) % cyclingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // 🌐 Interactive JS Canvas Particle & Mouse Attraction Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ["#818cf8", "#a855f7", "#ec4899", "#38bdf8", "#34d399"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129, 140, 248, ${0.35 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.6 * (1 - mdist / 150)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // 🎉 Trigger JavaScript Particle Celebration Burst
  const triggerCelebrationBurst = () => {
    const canvas = confettiCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 80;
    const confettis: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;
      rotation: number;
      rotSpeed: number;
      opacity: number;
    }> = [];

    const colors = ["#818cf8", "#a855f7", "#ec4899", "#34d399", "#fbbf24", "#38bdf8"];
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 3;

    for (let i = 0; i < confettiCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 10 + 4;
      confettis.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        opacity: 1,
      });
    }

    let frame = 0;
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      for (const c of confettis) {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.25;
        c.rotation += c.rotSpeed;
        c.opacity -= 0.015;

        if (c.opacity > 0) {
          alive = true;
          ctx.save();
          ctx.translate(c.x, c.y);
          ctx.rotate(c.rotation);
          ctx.globalAlpha = Math.max(0, c.opacity);
          ctx.fillStyle = c.color;
          ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
          ctx.restore();
        }
      }

      frame++;
      if (alive && frame < 120) {
        requestAnimationFrame(anim);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
    anim();
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("linkpulse_recent_links");
      if (stored) {
        const parsed: ShortenedLink[] = JSON.parse(stored);
        setRecentLinks(parsed);
        refreshStats(parsed);
      }
    } catch (e) {
      console.error("Failed to load recent links from localStorage:", e);
    }
  }, []);

  const saveRecentLinks = (links: ShortenedLink[]) => {
    setRecentLinks(links);
    try {
      localStorage.setItem("linkpulse_recent_links", JSON.stringify(links));
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
  };

  const refreshStats = async (links: ShortenedLink[] = recentLinks) => {
    if (!links || links.length === 0) return;
    setIsRefreshingStats(true);
    try {
      const codes = links.map((l) => l.code);
      const res = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes }),
      });
      const data = await res.json();
      if (data.stats) {
        const updated = links.map((link) => ({
          ...link,
          clicks: data.stats[link.code] ?? link.clicks,
        }));
        saveRecentLinks(updated);
      }
    } catch (e) {
      console.error("Failed to refresh stats:", e);
    } finally {
      setIsRefreshingStats(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!url.trim()) {
      setError("Please enter a URL to shorten.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          customAlias: customAlias.trim() || undefined,
          password: password.trim() || undefined,
          expiresIn: expiresIn > 0 ? expiresIn : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to shorten link.");
      }

      const newLink: ShortenedLink = {
        code: data.code,
        shortUrl: data.shortUrl,
        originalUrl: data.originalUrl,
        createdAt: data.createdAt,
        expiresAt: data.expiresAt,
        isProtected: data.isProtected,
        clicks: data.clicks || 0,
      };

      setCreatedLink(newLink);

      const filtered = recentLinks.filter((l) => l.code !== newLink.code);
      const updatedList = [newLink, ...filtered].slice(0, 30);
      saveRecentLinks(updatedList);

      triggerCelebrationBurst();

      setUrl("");
      setCustomAlias("");
      setPassword("");
      setExpiresIn(0);
    } catch (err: any) {
      setError(err.message || "An error occurred while shortening the URL.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, code: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const removeLink = (code: string) => {
    const updated = recentLinks.filter((l) => l.code !== code);
    saveRecentLinks(updated);
    if (createdLink?.code === code) {
      setCreatedLink(null);
    }
  };

  const clearHistory = () => {
    saveRecentLinks([]);
    setCreatedLink(null);
  };

  const downloadQrCodeFromRef = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width + 40;
      canvas.height = img.height + 40;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 20, 20);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `linkpulse-qr-${createdLink?.code || "link"}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  const filteredRecentLinks = recentLinks.filter((link) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      link.code.toLowerCase().includes(q) ||
      link.originalUrl.toLowerCase().includes(q) ||
      link.shortUrl.toLowerCase().includes(q)
    );
  });

  const totalClicksAcc = recentLinks.reduce((acc, l) => acc + (l.clicks || 0), 0);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-slate-100 relative overflow-hidden selection:bg-indigo-500 selection:text-white bg-radial-gradient-dark">
      
      {/* 🌐 Interactive JS Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
      <canvas ref={confettiCanvasRef} className="fixed inset-0 pointer-events-none z-50" />

      {/* Cyber Grid & Laser Sweep Overlays */}
      <div className="absolute inset-0 bg-cyber-grid-dark opacity-30 pointer-events-none" />
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-laser pointer-events-none" />

      {/* Rotating Aurora Mesh Blob */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-600/15 rounded-full blur-[120px] animate-aurora pointer-events-none" />

      {/* Navigation Header */}
      <header className="border-b border-zinc-800/80 bg-black/80 backdrop-blur-2xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-10 h-10 rounded-xl bg-black flex items-center justify-center border border-zinc-800">
                <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
              </div>
            </div>
            <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-400 bg-clip-text text-transparent">
              LinkPulse
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
            <span className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Upstash Redis Active
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area (Rich 2-Column Dashboard Layout) */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 relative z-10">
        
        {/* Hero Heading & Animated JS Subtitle */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(99,102,241,0.2)] backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
            Full-Featured Pro URL Shortener & Analytics
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Shorten links, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              generate QR codes & track live clicks.
            </span>
          </h1>

          {/* JS Animated Cycling Subtitle */}
          <div className="h-7 overflow-hidden flex items-center justify-center">
            <p className="text-zinc-400 text-sm sm:text-base font-semibold transition-all duration-500 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 key={typedTextIndex}">
              <MousePointer className="w-4 h-4 text-indigo-400" />
              <span>{cyclingTexts[typedTextIndex]}</span>
            </p>
          </div>
        </div>

        {/* 2-Column Rich Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Main Shortener Form with Permanently Visible Pro Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-black/90 border border-zinc-800/90 rounded-3xl p-5 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-2xl hover:border-indigo-500/30 transition-all duration-300 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Long URL Input */}
                <div className="space-y-2">
                  <label htmlFor="url-input" className="block text-xs font-extrabold text-zinc-300 uppercase tracking-widest flex items-center justify-between">
                    <span>Destination URL</span>
                    <span className="text-[10px] text-indigo-400 font-bold">HTTPS Supported</span>
                  </label>
                  <div className="relative flex items-center group">
                    <div className="absolute left-4 text-zinc-500 group-focus-within:text-indigo-400 transition-colors pointer-events-none">
                      <Link2 className="w-5 h-5" />
                    </div>
                    <input
                      id="url-input"
                      type="text"
                      placeholder="https://example.com/paste-your-very-long-link-here"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError(null);
                      }}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 focus:shadow-[0_0_30px_rgba(99,102,241,0.3)] rounded-2xl pl-12 pr-10 py-4 text-sm sm:text-base text-white placeholder-zinc-600 transition-all outline-none"
                    />
                    {url && (
                      <button
                        type="button"
                        onClick={() => setUrl("")}
                        className="absolute right-4 text-zinc-500 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Permanently Open Pro Settings Section */}
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 space-y-4 shadow-inner">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs font-extrabold text-white uppercase tracking-wider">Pro Link Customization</span>
                    </div>
                    <span className="text-[10px] text-zinc-500 font-medium">All Optional</span>
                  </div>

                  {/* Custom Alias */}
                  <div className="space-y-1.5">
                    <label htmlFor="alias-input" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <AtSign className="w-3.5 h-3.5 text-indigo-400" /> Custom Alias / Short Code
                      </span>
                    </label>
                    <div className="flex rounded-2xl border border-zinc-800 bg-black overflow-hidden focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                      <span className="px-4 py-3.5 bg-zinc-900 text-zinc-400 text-xs flex items-center border-r border-zinc-800 font-mono select-none">
                        linkpulse/
                      </span>
                      <input
                        id="alias-input"
                        type="text"
                        placeholder="my-custom-code"
                        value={customAlias}
                        onChange={(e) => {
                          setCustomAlias(e.target.value);
                          if (error) setError(null);
                        }}
                        className="w-full bg-transparent px-4 py-3.5 text-sm text-white placeholder-zinc-600 font-mono outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Password Protection */}
                    <div className="space-y-1.5">
                      <label htmlFor="pwd-input" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-indigo-400" /> Password Lock
                        </span>
                      </label>
                      <input
                        id="pwd-input"
                        type="password"
                        placeholder="Set access password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black border border-zinc-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all outline-none"
                      />
                    </div>

                    {/* Link Expiration (TTL) */}
                    <div className="space-y-1.5">
                      <label htmlFor="expire-select" className="block text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Timer className="w-3.5 h-3.5 text-indigo-400" /> Auto-Expiration
                        </span>
                      </label>
                      <select
                        id="expire-select"
                        value={expiresIn}
                        onChange={(e) => setExpiresIn(Number(e.target.value))}
                        className="w-full bg-black border border-zinc-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 rounded-2xl px-4 py-3 text-sm text-white transition-all outline-none cursor-pointer"
                      >
                        {EXPIRATION_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value} className="bg-zinc-950 text-white">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Error Alert */}
                {error && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs sm:text-sm flex items-start gap-3 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur-md opacity-80 group-hover:opacity-100 transition duration-300 group-hover:duration-200"></div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full py-4.5 px-6 rounded-2xl bg-black hover:bg-zinc-950 border border-indigo-500/50 text-white font-black text-sm sm:text-base shadow-2xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-shimmer pointer-events-none" />

                    {loading ? (
                      <>
                        <RotateCw className="w-5 h-5 animate-spin text-indigo-400" />
                        Generating Short Link & QR Code...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5 fill-indigo-400 text-indigo-400" />
                        Shorten URL Now
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Success Result Card */}
              {createdLink && (
                <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-4 animate-in fade-in slide-in-from-top-4 duration-400">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400" /> Short Link & QR Code Generated!
                    </span>
                    <div className="flex items-center gap-2 text-xs text-zinc-400">
                      {createdLink.isProtected && (
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> Password Protected
                        </span>
                      )}
                      {createdLink.expiresAt && (
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Temporary
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Main Link Box */}
                  <div className="p-4 sm:p-5 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
                    <div className="truncate font-mono text-sm sm:text-base font-black text-indigo-300">
                      {createdLink.shortUrl}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(createdLink.shortUrl, createdLink.code)}
                        className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
                      >
                        {copiedCode === createdLink.code ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" /> Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy Link
                          </>
                        )}
                      </button>

                      <a
                        href={createdLink.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-colors"
                        title="Test Link Redirect"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Inline Generated QR Code Card */}
                  <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-2xl flex flex-col sm:flex-row items-center gap-5 shadow-lg">
                    <div ref={qrInlineRef} className="p-3.5 bg-white rounded-2xl shrink-0 shadow-xl border border-zinc-200">
                      <QRCodeSVG value={createdLink.shortUrl} size={120} />
                    </div>
                    <div className="space-y-2.5 text-center sm:text-left flex-1 min-w-0">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                          <QrCode className="w-4.5 h-4.5 text-indigo-400" /> Instant QR Code
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Scan with any smartphone camera to test or download the PNG image.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
                        <button
                          onClick={() => downloadQrCodeFromRef(qrInlineRef)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/25 active:scale-95"
                        >
                          <Download className="w-3.5 h-3.5" /> Download PNG
                        </button>
                        <button
                          onClick={() => setShowQrModal(true)}
                          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold transition-colors"
                        >
                          Enlarge View
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 1-Click Social Sharing */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                      <Share2 className="w-4 h-4 text-indigo-400" /> Quick Share:
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(createdLink.shortUrl)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(createdLink.shortUrl)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold transition-colors"
                      >
                        X (Twitter)
                      </a>
                      <a
                        href={`https://t.me/share/url?url=${encodeURIComponent(createdLink.shortUrl)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-bold transition-colors"
                      >
                        Telegram
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Live Dashboard & Feature Showcase Widgets (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Widget 1: Real-time Stats Card */}
            <div className="bg-black/90 border border-zinc-800 rounded-3xl p-6 shadow-xl backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-base font-extrabold text-white">System Analytics</h3>
                </div>
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Live Sync
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                  <div className="text-2xl font-black text-indigo-400">{recentLinks.length}</div>
                  <div className="text-xs text-zinc-400 font-semibold">Links Created</div>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1">
                  <div className="text-2xl font-black text-purple-400">{totalClicksAcc}</div>
                  <div className="text-xs text-zinc-400 font-semibold">Total Clicks</div>
                </div>
              </div>
            </div>

            {/* Widget 2: Pro Features Showcase */}
            <div className="bg-black/90 border border-zinc-800 rounded-3xl p-6 shadow-xl backdrop-blur-2xl space-y-4">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Key Features
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <AtSign className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Custom Short Aliases</div>
                    <div className="text-zinc-400">Brand your short links with custom names.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <Lock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Password Protection</div>
                    <div className="text-zinc-400">Lock links with passwords before redirecting.</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-start gap-3">
                  <QrCode className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white">Instant PNG QR Code</div>
                    <div className="text-zinc-400">Generate & download high-res QR images.</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FULL WIDTH BOTTOM SECTION: Recent Links History */}
        <div className="space-y-4 pt-4 border-t border-zinc-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-black text-white">Recent Links History</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-zinc-900 border border-zinc-800 text-zinc-300">
                {recentLinks.length}
              </span>
            </div>

            {recentLinks.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search links..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500 transition-all w-36 sm:w-56"
                  />
                </div>

                <button
                  onClick={() => refreshStats()}
                  disabled={isRefreshingStats}
                  className="text-xs flex items-center gap-1.5 transition-colors px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300 hover:text-white disabled:opacity-50"
                  title="Refresh click counts"
                >
                  <RotateCw className={`w-3.5 h-3.5 text-indigo-400 ${isRefreshingStats ? "animate-spin" : ""}`} />
                  <span className="hidden sm:inline">Refresh Clicks</span>
                </button>
                <button
                  onClick={clearHistory}
                  className="text-xs text-red-400/80 hover:text-red-400 transition-colors px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-950"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {filteredRecentLinks.length === 0 ? (
            <div className="border border-zinc-800/80 rounded-3xl p-10 text-center space-y-3 bg-black/80 shadow-inner">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border bg-zinc-900 border-zinc-800 text-zinc-500">
                <Link2 className="w-7 h-7" />
              </div>
              <p className="text-base font-bold text-zinc-300">
                {searchQuery ? "No matching links found" : "No links shortened yet"}
              </p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto leading-relaxed">
                {searchQuery
                  ? "Try searching with a different code or domain keyword."
                  : "Paste a URL above to create your first short link."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredRecentLinks.map((item) => (
                <div
                  key={item.code}
                  className="bg-black/90 border border-zinc-800 hover:border-indigo-500/40 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] rounded-2xl p-4 transition-all duration-200 flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-sm font-black text-indigo-300 truncate">
                        {item.code}
                      </span>
                      <span className="text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 font-extrabold border border-indigo-500/30">
                        {item.clicks} {item.clicks === 1 ? "click" : "clicks"}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-400 truncate" title={item.originalUrl}>
                      {item.originalUrl}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                      {item.isProtected && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold flex items-center gap-0.5">
                          <Lock className="w-3 h-3" /> Password
                        </span>
                      )}
                      {item.expiresAt && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-semibold flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> Temp
                        </span>
                      )}
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => copyToClipboard(item.shortUrl, item.code)}
                        className="px-3 py-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-200 text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        {copiedCode === item.code ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <a
                        href={item.shortUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white transition-colors"
                        title="Open short link"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => removeLink(item.code)}
                        className="p-1.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-red-400 transition-colors"
                        title="Remove from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Enlarged QR Code Modal */}
      {showQrModal && createdLink && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-7 max-w-sm w-full space-y-6 text-center shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-white">Enlarged QR Code</h3>
              <p className="text-xs text-zinc-400 font-mono truncate px-4">
                {createdLink.shortUrl}
              </p>
            </div>

            <div ref={qrModalRef} className="p-4 bg-white rounded-2xl inline-block shadow-2xl mx-auto border border-zinc-200">
              <QRCodeSVG value={createdLink.shortUrl} size={190} />
            </div>

            <div className="flex flex-col gap-2.5 pt-1">
              <button
                onClick={() => downloadQrCodeFromRef(qrModalRef)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <Download className="w-4 h-4" /> Download QR Code (PNG)
              </button>

              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-6 text-center text-xs text-zinc-600 space-y-2 relative z-10">
        <p>Built with Next.js (App Router), Tailwind CSS, and Upstash Redis.</p>
        <p>Pro Link Customization Panel Always Visible.</p>
      </footer>
    </div>
  );
}
