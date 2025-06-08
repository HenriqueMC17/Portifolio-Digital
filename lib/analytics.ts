"use client"

import { v4 as uuidv4 } from "uuid"

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
  | "easter_egg_deactivated"
  | "easter_eggs_reset"
  | "pwa_install_prompt"
  | "pwa_installed"
  | "pwa_install_dismissed"
  | "custom"

// Interface para eventos
export interface AnalyticsEvent {
  id: string
  type: EventType
  name?: string
  timestamp: number
  data?: Record<string, any>
  sessionId: string
  userId?: string
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
  private sessionId: string
  private userId?: string
  private events: AnalyticsEvent[] = []
  private performanceMetrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    fcp: null,
  }
  private endpoint?: string
  private isEnabled = true
  private isDebug = false
  private batchSize = 10
  private flushInterval = 30000 // 30 segundos
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

  // Inicializar analytics
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

    const { endpoint, isEnabled, isDebug, batchSize, flushInterval } = options

    if (endpoint) this.endpoint = endpoint
    if (isEnabled !== undefined) this.isEnabled = isEnabled
    if (isDebug !== undefined) this.isDebug = isDebug
    if (batchSize) this.batchSize = batchSize
    if (flushInterval) this.flushInterval = flushInterval

    this.isInitialized = true

    // Rastrear visualização de página inicial
    this.trackPageView()
  }

  // Rastrear evento
  public trackEvent(type: EventType, data?: Record<string, any>, name?: string) {
    if (!this.isEnabled) return

    const event: AnalyticsEvent = {
      id: uuidv4(),
      type,
      name,
      timestamp: Date.now(),
      data,
      sessionId: this.sessionId,
      userId: this.userId,
    }

    this.events.push(event)

    if (this.isDebug) {
      console.log("[Analytics]", event)
    }

    // Enviar eventos em lote quando atingir o tamanho do lote
    if (this.events.length >= this.batchSize) {
      this.flush()
    }
  }

  // Rastrear visualização de página
  public trackPageView(path?: string) {
    const url = path || (typeof window !== "undefined" ? window.location.pathname : "")

    this.trackEvent("page_view", {
      url,
      title: typeof document !== "undefined" ? document.title : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    })
  }

  // Rastrear visualização de seção
  public trackSectionView(sectionId: string) {
    this.trackEvent("section_view", { sectionId })
  }

  // Rastrear clique em botão
  public trackButtonClick(buttonId: string, buttonText?: string) {
    this.trackEvent("button_click", { buttonId, buttonText })
  }

  // Rastrear clique em link
  public trackLinkClick(url: string, text?: string, isExternal?: boolean) {
    this.trackEvent("link_click", { url, text, isExternal })
  }

  // Rastrear envio de formulário
  public trackFormSubmit(formId: string, success: boolean) {
    this.trackEvent("form_submit", { formId, success })
  }

  // Rastrear erro
  public trackError(message: string, source?: string, stack?: string) {
    this.trackEvent("error", { message, source, stack })
  }

  // Rastrear métricas de performance
  public trackPerformance() {
    this.trackEvent("performance", this.performanceMetrics)
  }

  // Obter métricas de performance
  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.performanceMetrics }
  }

  // Ativar ou desativar analytics
  public setEnabled(isEnabled: boolean) {
    this.isEnabled = isEnabled
  }

  // Ativar ou desativar modo debug
  public setDebug(isDebug: boolean) {
    this.isDebug = isDebug
  }

  // Definir endpoint para envio de dados
  public setEndpoint(endpoint: string) {
    this.endpoint = endpoint
  }

  // Enviar eventos acumulados
  public flush() {
    if (!this.isEnabled || this.events.length === 0) return

    const eventsToSend = [...this.events]
    this.events = []

    if (this.endpoint) {
      // Enviar para o endpoint configurado
      fetch(this.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ events: eventsToSend }),
        keepalive: true,
      }).catch((error) => {
        console.error("[Analytics] Error sending events:", error)
        // Recuperar eventos em caso de falha
        this.events = [...eventsToSend, ...this.events]
      })
    } else {
      // Armazenar localmente se não houver endpoint
      this.storeEvents(eventsToSend)
    }
  }

  // Limpar dados de analytics
  public clear() {
    this.events = []
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem("analytics_events")
    }
  }

  // Gerar ID de sessão
  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
  }

  // Obter ou gerar ID de usuário
  private getUserId(): string | undefined {
    if (typeof localStorage === "undefined") return undefined

    let userId = localStorage.getItem("analytics_user_id")

    if (!userId) {
      userId = uuidv4()
      localStorage.setItem("analytics_user_id", userId)
    }

    return userId
  }

  // Configurar observador de performance
  private setupPerformanceObserver() {
    if (typeof PerformanceObserver === "undefined") return

    try {
      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        this.performanceMetrics.lcp = lastEntry ? lastEntry.startTime : null
      })

      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true })

      // First Input Delay
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const firstEntry = entries[0]
        if (firstEntry) {
          this.performanceMetrics.fid = firstEntry.processingStart - firstEntry.startTime
        }
      })

      fidObserver.observe({ type: "first-input", buffered: true })

      // Cumulative Layout Shift
      let clsValue = 0
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value
            this.performanceMetrics.cls = clsValue
          }
        }
      })

      clsObserver.observe({ type: "layout-shift", buffered: true })

      // Time to First Byte & First Contentful Paint
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
      if (navEntry) {
        this.performanceMetrics.ttfb = navEntry.responseStart
      }

      const paintEntries = performance.getEntriesByType("paint")
      const fcpEntry = paintEntries.find((entry) => entry.name === "first-contentful-paint")
      if (fcpEntry) {
        this.performanceMetrics.fcp = fcpEntry.startTime
      }

      // Rastrear métricas após o carregamento da página
      window.addEventListener("load", () => {
        setTimeout(() => {
          this.trackPerformance()
        }, 3000)
      })
    } catch (error) {
      console.error("[Analytics] Error setting up performance observer:", error)
    }
  }

  // Configurar listeners de eventos
  private setupEventListeners() {
    if (typeof window === "undefined") return

    // Rastrear cliques em links
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement
      const link = target.closest("a")

      if (link) {
        const url = link.href
        const text = link.textContent?.trim() || ""
        const isExternal = link.hostname !== window.location.hostname

        this.trackLinkClick(url, text, isExternal)
      }
    })

    // Rastrear cliques em botões
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement
      const button = target.closest("button")

      if (button) {
        const buttonId = button.id || "unknown"
        const buttonText = button.textContent?.trim() || ""

        this.trackButtonClick(buttonId, buttonText)
      }
    })

    // Rastrear envios de formulário
    document.addEventListener("submit", (event) => {
      const form = event.target as HTMLFormElement
      const formId = form.id || "unknown"

      this.trackFormSubmit(formId, true)
    })

    // Rastrear erros não capturados
    window.addEventListener("error", (event) => {
      this.trackError(event.message, event.filename, event.error?.stack)
    })

    // Rastrear rejeições de promessas não tratadas
    window.addEventListener("unhandledrejection", (event) => {
      this.trackError(`Unhandled Promise Rejection: ${event.reason}`, "unhandledrejection", event.reason?.stack)
    })

    // Rastrear mudanças de visibilidade da página
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        // Enviar eventos acumulados antes do usuário sair da página
        this.flush()
      }
    })

    // Rastrear quando o usuário sai da página
    window.addEventListener("beforeunload", () => {
      this.flush()
    })
  }

  // Iniciar timer para envio periódico de eventos
  private startFlushTimer() {
    this.flushTimer = setInterval(() => {
      this.flush()
    }, this.flushInterval)
  }

  // Armazenar eventos localmente
  private storeEvents(events: AnalyticsEvent[]) {
    if (typeof localStorage === "undefined") return

    try {
      const storedEvents = localStorage.getItem("analytics_events")
      let allEvents: AnalyticsEvent[] = []

      if (storedEvents) {
        allEvents = JSON.parse(storedEvents)
      }

      allEvents = [...allEvents, ...events]

      // Limitar o número de eventos armazenados
      if (allEvents.length > 1000) {
        allEvents = allEvents.slice(-1000)
      }

      localStorage.setItem("analytics_events", JSON.stringify(allEvents))
    } catch (error) {
      console.error("[Analytics] Error storing events:", error)
    }
  }
}

// Instância singleton
export const analytics = new Analytics()
