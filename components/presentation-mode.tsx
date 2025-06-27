"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Presentation,
  Clock,
  User,
  Code,
  Briefcase,
  Award,
  Mail,
} from "lucide-react"

interface PresentationSlide {
  id: string
  title: string
  subtitle?: string
  content: React.ReactNode
  duration: number // em segundos
  background?: string
}

const presentationSlides: PresentationSlide[] = [
  {
    id: "intro",
    title: "Henrique Monteiro Cardoso",
    subtitle: "Desenvolvedor Full Stack",
    content: (
      <div className="text-center space-y-6">
        <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-chart-1 flex items-center justify-center">
          <User className="h-16 w-16 text-white" />
        </div>
        <div className="space-y-2">
          <p className="text-xl text-muted-foreground">Estudante de Análise e Desenvolvimento de Sistemas</p>
          <p className="text-lg">Especializado em Java, JavaScript, TypeScript e tecnologias modernas</p>
        </div>
        <div className="flex justify-center gap-4">
          <Badge variant="secondary">2+ anos de experiência</Badge>
          <Badge variant="secondary">10+ projetos</Badge>
          <Badge variant="secondary">18+ certificações</Badge>
        </div>
      </div>
    ),
    duration: 8,
  },
  {
    id: "skills",
    title: "Habilidades Técnicas",
    subtitle: "Stack Tecnológico Completo",
    content: (
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Frontend
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>React & Next.js</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-20 bg-primary h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>TypeScript</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-20 bg-primary h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Tailwind CSS</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-20 bg-primary h-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-green-600" />
            Backend
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Java & Spring Boot</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-20 bg-green-600 h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Node.js</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-16 bg-green-600 h-2 rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>PostgreSQL</span>
              <div className="w-24 bg-muted rounded-full h-2">
                <div className="w-20 bg-green-600 h-2 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    duration: 10,
  },
  {
    id: "projects",
    title: "Projetos em Destaque",
    subtitle: "Soluções Reais para Problemas Reais",
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Safe Finance</h3>
              <p className="text-muted-foreground mb-4">
                Sistema completo de gestão financeira pessoal com Java e Spring Boot
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Java</Badge>
                  <Badge variant="outline">Spring Boot</Badge>
                  <Badge variant="outline">PostgreSQL</Badge>
                </div>
                <p className="text-sm text-green-600">✓ 70% redução no tempo de controle financeiro</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Portfolio Website</h3>
              <p className="text-muted-foreground mb-4">Site moderno com Next.js, animações avançadas e Easter Eggs</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Next.js</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Framer Motion</Badge>
                </div>
                <p className="text-sm text-green-600">✓ Lighthouse Score 98/100</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    ),
    duration: 12,
  },
  {
    id: "experience",
    title: "Experiência Profissional",
    subtitle: "Trajetória de Crescimento Contínuo",
    content: (
      <div className="space-y-6">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary"></div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Auxiliar Comercial - CCBEU Sorocaba</h3>
                <p className="text-muted-foreground text-sm">Fev 2025 - Presente</p>
                <p className="text-sm mt-2">
                  Gestão de leads no Bitrix, atendimento digital e melhorias no sistema DKSoft
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Aprendiz Administrativo - ASSA ABLOY</h3>
                <p className="text-muted-foreground text-sm">Jun - Dez 2024</p>
                <p className="text-sm mt-2">Suporte em SSMA, gestão de EPIs e reconhecimento por conscientização</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    duration: 10,
  },
  {
    id: "education",
    title: "Formação & Certificações",
    subtitle: "Aprendizado Contínuo",
    content: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Educação
          </h3>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold">Análise e Desenvolvimento de Sistemas</h4>
                <p className="text-muted-foreground text-sm">Centro Universitário Facens</p>
                <p className="text-muted-foreground text-sm">2025 - 2027</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-green-600" />
            Certificações
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Excel Profissionalizante</span>
              <Badge variant="secondary">2024</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Analista Suporte Técnico</span>
              <Badge variant="secondary">2024</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Gestão de Negócios</span>
              <Badge variant="secondary">2022</Badge>
            </div>
            <div className="text-center mt-4">
              <Badge variant="outline">+15 certificações</Badge>
            </div>
          </div>
        </div>
      </div>
    ),
    duration: 10,
  },
  {
    id: "contact",
    title: "Vamos Conversar?",
    subtitle: "Aberto a Novas Oportunidades",
    content: (
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <p className="text-xl text-muted-foreground">Estou disponível para novos desafios e oportunidades</p>
          <p className="text-lg">Desenvolvedor Full Stack • Sorocaba/SP • Remoto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">henrique.monteiro.cardoso@outlook.com</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-blue-600 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">in</span>
              </div>
              <p className="font-semibold">LinkedIn</p>
              <p className="text-sm text-muted-foreground">henrique-monteiro-cardoso</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="h-8 w-8 bg-gray-900 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-white font-bold text-sm">GH</span>
              </div>
              <p className="font-semibold">GitHub</p>
              <p className="text-sm text-muted-foreground">HenriqueMC17</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <p className="text-lg font-semibold text-primary">Obrigado pela atenção!</p>
          <p className="text-muted-foreground">Espero que possamos trabalhar juntos em breve</p>
        </div>
      </div>
    ),
    duration: 8,
  },
]

export function PresentationMode() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isPlaying && timeLeft === 0) {
      nextSlide()
    }
  }, [isPlaying, timeLeft])

  useEffect(() => {
    if (isPlaying) {
      setTimeLeft(presentationSlides[currentSlide].duration)
    }
  }, [currentSlide, isPlaying])

  const nextSlide = () => {
    if (currentSlide < presentationSlides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setIsPlaying(false)
      setCurrentSlide(0)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      setTimeLeft(presentationSlides[currentSlide].duration)
    }
  }

  const currentSlideData = presentationSlides[currentSlide]

  return (
    <>
      {/* Presentation Mode Button */}
      <Button onClick={() => setIsOpen(true)} variant="outline" className="fixed bottom-20 right-6 z-40 shadow-lg">
        <Presentation className="h-4 w-4 mr-2" />
        Modo Apresentação
      </Button>

      {/* Presentation Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <h1 className="text-white text-xl font-bold">Apresentação - Henrique Monteiro Cardoso</h1>
                <Badge variant="secondary">
                  {currentSlide + 1} / {presentationSlides.length}
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {isPlaying && (
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{timeLeft}s</span>
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Slide Content */}
            <div className="flex-1 flex items-center justify-center p-8">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="max-w-6xl w-full"
              >
                <Card className="bg-white/95 backdrop-blur-sm">
                  <CardContent className="p-12">
                    <div className="text-center mb-8">
                      <h2 className="text-4xl font-bold mb-2">{currentSlideData.title}</h2>
                      {currentSlideData.subtitle && (
                        <p className="text-xl text-muted-foreground">{currentSlideData.subtitle}</p>
                      )}
                    </div>

                    <div className="min-h-[400px] flex items-center justify-center">{currentSlideData.content}</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 p-6 bg-black/50 backdrop-blur-sm">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="text-white hover:bg-white/20"
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                disabled={currentSlide === presentationSlides.length - 1}
                className="text-white hover:bg-white/20"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-white/20">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{
                  width: `${((currentSlide + 1) / presentationSlides.length) * 100}%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
