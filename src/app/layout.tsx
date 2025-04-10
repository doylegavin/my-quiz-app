// app/layout.tsx
import "./globals.css";
import React from 'react';
import { ReactQueryProvider } from "@/lib/ReactQueryProvider"
import { Inter } from 'next/font/google'
import Script from "next/script";
import Sidebar from "@/components/layout/Sidebar";
import FeedbackButton from "@/components/FeedbackButton";
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { FacebookSDKWrapper } from "@/components/FacebookSDKWrapper";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { NextAuthSessionProvider } from "@/lib/NextAuthSessionProvider";

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
      <body className={cn("min-h-screen font-sans antialiased", inter.variable)}>
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
        
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthSessionProvider>
            <FacebookSDKWrapper appId={process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || ''}>
              <ReactQueryProvider>
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 p-6 overflow-x-hidden">
                    <div className="max-w-full">
                      {children}
                      <FeedbackButton/>
                    </div>
                  </main>
                </div>
                <Toaster />
              </ReactQueryProvider>
            </FacebookSDKWrapper>
          </NextAuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}