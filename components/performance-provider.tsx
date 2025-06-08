"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { preloadCriticalResources, usePerformanceMonitor } from "@/lib/performance"

interface PerformanceContextType {
  isLoading: boolean
  isOptimized: boolean
  enableAnimations: boolean
}

const PerformanceContext = createContext<PerformanceContextType>({
  isLoading: true,
  isOptimized: false,
  enableAnimations: true,
})

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isOptimized, setIsOptimized] = useState(false)
  const [enableAnimations, setEnableAnimations] = useState(true)

  usePerformanceMonitor()

  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()

    // Check device capabilities
    const checkPerformance = () => {
      const connection = (navigator as any).connection
      const isSlowConnection =
        connection && (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g")
      const isLowEndDevice = navigator.hardwareConcurrency <= 2
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      setEnableAnimations(!prefersReducedMotion && !isSlowConnection && !isLowEndDevice)
      setIsOptimized(isSlowConnection || isLowEndDevice)
    }

    checkPerformance()

    // Simulate loading completion
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <PerformanceContext.Provider value={{ isLoading, isOptimized, enableAnimations }}>
      {children}
    </PerformanceContext.Provider>
  )
}

export function usePerformance() {
  return useContext(PerformanceContext)
}
