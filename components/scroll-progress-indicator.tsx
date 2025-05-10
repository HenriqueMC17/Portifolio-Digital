"use client"

import { useState, useEffect } from "react"

export function ScrollProgressIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      // Calcular o progresso da rolagem
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setScrollProgress(scrollPercent)
    }

    // Adicionar event listener para rolagem
    window.addEventListener("scroll", updateScrollProgress)

    // Cálculo inicial
    updateScrollProgress()

    // Limpar event listener
    return () => window.removeEventListener("scroll", updateScrollProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-background/20 z-50">
      <div
        className="h-full bg-primary"
        style={{ width: `${scrollProgress * 100}%`, transition: "width 0.1s" }}
        role="progressbar"
        aria-valuenow={scrollProgress * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso de rolagem da página"
      />
    </div>
  )
}
