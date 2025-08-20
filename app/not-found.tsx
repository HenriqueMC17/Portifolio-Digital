"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"
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
              <Button asChild variant="cyber" className="flex-1">
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
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
        <Card className="glass-card border-2 border-primary/20 shadow-2xl max-w-2xl mx-auto">
          <CardContent className="p-12">
            {/* Glitch 404 */}
            <motion.div
              className="mb-8"
              animate={{
                textShadow: ["0 0 0px #10b981", "2px 2px 0px #10b981, -2px -2px 0px #3b82f6", "0 0 0px #10b981"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-500 to-purple-500 mb-4 font-mono">
                {glitchText}
              </h1>
            </motion.div>

            {/* Error Message */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Página Não Encontrada</h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-md mx-auto">
                Ops! Parece que você se perdeu no espaço digital. A página que você está procurando não existe.
              </p>
            </motion.div>

            {/* Animated Robot */}
            <motion.div
              className="mb-8"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="text-6xl mb-4">🤖</div>
              <div className="text-sm text-muted-foreground italic">
                "Erro 404: Humor não encontrado... só brincadeira! 😄"
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button asChild size="lg" className="glow-primary group">
                <Link href="/" className="flex items-center space-x-2">
                  <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Voltar ao Início</span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 hover:glow-secondary"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Página Anterior</span>
              </Button>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 pt-8 border-t border-border/50"
            >
              <p className="text-sm text-muted-foreground mb-4">Ou explore essas seções populares:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {[
                  { href: "/#about", label: "Sobre", icon: "👨‍💻" },
                  { href: "/#projects", label: "Projetos", icon: "🚀" },
                  { href: "/#skills", label: "Habilidades", icon: "⚡" },
                  { href: "/#contact", label: "Contato", icon: "📧" },
                ].map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-300"
                    >
                      <Link href={link.href} className="flex items-center space-x-2">
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Easter Egg */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-8 text-xs text-muted-foreground/50"
            >
              <p>💡 Dica: Tente alguns comandos do Konami Code para surpresas!</p>
            </motion.div>
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
    </div>
  )
}
