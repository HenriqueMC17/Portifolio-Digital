"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function NotFound() {
  const [glitchText, setGlitchText] = useState("404")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?"
    const originalText = "404"

    const glitchInterval = setInterval(() => {
      let newText = ""
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < 0.1) {
          newText += glitchChars[Math.floor(Math.random() * glitchChars.length)]
        } else {
          newText += originalText[i]
        }
      }
      setGlitchText(newText)

      setTimeout(() => setGlitchText(originalText), 100)
    }, 2000)

    return () => clearInterval(glitchInterval)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <motion.div
        className="fixed w-4 h-4 bg-primary/20 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      <div className="max-w-2xl mx-auto text-center space-y-8 relative z-10">
        {/* 404 Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          <h1 className="text-8xl md:text-9xl font-bold text-primary font-mono relative">
            {glitchText}
            <motion.div
              className="absolute inset-0 text-red-500 opacity-50"
              animate={{
                x: [0, -2, 2, 0],
                y: [0, 2, -2, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              {glitchText}
            </motion.div>
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-semibold">Página Não Encontrada</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Parece que você se perdeu no ciberespaço. Esta página não existe ou foi movida para outra dimensão.
          </p>
        </motion.div>

        {/* Interactive Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="glass border-primary/20 hover:border-primary/40 transition-all duration-300">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button asChild className="group" variant="default">
                  <Link href="/">
                    <Home className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Início
                  </Link>
                </Button>

                <Button asChild className="group bg-transparent" variant="outline">
                  <Link href="javascript:history.back()">
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Voltar
                  </Link>
                </Button>

                <Button asChild className="group" variant="secondary">
                  <Link href="/#projects">
                    <Search className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                    Projetos
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Easter Egg */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-xs text-muted-foreground/50 font-mono"
        >
          <p>
            <Zap className="inline h-3 w-3 mr-1" />
            Easter Egg: Tente mover o mouse pela tela
          </p>
        </motion.div>

        {/* Sci-fi Elements */}
        <div className="absolute -top-20 -left-20 w-40 h-40 border border-primary/20 rounded-full animate-spin-slow opacity-20" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 border border-primary/10 rounded-full animate-pulse opacity-10" />
      </div>
    </div>
  )
}
