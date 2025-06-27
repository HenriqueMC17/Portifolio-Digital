"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Quote, Star, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useState, useEffect } from "react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  date: string
  type: "text" | "video"
  videoUrl?: string
  relationship: "mentor" | "colleague" | "client" | "manager"
  project?: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Silva",
    role: "Tech Lead",
    company: "ASSA ABLOY Group",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique demonstrou excepcional capacidade de aprendizado e adaptação durante seu período como aprendiz. Sua dedicação em melhorar processos administrativos e sua proatividade em eventos de segurança foram notáveis. Recomendo fortemente para posições de desenvolvimento.",
    rating: 5,
    date: "Dezembro 2024",
    type: "text",
    relationship: "manager",
    project: "Gestão SSMA",
  },
  {
    id: "2",
    name: "Carlos Mendes",
    role: "Coordenador Comercial",
    company: "CCBEU Sorocaba",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique foi fundamental na migração entre sistemas e no treinamento da equipe. Sua habilidade com Excel e sistemas como DKSoft, combinada com sua capacidade de ensinar, tornaram os processos muito mais eficientes. Um profissional que faz a diferença.",
    rating: 5,
    date: "Janeiro 2024",
    type: "text",
    relationship: "manager",
    project: "Sistema DKSoft",
  },
  {
    id: "3",
    name: "Dr. Roberto Santos",
    role: "Professor de Programação",
    company: "Centro Universitário Facens",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Como mentor acadêmico, posso afirmar que Henrique possui uma base sólida em programação e demonstra grande interesse em tecnologias emergentes. Seu projeto Safe Finance mostra maturidade técnica e boas práticas de desenvolvimento.",
    rating: 5,
    date: "Novembro 2024",
    type: "text",
    relationship: "mentor",
    project: "Safe Finance",
  },
  {
    id: "4",
    name: "Marina Costa",
    role: "Desenvolvedora Senior",
    company: "Freelancer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Colaborei com Henrique em alguns projetos e fiquei impressionada com sua dedicação ao código limpo e documentação. Ele tem um olhar atento para detalhes e sempre busca as melhores práticas. Definitivamente alguém com quem gostaria de trabalhar novamente.",
    rating: 5,
    date: "Outubro 2024",
    type: "text",
    relationship: "colleague",
    project: "Projetos Open Source",
  },
  {
    id: "5",
    name: "João Pereira",
    role: "CTO",
    company: "StartupTech",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique desenvolveu uma solução que otimizou nossos processos internos em 40%. Sua capacidade de entender requisitos de negócio e traduzi-los em código funcional é impressionante para alguém em início de carreira.",
    rating: 5,
    date: "Setembro 2024",
    type: "video",
    videoUrl: "/placeholder-video.mp4",
    relationship: "client",
    project: "Sistema de Gestão",
  },
]

const relationshipLabels = {
  mentor: "Mentor",
  colleague: "Colega",
  client: "Cliente",
  manager: "Gestor",
}

const relationshipColors = {
  mentor: "bg-purple-100 text-purple-800",
  colleague: "bg-blue-100 text-blue-800",
  client: "bg-green-100 text-green-800",
  manager: "bg-orange-100 text-orange-800",
}

export function TestimonialsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Depoimentos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            O que mentores, colegas e gestores falam sobre meu trabalho e dedicação
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="relative overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Quote Icon */}
              <Quote className="h-12 w-12 text-primary/20 mb-6" />

              {/* Content */}
              <div className="space-y-6">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  "{currentTestimonial.content}"
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={currentTestimonial.avatar || "/placeholder.svg"} alt={currentTestimonial.name} />
                    <AvatarFallback>
                      {currentTestimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{currentTestimonial.name}</h4>
                    <p className="text-muted-foreground">
                      {currentTestimonial.role} • {currentTestimonial.company}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={relationshipColors[currentTestimonial.relationship]}>
                        {relationshipLabels[currentTestimonial.relationship]}
                      </Badge>
                      {currentTestimonial.project && (
                        <Badge variant="secondary" className="text-xs">
                          {currentTestimonial.project}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">{currentTestimonial.date}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={prevTestimonial} className="h-10 w-10 bg-transparent">
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-primary w-8" : "bg-muted-foreground/30"
                }`}
              />
            ))}
          </div>

          <Button variant="outline" size="icon" onClick={nextTestimonial} className="h-10 w-10 bg-transparent">
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="h-10 w-10">
            {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setCurrentIndex(index)}
              className="cursor-pointer"
            >
              <Card
                className={`h-full transition-all duration-300 hover:shadow-lg ${
                  index === currentIndex ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground truncate">{testimonial.company}</p>
                    </div>
                    <Badge variant="outline" className={`text-xs ${relationshipColors[testimonial.relationship]}`}>
                      {relationshipLabels[testimonial.relationship]}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-4 mb-4">"{testimonial.content}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{testimonial.date}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
