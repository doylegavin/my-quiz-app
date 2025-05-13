"use client"

import { ReactNode } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, Suspense } from "react"
import posthog from "posthog-js"
import { PostHogProvider as OriginalPostHogProvider, usePostHog } from "posthog-js/react"

// Main PostHog wrapper component
function PostHogWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("Initializing PostHog")
    console.log(process.env.NEXT_PUBLIC_POSTHOG_KEY)
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: "/ingest",
      ui_host: "https://eu.posthog.com",
      capture_pageview: false, // We capture pageviews manually
      capture_pageleave: true, // Enable pageleave capture
      debug: process.env.NODE_ENV === "development",
    })
  }, [])

  return (
    <OriginalPostHogProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </OriginalPostHogProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const search = searchParams.toString()
      if (search) {
        url += "?" + search
      }
      posthog.capture("$pageview", { "$current_url": url })
    }
  }, [pathname, searchParams, posthog])

  return null
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}

// Main application providers wrapper - this is used in layout.tsx
export function Providers({ children }: { children: ReactNode }) {
  return <PostHogWrapper>{children}</PostHogWrapper>
}

// The PostHogProvider export that's used in layout.tsx
export const PostHogProvider = PostHogWrapper
