"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Star, Quote, Linkedin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

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
      "Henrique demonstrou excepcional dedicacao durante seu periodo como aprendiz. Sua capacidade de aprender rapidamente e aplicar conhecimentos em situacoes praticas e impressionante. Sempre proativo e com excelente comunicacao.",
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
      "Trabalhei com Henrique em alguns projetos e fiquei impressionado com sua habilidade tecnica em Java e Spring Boot. Codigo limpo, bem documentado e sempre seguindo as melhores praticas. Recomendo fortemente!",
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
      "Henrique tem sido fundamental na otimizacao dos nossos processos comerciais. Sua capacidade de entender as necessidades do negocio e traduzir em solucoes tecnicas e notavel. Profissional comprometido e confiavel.",
    rating: 5,
    relationship: "manager",
    date: "Fevereiro 2025",
    verified: true,
  },
  {
    id: "4",
    name: "Joao Oliveira",
    role: "Professor de Programacao",
    company: "Centro Universitario Facens",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Como professor, posso afirmar que Henrique se destaca pela curiosidade e vontade de aprender. Sempre questiona, busca entender o 'porque' das coisas e aplica os conceitos de forma criativa. Um aluno exemplar.",
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
      "Henrique me ajudou com um projeto pessoal e fiquei impressionado com a qualidade do codigo e a atencao aos detalhes. Alem das habilidades tecnicas, e uma pessoa muito colaborativa e facil de trabalhar.",
    rating: 4,
    relationship: "client",
    date: "Novembro 2024",
    linkedinUrl: "https://linkedin.com/in/lucas-ferreira",
    verified: true,
  },
]

const relationshipConfig = {
  colleague: { label: "Colega", className: "bg-primary/10 text-primary border-primary/20" },
  mentor: { label: "Mentor", className: "bg-accent/10 text-accent-foreground border-accent/20" },
  client: { label: "Cliente", className: "bg-chart-2/10 text-foreground border-chart-2/20" },
  manager: { label: "Gestor", className: "bg-chart-1/10 text-foreground border-chart-1/20" },
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedRelationship, setSelectedRelationship] = useState<string>("all")
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Depoimentos",
      subtitle: "Feedbacks reais de pessoas que trabalharam comigo ou acompanharam minha jornada profissional",
    },
    en: {
      title: "Testimonials",
      subtitle: "Real feedback from people who have worked with me or followed my professional journey",
    },
  }

  const t = content[language]

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
    { value: "all", label: language === "pt" ? "Todos" : "All" },
    { value: "manager", label: language === "pt" ? "Gestores" : "Managers" },
    { value: "colleague", label: language === "pt" ? "Colegas" : "Colleagues" },
    { value: "mentor", label: language === "pt" ? "Mentores" : "Mentors" },
    { value: "client", label: language === "pt" ? "Clientes" : "Clients" },
  ]

  return (
    <section id="testimonials" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold gradient-text mb-4">{t.title}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Relationship Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {relationships.map((relationship) => (
            <Button
              key={relationship.value}
              variant={selectedRelationship === relationship.value ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedRelationship(relationship.value)
                setCurrentIndex(0)
              }}
              className={selectedRelationship !== relationship.value ? "bg-transparent" : ""}
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
                <Card className="relative overflow-hidden shadow-xl border-border">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />

                  <CardContent className="p-8 md:p-12">
                    <div className="flex items-start gap-6">
                      <Quote className="h-12 w-12 text-primary/20 flex-shrink-0 mt-2" />

                      <div className="flex-1">
                        <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                          &quot;{currentTestimonial.content}&quot;
                        </blockquote>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-14 w-14 border-2 border-primary/20">
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
                                <h3 className="font-semibold text-foreground">{currentTestimonial.name}</h3>
                                {currentTestimonial.verified && (
                                  <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                                    <Star className="h-2.5 w-2.5 text-primary-foreground fill-current" />
                                  </div>
                                )}
                              </div>
                              <p className="text-muted-foreground text-sm">{currentTestimonial.role}</p>
                              <p className="text-muted-foreground text-xs">{currentTestimonial.company}</p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < currentTestimonial.rating
                                      ? "text-chart-4 fill-current"
                                      : "text-muted-foreground/30"
                                  }`}
                                />
                              ))}
                            </div>
                            <Badge variant="outline" className={relationshipConfig[currentTestimonial.relationship].className}>
                              {relationshipConfig[currentTestimonial.relationship].label}
                            </Badge>
                            <p className="text-muted-foreground text-xs mt-1">{currentTestimonial.date}</p>
                          </div>
                        </div>

                        {currentTestimonial.linkedinUrl && (
                          <div className="mt-4 pt-4 border-t border-border">
                            <Button variant="outline" size="sm" asChild className="bg-transparent">
                              <a
                                href={currentTestimonial.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Linkedin className="h-4 w-4" />
                                {language === "pt" ? "Ver perfil no LinkedIn" : "View LinkedIn profile"}
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
              <span className="sr-only">{language === "pt" ? "Anterior" : "Previous"}</span>
            </Button>

            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`${language === "pt" ? "Ir para depoimento" : "Go to testimonial"} ${index + 1}`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full bg-transparent">
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">{language === "pt" ? "Proximo" : "Next"}</span>
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
            <div className="text-muted-foreground text-sm">{language === "pt" ? "Depoimentos" : "Testimonials"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {(testimonials.reduce((acc, t) => acc + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <div className="text-muted-foreground text-sm">{language === "pt" ? "Avaliacao Media" : "Average Rating"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">{testimonials.filter((t) => t.verified).length}</div>
            <div className="text-muted-foreground text-sm">{language === "pt" ? "Verificados" : "Verified"}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-muted-foreground text-sm">{language === "pt" ? "Recomendacao" : "Recommendation"}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
