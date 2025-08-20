"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface GridPoint {
  x: number
  y: number
  baseY: number
  offset: number
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const gridRef = useRef<GridPoint[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeParticles()
      initializeGrid()
    }

    const initializeParticles = () => {
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000))
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: ["#00ffff", "#ff00ff", "#00ff00", "#ffff00"][Math.floor(Math.random() * 4)],
        })
      }
    }

    const initializeGrid = () => {
      gridRef.current = []
      const spacing = 50
      const cols = Math.ceil(canvas.width / spacing)
      const rows = Math.ceil(canvas.height / spacing)

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          gridRef.current.push({
            x: i * spacing,
            y: j * spacing,
            baseY: j * spacing,
            offset: Math.random() * Math.PI * 2,
          })
        }
      }
    }

    const drawParticles = (time: number) => {
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x <= 0 || particle.x >= canvas.width) particle.vx *= -1
        if (particle.y <= 0 || particle.y >= canvas.height) particle.vy *= -1

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = ((100 - distance) / 100) * 0.2
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })
    }

    const drawGrid = (time: number) => {
      ctx.save()
      ctx.strokeStyle = theme === "dark" ? "rgba(0, 255, 255, 0.1)" : "rgba(0, 100, 100, 0.1)"
      ctx.lineWidth = 0.5

      gridRef.current.forEach((point) => {
        point.y = point.baseY + Math.sin(time * 0.001 + point.offset) * 5

        // Draw grid lines
        const nextX = gridRef.current.find((p) => p.x === point.x + 50 && Math.abs(p.baseY - point.baseY) < 1)
        const nextY = gridRef.current.find((p) => p.baseY === point.baseY && Math.abs(p.x - point.x - 50) < 1)

        if (nextX) {
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nextX.x, nextX.y)
          ctx.stroke()
        }

        if (nextY) {
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(nextY.x, nextY.y)
          ctx.stroke()
        }
      })
      ctx.restore()
    }

    const drawHolographicOrbs = (time: number) => {
      const orbCount = 3
      for (let i = 0; i < orbCount; i++) {
        const x = canvas.width * 0.2 + (canvas.width * 0.6 * i) / (orbCount - 1)
        const y = canvas.height * 0.5 + Math.sin(time * 0.001 + i * 2) * 50
        const radius = 30 + Math.sin(time * 0.002 + i) * 10

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, `rgba(0, 255, 255, ${0.3 + Math.sin(time * 0.003 + i) * 0.2})`)
        gradient.addColorStop(0.5, `rgba(255, 0, 255, ${0.2 + Math.sin(time * 0.003 + i + 1) * 0.1})`)
        gradient.addColorStop(1, "rgba(0, 255, 255, 0)")

        ctx.save()
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (theme === "dark") {
        gradient.addColorStop(0, "rgba(10, 10, 30, 0.95)")
        gradient.addColorStop(0.5, "rgba(20, 10, 40, 0.95)")
        gradient.addColorStop(1, "rgba(10, 20, 30, 0.95)")
      } else {
        gradient.addColorStop(0, "rgba(240, 248, 255, 0.95)")
        gradient.addColorStop(0.5, "rgba(230, 240, 250, 0.95)")
        gradient.addColorStop(1, "rgba(220, 235, 245, 0.95)")
      }
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawGrid(time)
      drawHolographicOrbs(time)
      drawParticles(time)

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mounted, theme])

  if (!mounted) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  )
}
