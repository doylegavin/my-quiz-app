// app/layout.tsx
import "./globals.css";
import React from 'react';
import Script from "next/script";
import type { Metadata } from 'next';
import { ClerkProvider } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import EnhancedSubjectsInitializer from "@/components/EnhancedSubjectsInitializer";
import { PostHogProvider } from './providers';

const Sidebar = dynamic(() => import('@/components/layout/Sidebar'), { ssr: false });

// Note: We're replacing Inter with OpenDyslexic for improved readability for dyslexic users
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'https://examinaite.ie' : 'http://localhost:3000'),
  title: "Examinaite | Instant Leaving Cert Revision Questions",
  description: "Generate instant, personalised Leaving Cert revision questions. AI-powered exam preparation for students, teachers, and tutors. Start practising free today!",
  keywords: ["Leaving Cert", "exam preparation", "revision questions", "AI education", "exam practice", "study tool", "student resources", "teacher tools"],
  authors: [{ name: "Examinaite Team" }],
  creator: "Examinaite",
  robots: "index, follow",
  openGraph: {
    title: "Examinaite | Instant Exam Revision Questions",
    description: "Generate instant, personalised Exam revision questions. Start practising free today!",
    type: "website",
    url: "https://examinaite.ie",
    siteName: "Examinaite",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Examinaite - AI-powered exam preparation" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Examinaite | Instant Leaving Cert Revision Questions",
    description: "Generate instant, personalised Leaving Cert revision questions. Start practising free today!",
    images: [{ url: "/images/og-image.jpg", alt: "Examinaite - AI-powered exam preparation" }],
  },
  icons: "/favicon.ico",
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            {/* Add the OpenDyslexic font */}
            <link 
              rel="stylesheet" 
              href="https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css" 
              crossOrigin="anonymous" 
            />
          </head>
          <body className="min-h-screen antialiased bg-background text-foreground font-dyslexic">
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
            
            <div className="flex min-h-screen">
              {/* Initialize enhanced subjects */}
              <EnhancedSubjectsInitializer />
              <Sidebar />
              {/* Main content area - flex-1 ensures it takes up remaining space */}
              <main className="flex-1 p-4 md:p-6 overflow-x-hidden w-full">
                <div className="max-w-full">
                  {children}
                </div>
              </main>
            </div>
          </body>
        </html>
      </PostHogProvider>
    </ClerkProvider>
  );
}