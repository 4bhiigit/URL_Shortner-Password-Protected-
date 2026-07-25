import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinkPulse | Modern Free URL Shortener",
  description:
    "Fast, reliable, and modern URL shortener with custom aliases, live click tracking, and QR code generation powered by Next.js and Upstash Redis.",
  keywords: ["URL shortener", "custom alias", "link tracking", "Next.js", "Upstash Redis", "free link shortener"],
  authors: [{ name: "LinkPulse" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
