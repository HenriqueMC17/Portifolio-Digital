"use client"

import { useEffect } from "react"

export function Analytics() {
  useEffect(() => {
    // Simple analytics tracking without external dependencies
    if (typeof window !== "undefined") {
      console.log("Page viewed:", window.location.pathname)
    }
  }, [])

  return null
}
