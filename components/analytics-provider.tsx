"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { analytics, type EventType } from "@/lib/analytics"
import { usePathname, useSearchParams } from "next/navigation"

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
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar analytics
  useEffect(() => {
    analytics.init({
      endpoint,
      isEnabled,
      isDebug: debug,
      batchSize: 10,
      flushInterval: 30000,
    })

    // Limpar ao desmontar
    return () => {
      analytics.flush()
    }
  }, [endpoint, isEnabled, debug])

  // Rastrear mudanças de página
  useEffect(() => {
    if (isEnabled && pathname) {
      analytics.trackPageView(pathname)
    }
  }, [pathname, searchParams, isEnabled])

  // Atualizar estado de habilitado/desabilitado
  useEffect(() => {
    analytics.setEnabled(isEnabled)
  }, [isEnabled])

  // Configurar Intersection Observer para rastrear visualizações de seção
  useEffect(() => {
    if (!isEnabled || typeof IntersectionObserver === "undefined") return

    const sections = document.querySelectorAll("section[id]")
    const observedSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id

            if (!observedSections.has(sectionId)) {
              analytics.trackSectionView(sectionId)
              observedSections.add(sectionId)
            }
          }
        })
      },
      { threshold: 0.5 },
    )

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [isEnabled, pathname])

  const value = {
    trackEvent: (type: EventType, data?: Record<string, any>, name?: string) => {
      if (isEnabled) {
        analytics.trackEvent(type, data, name)
      }
    },
    trackPageView: (path?: string) => {
      if (isEnabled) {
        analytics.trackPageView(path)
      }
    },
    trackSectionView: (sectionId: string) => {
      if (isEnabled) {
        analytics.trackSectionView(sectionId)
      }
    },
    isEnabled,
    setEnabled: (enabled: boolean) => {
      setIsEnabled(enabled)
    },
  }

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalytics() {
  return useContext(AnalyticsContext)
}
