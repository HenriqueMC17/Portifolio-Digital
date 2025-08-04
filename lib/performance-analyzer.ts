"use client"

// Sistema de análise de performance em tempo real
export class PerformanceAnalyzer {
  private metrics: {
    lcp: number | null
    fid: number | null
    cls: number | null
    fcp: number | null
    ttfb: number | null
  } = {
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
  }

  private observers: PerformanceObserver[] = []
  private startTime = performance.now()

  constructor() {
    this.initializeObservers()
    this.measureTTFB()
  }

  private initializeObservers() {
    // Largest Contentful Paint
    if ("PerformanceObserver" in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1] as any
          this.metrics.lcp = lastEntry.startTime
        })
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })
        this.observers.push(lcpObserver)
      } catch (e) {
        console.warn("LCP observer not supported")
      }

      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            this.metrics.fid = entry.processingStart - entry.startTime
          })
        })
        fidObserver.observe({ entryTypes: ["first-input"] })
        this.observers.push(fidObserver)
      } catch (e) {
        console.warn("FID observer not supported")
      }

      // Cumulative Layout Shift
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
            }
          })
          this.metrics.cls = clsValue
        })
        clsObserver.observe({ entryTypes: ["layout-shift"] })
        this.observers.push(clsObserver)
      } catch (e) {
        console.warn("CLS observer not supported")
      }

      // First Contentful Paint
      try {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            if (entry.name === "first-contentful-paint") {
              this.metrics.fcp = entry.startTime
            }
          })
        })
        fcpObserver.observe({ entryTypes: ["paint"] })
        this.observers.push(fcpObserver)
      } catch (e) {
        console.warn("FCP observer not supported")
      }
    }
  }

  private measureTTFB() {
    // Time to First Byte
    if ("navigation" in performance) {
      const navTiming = performance.getEntriesByType("navigation")[0] as any
      if (navTiming) {
        this.metrics.ttfb = navTiming.responseStart - navTiming.requestStart
      }
    }
  }

  public getMetrics() {
    return {
      ...this.metrics,
      sessionDuration: performance.now() - this.startTime,
      memoryUsage: (performance as any).memory
        ? {
            used: (performance as any).memory.usedJSHeapSize,
            total: (performance as any).memory.totalJSHeapSize,
            limit: (performance as any).memory.jsHeapSizeLimit,
          }
        : null,
    }
  }

  public getScore() {
    const { lcp, fid, cls, fcp, ttfb } = this.metrics
    let score = 100

    // LCP scoring (Good: <2.5s, Needs Improvement: 2.5-4s, Poor: >4s)
    if (lcp !== null) {
      if (lcp > 4000) score -= 25
      else if (lcp > 2500) score -= 10
    }

    // FID scoring (Good: <100ms, Needs Improvement: 100-300ms, Poor: >300ms)
    if (fid !== null) {
      if (fid > 300) score -= 25
      else if (fid > 100) score -= 10
    }

    // CLS scoring (Good: <0.1, Needs Improvement: 0.1-0.25, Poor: >0.25)
    if (cls !== null) {
      if (cls > 0.25) score -= 25
      else if (cls > 0.1) score -= 10
    }

    // FCP scoring (Good: <1.8s, Needs Improvement: 1.8-3s, Poor: >3s)
    if (fcp !== null) {
      if (fcp > 3000) score -= 15
      else if (fcp > 1800) score -= 5
    }

    return Math.max(0, score)
  }

  public cleanup() {
    this.observers.forEach((observer) => observer.disconnect())
  }
}

export const performanceAnalyzer = new PerformanceAnalyzer()
