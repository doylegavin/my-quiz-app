// app/layout.tsx
import "./globals.css";
import { ReactQueryProvider } from "@/lib/ReactQueryProvider" // create a custom provider

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
