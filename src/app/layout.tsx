// app/layout.tsx
import "./globals.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider"
import { Inter } from 'next/font/google'
import Script from "next/script";
import Sidebar from "@/components/sidebar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import FeedbackButton from "@/components/FeedbackButton";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata = {
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
      <head>
        {/* ADDED: MathJax configuration script */}
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
        {/* ADDED: MathJax library from CDN */}
        <Script
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
          strategy="beforeInteractive"
          async
        />
        <Script
          src="https://www.geogebra.org/apps/deployggb.js"
          strategy="beforeInteractive"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
        <SessionProviderWrapper>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 overflow-x-hidden">
              <div className="max-w-full">
                <ReactQueryProvider>{children}</ReactQueryProvider>
                <FeedbackButton/>
              </div>
            </main>
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}