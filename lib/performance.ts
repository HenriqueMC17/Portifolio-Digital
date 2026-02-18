"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"

// Hook para Intersection Observer otimizado
export function useOptimizedInView(options = {}) {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || hasTriggered) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          setHasTriggered(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [hasTriggered, options])

  return [ref, inView] as const
}

// Hook para debounce otimizado
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook para lazy loading de imagens
export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string>()
  const [imageRef, inView] = useOptimizedInView()

  useEffect(() => {
    if (inView && src && !imageSrc) {
      const img = new Image()
      img.onload = () => setImageSrc(src)
      img.src = src
    }
  }, [inView, src, imageSrc])

  return [imageRef, imageSrc] as const
}

// Cache otimizado para GitHub API
class PerformanceCache {
  private cache = new Map()
  private readonly maxSize = 50
  private readonly ttl = 5 * 60 * 1000 // 5 minutos

  set(key: string, value: any) {
    // Remove itens expirados
    this.cleanup()

    // Remove o item mais antigo se necessário
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
    })
  }

  get(key: string) {
    const item = this.cache.get(key)
    if (!item) return null

    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.value
  }

  private cleanup() {
    const now = Date.now()
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        this.cache.delete(key)
      }
    }
  }

  clear() {
    this.cache.clear()
  }
}

export const performanceCache = new PerformanceCache()

// Preloader para recursos críticos
export function preloadCriticalResources() {
  if (typeof window === "undefined") return

  // Preload fonts
  const fontPreloads = [
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap",
  ]

  fontPreloads.forEach((href) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = href
    document.head.appendChild(link)
  })

  // Preload critical images
  const criticalImages = ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=300&width=400"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Hook para performance monitoring
export function usePerformanceMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Monitor Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "largest-contentful-paint") {
          console.log("LCP:", entry.startTime)
        }
        if (entry.entryType === "first-input") {
          console.log("FID:", (entry as PerformanceEventTiming).processingStart - entry.startTime)
        }
        if (entry.entryType === "layout-shift") {
          console.log("CLS:", (entry as unknown as { value: number }).value)
        }
      }
    })

    observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })

    return () => observer.disconnect()
  }, [])
}
