"use client"

import React from "react"

import { analytics, type EventType } from "@/lib/analytics"

// Tipos específicos de eventos da apresentação
export type PresentationEventType =
  | "presentation_started"
  | "presentation_ended"
  | "slide_viewed"
  | "slide_duration"
  | "gesture_used"
  | "easter_egg_triggered"
  | "sound_toggled"
  | "transition_changed"
  | "fullscreen_toggled"
  | "auto_play_toggled"
  | "slide_skipped"
  | "presentation_paused"
  | "presentation_resumed"
  | "device_orientation_changed"
  | "performance_metric"

// Interface para métricas da apresentação
export interface PresentationMetrics {
  sessionId: string
  startTime: number
  endTime?: number
  totalDuration?: number
  slidesViewed: number[]
  slidesDuration: Record<number, number>
  gesturesUsed: string[]
  easterEggsTriggered: string[]
  transitionsUsed: string[]
  soundEnabled: boolean
  fullscreenUsed: boolean
  autoPlayUsed: boolean
  deviceType: "mobile" | "tablet" | "desktop"
  orientation: "portrait" | "landscape"
  averageSlideTime: number
  totalInteractions: number
  skipRate: number
  completionRate: number
}

// Classe para analytics da apresentação
export class PresentationAnalytics {
  private sessionId: string
  private startTime: number
  private currentSlideStartTime: number
  private metrics: PresentationMetrics
  private slideTimers: Map<number, number> = new Map()
  private interactionCount = 0
  private isTracking = false

  constructor() {
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.currentSlideStartTime = this.startTime

    this.metrics = {
      sessionId: this.sessionId,
      startTime: this.startTime,
      slidesViewed: [],
      slidesDuration: {},
      gesturesUsed: [],
      easterEggsTriggered: [],
      transitionsUsed: [],
      soundEnabled: true,
      fullscreenUsed: false,
      autoPlayUsed: false,
      deviceType: this.detectDeviceType(),
      orientation: this.detectOrientation(),
      averageSlideTime: 0,
      totalInteractions: 0,
      skipRate: 0,
      completionRate: 0,
    }
  }

  // Iniciar tracking da apresentação
  startPresentation(totalSlides: number) {
    this.isTracking = true
    this.trackEvent("presentation_started", {
      totalSlides,
      deviceType: this.metrics.deviceType,
      orientation: this.metrics.orientation,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      windowSize: `${window.innerWidth}x${window.innerHeight}`,
    })
  }

  // Finalizar tracking da apresentação
  endPresentation() {
    if (!this.isTracking) return

    this.metrics.endTime = Date.now()
    this.metrics.totalDuration = this.metrics.endTime - this.metrics.startTime
    this.metrics.totalInteractions = this.interactionCount
    this.calculateMetrics()

    this.trackEvent("presentation_ended", {
      ...this.metrics,
      sessionDuration: this.metrics.totalDuration,
    })

    this.isTracking = false
  }

  // Rastrear visualização de slide
  trackSlideView(slideIndex: number, slideTitle: string) {
    if (!this.isTracking) return

    // Finalizar timer do slide anterior
    if (this.currentSlideStartTime) {
      const duration = Date.now() - this.currentSlideStartTime
      this.slideTimers.set(slideIndex - 1, duration)
    }

    // Iniciar timer do novo slide
    this.currentSlideStartTime = Date.now()

    // Adicionar à lista de slides visualizados
    if (!this.metrics.slidesViewed.includes(slideIndex)) {
      this.metrics.slidesViewed.push(slideIndex)
    }

    this.trackEvent("slide_viewed", {
      slideIndex,
      slideTitle,
      timestamp: Date.now(),
      viewOrder: this.metrics.slidesViewed.length,
    })

    this.interactionCount++
  }

  // Rastrear duração em um slide
  trackSlideDuration(slideIndex: number, duration: number) {
    this.metrics.slidesDuration[slideIndex] = duration

    this.trackEvent("slide_duration", {
      slideIndex,
      duration,
      isLongView: duration > 30000, // Mais de 30 segundos
      isQuickView: duration < 3000, // Menos de 3 segundos
    })
  }

  // Rastrear uso de gestos
  trackGesture(gestureType: string, slideIndex: number) {
    if (!this.metrics.gesturesUsed.includes(gestureType)) {
      this.metrics.gesturesUsed.push(gestureType)
    }

    this.trackEvent("gesture_used", {
      gestureType,
      slideIndex,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear easter eggs
  trackEasterEgg(easterEggId: string, slideIndex: number) {
    if (!this.metrics.easterEggsTriggered.includes(easterEggId)) {
      this.metrics.easterEggsTriggered.push(easterEggId)
    }

    this.trackEvent("easter_egg_triggered", {
      easterEggId,
      slideIndex,
      timestamp: Date.now(),
      discoveryOrder: this.metrics.easterEggsTriggered.length,
    })

    this.interactionCount++
  }

  // Rastrear mudança de transição
  trackTransitionChange(transitionType: string, isRandom: boolean) {
    if (!this.metrics.transitionsUsed.includes(transitionType)) {
      this.metrics.transitionsUsed.push(transitionType)
    }

    this.trackEvent("transition_changed", {
      transitionType,
      isRandom,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear toggle de som
  trackSoundToggle(enabled: boolean) {
    this.metrics.soundEnabled = enabled

    this.trackEvent("sound_toggled", {
      enabled,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear fullscreen
  trackFullscreenToggle(enabled: boolean) {
    this.metrics.fullscreenUsed = true

    this.trackEvent("fullscreen_toggled", {
      enabled,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear auto play
  trackAutoPlayToggle(enabled: boolean) {
    this.metrics.autoPlayUsed = true

    this.trackEvent("auto_play_toggled", {
      enabled,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear pulo de slide
  trackSlideSkip(fromSlide: number, toSlide: number, method: string) {
    this.trackEvent("slide_skipped", {
      fromSlide,
      toSlide,
      method, // 'gesture', 'button', 'keyboard'
      skipDistance: Math.abs(toSlide - fromSlide),
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear pausa/resume
  trackPlaybackControl(action: "pause" | "resume", slideIndex: number) {
    this.trackEvent(action === "pause" ? "presentation_paused" : "presentation_resumed", {
      slideIndex,
      timestamp: Date.now(),
    })

    this.interactionCount++
  }

  // Rastrear mudança de orientação
  trackOrientationChange(orientation: "portrait" | "landscape") {
    this.metrics.orientation = orientation

    this.trackEvent("device_orientation_changed", {
      orientation,
      timestamp: Date.now(),
    })
  }

  // Rastrear métricas de performance
  trackPerformanceMetric(metric: string, value: number, slideIndex?: number) {
    this.trackEvent("performance_metric", {
      metric,
      value,
      slideIndex,
      timestamp: Date.now(),
    })
  }

  // Obter relatório de analytics
  getAnalyticsReport(): PresentationMetrics {
    this.calculateMetrics()
    return { ...this.metrics }
  }

  // Obter insights da apresentação
  getInsights() {
    const report = this.getAnalyticsReport()

    return {
      engagement: {
        totalInteractions: report.totalInteractions,
        averageSlideTime: report.averageSlideTime,
        completionRate: report.completionRate,
        skipRate: report.skipRate,
      },
      discovery: {
        easterEggsFound: report.easterEggsTriggered.length,
        gesturesUsed: report.gesturesUsed.length,
        transitionsExplored: report.transitionsUsed.length,
      },
      behavior: {
        preferredDevice: report.deviceType,
        usedFullscreen: report.fullscreenUsed,
        usedAutoPlay: report.autoPlayUsed,
        soundEnabled: report.soundEnabled,
      },
      performance: {
        sessionDuration: report.totalDuration,
        slidesViewed: report.slidesViewed.length,
        averageTimePerSlide: report.averageSlideTime,
      },
    }
  }

  // Métodos privados
  private generateSessionId(): string {
    return `pres_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
  }

  private detectDeviceType(): "mobile" | "tablet" | "desktop" {
    const width = window.innerWidth
    if (width < 768) return "mobile"
    if (width < 1024) return "tablet"
    return "desktop"
  }

  private detectOrientation(): "portrait" | "landscape" {
    return window.innerHeight > window.innerWidth ? "portrait" : "landscape"
  }

  private calculateMetrics() {
    // Calcular tempo médio por slide
    const durations = Object.values(this.metrics.slidesDuration)
    this.metrics.averageSlideTime =
      durations.length > 0 ? durations.reduce((sum, duration) => sum + duration, 0) / durations.length : 0

    // Calcular taxa de pulo (slides pulados vs visualizados)
    const totalSlides = Math.max(...this.metrics.slidesViewed, 0) + 1
    this.metrics.skipRate = totalSlides > 0 ? (totalSlides - this.metrics.slidesViewed.length) / totalSlides : 0

    // Calcular taxa de conclusão
    this.metrics.completionRate = this.metrics.slidesViewed.length / totalSlides
  }

  private trackEvent(type: PresentationEventType, data?: Record<string, any>) {
    analytics.trackEvent(type as EventType, {
      ...data,
      sessionId: this.sessionId,
      presentationContext: true,
    })
  }
}

// Hook para usar analytics da apresentação
export function usePresentationAnalytics() {
  const analyticsRef = React.useRef<PresentationAnalytics | null>(null)

  React.useEffect(() => {
    if (!analyticsRef.current) {
      analyticsRef.current = new PresentationAnalytics()
    }

    // Rastrear mudanças de orientação
    const handleOrientationChange = () => {
      if (analyticsRef.current) {
        const orientation = window.innerHeight > window.innerWidth ? "portrait" : "landscape"
        analyticsRef.current.trackOrientationChange(orientation)
      }
    }

    window.addEventListener("orientationchange", handleOrientationChange)
    window.addEventListener("resize", handleOrientationChange)

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange)
      window.removeEventListener("resize", handleOrientationChange)
    }
  }, [])

  return analyticsRef.current
}

// Exportar instância global
export const presentationAnalytics = new PresentationAnalytics()
