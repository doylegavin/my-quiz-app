// app/layout.tsx
import "./globals.css";
import React from 'react';
import { Inter } from 'next/font/google'
import Script from "next/script";
import type { Metadata } from 'next';
import { NextAuthSessionProvider } from "@/lib/NextAuthSessionProvider";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import('@/components/layout/Sidebar'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Examinaite",
  description: "AI-powered exam preparation for Leaving Cert students.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen font-sans antialiased ${inter.variable}`}>
        {/* MathJax configuration script */}
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)'], ['$', '$']],
                displayMath: [['\\\\[', '\\\\]'], ['$$', '$$']],
                processEscapes: true
              },
              svg: {
                fontCache: 'global'
              }
            };
          `}
        </Script>
        {/* MathJax library from CDN */}
        <Script
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
          strategy="beforeInteractive"
          async
        />
        <Script
          src="https://www.geogebra.org/apps/deployggb.js"
          strategy="beforeInteractive"
        />
        
        <NextAuthSessionProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 overflow-x-hidden">
              <div className="max-w-full">
                {children}
              </div>
            </main>
          </div>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}