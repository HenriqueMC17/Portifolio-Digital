"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

export function VisualEasterEggs() {
  const [mounted, setMounted] = useState(false)
  const [showMatrix, setShowMatrix] = useState(false)
  const matrixRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleKeySequence = (e: KeyboardEvent) => {
      // Konami Code: ↑↑↓↓←→←→BA
      const konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
      ]

      // Simple matrix activation with Ctrl+Shift+M
      if (e.ctrlKey && e.shiftKey && e.code === "KeyM") {
        setShowMatrix(!showMatrix)
      }
    }

    window.addEventListener("keydown", handleKeySequence)
    return () => window.removeEventListener("keydown", handleKeySequence)
  }, [mounted, showMatrix])

  useEffect(() => {
    if (!showMatrix || !matrixRef.current) return

    const canvas = matrixRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ff00"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 33)
    return () => clearInterval(interval)
  }, [showMatrix])

  if (!mounted) return null

  return (
    <>
      {/* Matrix Rain Effect */}
      {showMatrix && (
        <motion.canvas
          ref={matrixRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-10"
          onClick={() => setShowMatrix(false)}
        />
      )}

      {/* Floating Data Particles */}
      <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
            }}
            animate={{
              y: -50,
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Holographic Orbs */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-10"
            style={{
              background: `conic-gradient(from ${i * 120}deg, #00ffff, #ff00ff, #00ff00, #00ffff)`,
              filter: "blur(20px)",
            }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: 360,
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </>
  )
}
