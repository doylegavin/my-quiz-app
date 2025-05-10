"use client"

import { ReactNode } from "react"
import { PostHogProvider as InternalPostHogProvider } from "./PostHogProvider"

export function Providers({ children }: { children: ReactNode }) {
  return <InternalPostHogProvider>{children}</InternalPostHogProvider>
}

// Re-export PostHogProvider for use in layout.tsx
export { PostHogProvider } from "./PostHogProvider"
