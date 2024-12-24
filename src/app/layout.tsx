// app/layout.tsx

import "./globals.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider"
import { Inter } from 'next/font/google'
import Script from "next/script"; // ADDED

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
})

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
      </head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
