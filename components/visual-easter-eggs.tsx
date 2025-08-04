"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export function VisualEasterEggs() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [showRobot, setShowRobot] = useState(false)
  const [cursorTrail, setCursorTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  // Particle system on click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = []
      for (let i = 0; i < 8; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 60,
          maxLife: 60,
        })
      }
      setParticles((prev) => [...prev, ...newParticles])
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Cursor trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrail((prev) => [{ x: e.clientX, y: e.clientY, id: Date.now() }, ...prev.slice(0, 10)])
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Robot mascot on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      setShowRobot(scrollPercent > 0.3 && scrollPercent < 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.3, // gravity
            life: particle.life - 1,
          }))
          .filter((particle) => particle.life > 0),
      )
    }, 16)

    return () => clearInterval(interval)
  }, [])

  // Clean up cursor trail
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail((prev) => prev.slice(0, 8))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* Custom Cursor Trail */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {cursorTrail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              zIndex: 50 - index,
            }}
          />
        ))}
      </div>

      {/* Click Particles */}
      <div className="fixed inset-0 pointer-events-none z-40">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.life / particle.maxLife,
            }}
            animate={{
              x: particle.vx * 10,
              y: particle.vy * 10,
              scale: [1, 0.5, 0],
            }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Robot Mascot */}
      <AnimatePresence>
        {showRobot && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-20 left-4 z-30 pointer-events-none"
          >
            <div className="relative">
              {/* Speech bubble */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-16 left-12 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg border border-gray-200 dark:border-gray-700 text-xs whitespace-nowrap"
              >
                Continue explorando! 🚀
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-200 dark:border-gray-700 transform rotate-45"></div>
              </motion.div>

              {/* Robot */}
              <motion.div
                animate={{
                  y: [0, -5, 0],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-xl shadow-lg"
              >
                🤖
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
              ease: "linear",
            }}
            style={{
              left: `${10 + i * 20}%`,
              top: `${80 + i * 5}%`,
            }}
          />
        ))}
      </div>

      {/* CSS for custom cursor */}
      <style jsx global>{`
        body {
          cursor: none;
        }
        
        * {
          cursor: none !important;
        }
        
        body::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: all 0.1s ease;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @media (max-width: 768px) {
          body {
            cursor: auto;
          }
          
          * {
            cursor: auto !important;
          }
          
          body::after {
            display: none;
          }
        }
      `}</style>
    </>
  )
}
