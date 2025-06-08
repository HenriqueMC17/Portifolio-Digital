"use client"

import { createContext, useContext, useEffect, useState, type ReactNode, Suspense, useCallback } from "react"
import { analytics, type EventType } from "@/lib/analytics"
import { usePathname, useSearchParams } from "next/navigation"
import { debounce } from "@/lib/utils"

interface AnalyticsContextType {
  trackEvent: (type: EventType, data?: Record<string, any>, name?: string) => void
  trackPageView: (path?: string) => void
  trackSectionView: (sectionId: string) => void
  isEnabled: boolean
  setEnabled: (enabled: boolean) => void
}

const AnalyticsContext = createContext<AnalyticsContextType>({
  trackEvent: () => {},
  trackPageView: () => {},
  trackSectionView: () => {},
  isEnabled: true,
  setEnabled: () => {},
})

// Componente separado para tracking de search params
function SearchParamsTracker({ isEnabled }: { isEnabled: boolean }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const debouncedTrackPageView = useCallback(
    debounce((path: string) => {
      if (isEnabled) {
        analytics.trackPageView(path)
      }
    }, 300),
    [isEnabled],
  )

  useEffect(() => {
    if (pathname) {
      debouncedTrackPageView(pathname)
    }
  }, [pathname, searchParams, debouncedTrackPageView])

  return null
}

export function AnalyticsProvider({
  children,
  endpoint,
  debug = false,
}: {
  children: ReactNode
  endpoint?: string
  debug?: boolean
}) {
  const [isEnabled, setIsEnabled] = useState(true)

  // Inicializar analytics
  useEffect(() => {
    analytics.init({
      endpoint,
      isEnabled,
      isDebug: debug,
      batchSize: 10,
      flushInterval: 30000,
    })

    return () => {
      analytics.flush()
    }
  }, [endpoint, isEnabled, debug])

  // Atualizar estado de habilitado/desabilitado
  useEffect(() => {
    analytics.setEnabled(isEnabled)
  }, [isEnabled])

  // Configurar Intersection Observer para rastrear visualizações de seção
  useEffect(() => {
    if (!isEnabled || typeof IntersectionObserver === "undefined") return

    const observedSections = new Set<string>()

    const debouncedTrackSection = debounce((sectionId: string) => {
      if (!observedSections.has(sectionId)) {
        analytics.trackSectionView(sectionId)
        observedSections.add(sectionId)
      }
    }, 500)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id
            if (sectionId) {
              debouncedTrackSection(sectionId)
            }
          }
        })
      },
      {
        threshold: [0.5],
        rootMargin: "-10% 0px -10% 0px",
      },
    )

    // Observar seções com delay para garantir que o DOM está pronto
    const timeoutId = setTimeout(() => {
      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        observer.observe(section)
      })
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [isEnabled])

  const value = {
    trackEvent: useCallback(
      (type: EventType, data?: Record<string, any>, name?: string) => {
        if (isEnabled) {
          analytics.trackEvent(type, data, name)
        }
      },
      [isEnabled],
    ),

    trackPageView: useCallback(
      (path?: string) => {
        if (isEnabled) {
          analytics.trackPageView(path)
        }
      },
      [isEnabled],
    ),

    trackSectionView: useCallback(
      (sectionId: string) => {
        if (isEnabled) {
          analytics.trackSectionView(sectionId)
        }
      },
      [isEnabled],
    ),

    isEnabled,
    setEnabled: useCallback((enabled: boolean) => {
      setIsEnabled(enabled)
    }, []),
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
      <Suspense fallback={null}>
        <SearchParamsTracker isEnabled={isEnabled} />
      </Suspense>
    </AnalyticsContext.Provider>
  )
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}
