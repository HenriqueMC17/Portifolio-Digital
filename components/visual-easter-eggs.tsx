"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

// Cursor Sci-Fi personalizado
export function SciFiCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Adicionar ponto ao rastro
      setTrail((prev) => [
        ...prev.slice(-10), // Manter apenas os últimos 10 pontos
        { x: e.clientX, y: e.clientY, id: Date.now() },
      ])
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* Rastro do cursor */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: point.x - 4,
            top: point.y - 4,
            opacity: ((index + 1) / trail.length) * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}

      {/* Cursor principal */}
      <div
        className={`absolute w-6 h-6 border-2 border-primary rounded-full transition-all duration-100 ${
          isClicking ? "scale-150 bg-primary/20" : "scale-100"
        }`}
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      >
        <div className="absolute inset-1 bg-primary/50 rounded-full animate-pulse" />
      </div>
    </div>
  )
}

// Partículas interativas
export function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<
    Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
      maxLife: number
    }>
  >([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const handleClick = (e: MouseEvent) => {
      const newParticles = Array.from({ length: 15 }, () => ({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        life: 60,
        maxLife: 60,
      }))

      setParticles((prev) => [...prev, ...newParticles])
    }

    document.addEventListener("click", handleClick)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      setParticles((prev) => {
        const updated = prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0)

        // Desenhar partículas
        updated.forEach((particle) => {
          const alpha = particle.life / particle.maxLife
          const size = (particle.life / particle.maxLife) * 4

          ctx.save()
          ctx.globalAlpha = alpha
          ctx.fillStyle = "#10b981"
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        })

        return updated
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      document.removeEventListener("click", handleClick)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-10" style={{ mixBlendMode: "screen" }} />
  )
}

// Mascote robô que aparece com scroll
export function ScrollRobot() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrolled / maxScroll

      setScrollProgress(progress)
      setIsVisible(progress > 0.3 && progress < 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed bottom-32 right-6 z-40 pointer-events-none"
    >
      <div className="relative">
        {/* Robô */}
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center shadow-lg">
          <div className="text-2xl">🤖</div>
        </div>

        {/* Balão de fala */}
        <div className="absolute -top-12 -left-20 bg-background border-2 border-primary/20 rounded-lg px-3 py-2 shadow-lg">
          <p className="text-xs whitespace-nowrap">Explorando o portfólio!</p>
          <div className="absolute -bottom-1 left-8 w-2 h-2 bg-background border-r-2 border-b-2 border-primary/20 rotate-45" />
        </div>
      </div>
    </motion.div>
  )
}
