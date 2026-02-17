"use client"

import { generateId } from "@/lib/utils"

// Tipos de eventos
export type EventType =
  | "page_view"
  | "section_view"
  | "button_click"
  | "link_click"
  | "form_submit"
  | "error"
  | "performance"
  | "easter_egg_activated"
  | "custom"

// Interface para eventos
export type AnalyticsEvent = {
  name: string
  properties?: Record<string, any>
  timestamp: number
}

// Interface para métricas de performance
export interface PerformanceMetrics {
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
  fcp: number | null
}

// Classe para gerenciar analytics
export class Analytics {
  private events: AnalyticsEvent[] = []
  private isEnabled = true
  private endpoint = "/api/analytics"
  private sessionId: string
  private userId?: string
  private performanceMetrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
  }
  private isDebug = false
  private batchSize = 10
  private flushInterval = 30000
  private flushTimer?: NodeJS.Timeout
  private isInitialized = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.userId = this.getUserId()

    if (typeof window !== "undefined") {
      this.setupPerformanceObserver()
      this.setupEventListeners()
      this.startFlushTimer()
      this.isInitialized = true
    }
  }

  public init(
    options: {
      endpoint?: string
      isEnabled?: boolean
      isDebug?: boolean
      batchSize?: number
      flushInterval?: number
    } = {},
  ) {
    if (this.isInitialized) return

    Object.assign(this, options)
    this.isInitialized = true
    this.trackPageView()
  }

  public trackEvent(type: string, data?: Record<string, any>, name?: string) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      name: name || type,
      properties: data,
      timestamp: Date.now(),
    }

    this.events.push(event)

    if (this.isDebug) {
      console.log("[Analytics]", event)
    }

    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  public trackPageView(path?: string) {
    const url = path || (typeof window !== "undefined" ? window.location.pathname : "")
    this.trackEvent("page_view", { url })
  }

  public trackSectionView(sectionId: string) {
    this.trackEvent("section_view", { sectionId })
  }

  public trackError(message: string, source?: string, stack?: string) {
    this.trackEvent("error", { message, source, stack })
  }

  public flush() {
    if (!this.isEnabled || this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    if (this.endpoint) {
      this.sendToEndpoint(eventsToSend)
    } else {
      this.storeEvents(eventsToSend)
    }
  }

  public setEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled
  }

  public clear() {
    this.events = []
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("analytics_events")
    }
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }

  private getUserId(): string | undefined {
    if (typeof localStorage === "undefined") return undefined

    let userId = localStorage.getItem("analytics_user_id")
    if (!userId) {
      userId = generateId()
      localStorage.setItem("analytics_user_id", userId)
    }
    return userId
  }

  private sanitizeData(data?: Record<string, any>): Record<string, any> | undefined {
    if (!data) return undefined

    const sanitized: Record<string, any> = {}
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "string") {
        sanitized[key] = value.slice(0, 1000) // Limitar tamanho
      } else if (typeof value === "number" || typeof value === "boolean") {
        sanitized[key] = value
      } else if (value && typeof value === "object") {
        sanitized[key] = JSON.stringify(value).slice(0, 1000)
      }
    }
    return sanitized
  }

  private async sendToEndpoint(events: AnalyticsEvent[]) {
    try {
      const response = await fetch(this.endpoint!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events }),
        keepalive: true,
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (error) {
      console.error("[Analytics] Error sending events:", error)
      this.events = [...events, ...this.events]
    }
  }

  private setupPerformanceObserver() {
    if (typeof PerformanceObserver === "undefined") return

    try {
      // Web Vitals monitoring
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            this.performanceMetrics.lcp = entry.startTime
          }
          if (entry.entryType === "first-input") {
            this.performanceMetrics.fid = (entry as any).processingStart - entry.startTime
          }
          if (entry.entryType === "layout-shift" && !(entry as any).hadRecentInput) {
            this.performanceMetrics.cls = (this.performanceMetrics.cls || 0) + (entry as any).value
          }
        }
      })

      observer.observe({ entryTypes: ["largest-contentful-paint", "first-input", "layout-shift"] })
    } catch (error) {
      console.error("[Analytics] Performance observer error:", error)
    }
  }

  private setupEventListeners() {
    if (typeof window === "undefined") return

    // Error tracking
    window.addEventListener("error", (event) => {
      this.trackError(event.message, event.filename, event.error?.stack)
    })

    window.addEventListener("unhandledrejection", (event) => {
      this.trackError(`Unhandled Promise Rejection: ${event.reason}`)
    })

    // Page visibility
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        this.flush()
      }
    })

    window.addEventListener("beforeunload", () => {
      this.flush()
    })
  }

  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  private storeEvents(events: AnalyticsEvent[]) {
    if (typeof localStorage === "undefined") return

    try {
      const stored = localStorage.getItem("analytics_events")
      let allEvents: AnalyticsEvent[] = stored ? JSON.parse(stored) : []

      allEvents = [...allEvents, ...events]

      if (allEvents.length > 1000) {
        allEvents = allEvents.slice(-1000)
      }

      localStorage.setItem("analytics_events", JSON.stringify(allEvents))
    } catch (error) {
      console.error("[Analytics] Storage error:", error)
    }
  }
}

export const analytics = new Analytics()
