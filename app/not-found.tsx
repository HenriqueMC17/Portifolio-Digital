"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const [glitchText, setGlitchText] = useState("404")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const glitchChars = ["4", "0", "4", "█", "▓", "▒", "░"]
    let glitchInterval: NodeJS.Timeout

    const startGlitch = () => {
      glitchInterval = setInterval(() => {
        const randomText = Array.from(
          { length: 3 },
          () => glitchChars[Math.floor(Math.random() * glitchChars.length)],
        ).join("")
        setGlitchText(randomText)

        setTimeout(() => setGlitchText("404"), 100)
      }, 2000)
    }

    startGlitch()
    return () => clearInterval(glitchInterval)
  }, [mounted])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <Card className="relative z-10 w-full max-w-md mx-4 bg-black/50 border-cyan-500/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              404
            </div>
            <CardTitle className="text-2xl font-bold text-white">Página Não Encontrada</CardTitle>
            <CardDescription className="text-gray-300">
              A página que você está procurando não existe ou foi movida.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Possíveis soluções:</p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Verifique se o URL está correto</li>
                <li>• Volte para a página inicial</li>
                <li>• Use o menu de navegação</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="flex-1">
                <Link href="/">Voltar ao Início</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Link href="/#contact">Contato</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Efeitos visuais futuristas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] to-white dark:from-[#0D1117] dark:to-[#161B22] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        <Card className="border-2 border-primary/20 shadow-2xl w-full max-w-md bg-white/80 dark:bg-[#0D1117]/80 backdrop-blur-xl rounded-2xl">
          <CardHeader className="pb-4">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-to-br from-[#0A2540] to-[#58A6FF] flex items-center justify-center">
              <Search className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-semibold text-primary dark:text-[#58A6FF]">
              Página não encontrada
            </CardTitle>
            <CardDescription className="text-base text-[#2C2C2C] dark:text-[#8B949E]">
              A página que você está procurando não existe ou foi movida.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-6xl font-bold text-primary opacity-20 select-none">{glitchText}</div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default" className="flex items-center gap-2">
                <Link href="/">
                  <Home className="w-4 h-4" />
                  Voltar ao início
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="w-4 h-4" />
                  Página anterior
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/30 to-blue-500/30 blur-sm" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Easter Egg */}
      <div className="mt-16 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
        <p className="text-xs font-mono text-muted-foreground">Dica: Tente o Konami Code na página inicial...</p>
      </div>
    </div>
  )
}
