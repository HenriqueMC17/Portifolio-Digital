"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star, Quote, Linkedin, Building } from "lucide-react"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  relationship: "colleague" | "mentor" | "client" | "manager"
  date: string
  linkedinUrl?: string
  verified: boolean
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ana Silva",
    role: "Tech Lead",
    company: "ASSA ABLOY",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique demonstrou excepcional dedicação durante seu período como aprendiz. Sua capacidade de aprender rapidamente e aplicar conhecimentos em situações práticas é impressionante. Sempre proativo e com excelente comunicação.",
    rating: 5,
    relationship: "manager",
    date: "Dezembro 2024",
    linkedinUrl: "https://linkedin.com/in/ana-silva",
    verified: true,
  },
  {
    id: "2",
    name: "Carlos Mendes",
    role: "Desenvolvedor Senior",
    company: "Freelancer",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Trabalhei com Henrique em alguns projetos e fiquei impressionado com sua habilidade técnica em Java e Spring Boot. Código limpo, bem documentado e sempre seguindo as melhores práticas. Recomendo fortemente!",
    rating: 5,
    relationship: "colleague",
    date: "Janeiro 2025",
    linkedinUrl: "https://linkedin.com/in/carlos-mendes",
    verified: true,
  },
  {
    id: "3",
    name: "Maria Santos",
    role: "Product Manager",
    company: "CCBEU Sorocaba",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique tem sido fundamental na otimização dos nossos processos comerciais. Sua capacidade de entender as necessidades do negócio e traduzir em soluções técnicas é notável. Profissional comprometido e confiável.",
    rating: 5,
    relationship: "manager",
    date: "Fevereiro 2025",
    verified: true,
  },
  {
    id: "4",
    name: "João Oliveira",
    role: "Professor de Programação",
    company: "Centro Universitário Facens",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Como professor, posso afirmar que Henrique se destaca pela curiosidade e vontade de aprender. Sempre questiona, busca entender o 'porquê' das coisas e aplica os conceitos de forma criativa. Um aluno exemplar.",
    rating: 5,
    relationship: "mentor",
    date: "Janeiro 2025",
    verified: true,
  },
  {
    id: "5",
    name: "Lucas Ferreira",
    role: "Desenvolvedor Full Stack",
    company: "Startup Tech",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Henrique me ajudou com um projeto pessoal e fiquei impressionado com a qualidade do código e a atenção aos detalhes. Além das habilidades técnicas, é uma pessoa muito colaborativa e fácil de trabalhar.",
    rating: 4,
    relationship: "client",
    date: "Novembro 2024",
    linkedinUrl: "https://linkedin.com/in/lucas-ferreira",
    verified: true,
  },
]

const relationshipConfig = {
  colleague: {
    label: "Colega",
    color: "bg-blue-100 text-blue-800",
    icon: Building,
  },
  mentor: {
    label: "Mentor",
    color: "bg-purple-100 text-purple-800",
    icon: Star,
  },
  client: {
    label: "Cliente",
    color: "bg-green-100 text-green-800",
    icon: Building,
  },
  manager: {
    label: "Gestor",
    color: "bg-orange-100 text-orange-800",
    icon: Building,
  },
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedRelationship, setSelectedRelationship] = useState<string>("all")

  const filteredTestimonials = testimonials.filter(
    (testimonial) => selectedRelationship === "all" || testimonial.relationship === selectedRelationship,
  )

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)
  }

  const currentTestimonial = filteredTestimonials[currentIndex]

  const relationships = [
    { value: "all", label: "Todos" },
    { value: "manager", label: "Gestores" },
    { value: "colleague", label: "Colegas" },
    { value: "mentor", label: "Mentores" },
    { value: "client", label: "Clientes" },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary/5 to-chart-1/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem sobre mim</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Feedbacks reais de pessoas que trabalharam comigo ou acompanharam minha jornada profissional
          </p>
        </motion.div>

        {/* Relationship Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {relationships.map((relationship) => (
            <Button
              key={relationship.value}
              variant={selectedRelationship === relationship.value ? "default" : "outline"}
              onClick={() => {
                setSelectedRelationship(relationship.value)
                setCurrentIndex(0)
              }}
              className="mb-2"
            >
              {relationship.label}
            </Button>
          ))}
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto mb-8">
          <AnimatePresence mode="wait">
            {currentTestimonial && (
              <motion.div
                key={`${currentTestimonial.id}-${selectedRelationship}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-xl border-0">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-chart-1" />

                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-start gap-6">
                      <Quote className="h-12 w-12 text-primary/20 flex-shrink-0 mt-2" />

                      <div className="flex-1">
                        <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                          "{currentTestimonial.content}"
                        </blockquote>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-primary/20">
                              <AvatarImage
                                src={currentTestimonial.avatar || "/placeholder.svg"}
                                alt={currentTestimonial.name}
                              />
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {currentTestimonial.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900">{currentTestimonial.name}</h3>
                                {currentTestimonial.verified && (
                                  <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Star className="h-3 w-3 text-white fill-current" />
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-600">{currentTestimonial.role}</p>
                              <p className="text-gray-500 text-sm">{currentTestimonial.company}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < currentTestimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge className={relationshipConfig[currentTestimonial.relationship].color}>
                              {relationshipConfig[currentTestimonial.relationship].label}
                            </Badge>
                            <p className="text-gray-500 text-sm mt-1">{currentTestimonial.date}</p>
                          </div>
                        </div>

                        {currentTestimonial.linkedinUrl && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={currentTestimonial.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Linkedin className="h-4 w-4" />
                                Ver perfil no LinkedIn
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        {filteredTestimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full bg-transparent">
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary scale-125" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{testimonials.length}</div>
            <div className="text-gray-600 text-sm">Depoimentos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <div className="text-gray-600 text-sm">Avaliação Média</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{testimonials.filter((t) => t.verified).length}</div>
            <div className="text-gray-600 text-sm">Verificados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-gray-600 text-sm">Recomendação</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
