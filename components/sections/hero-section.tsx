"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const stats = [
  { value: "15+", labelPt: "Certificacoes", labelEn: "Certifications" },
  { value: "5+", labelPt: "Projetos Entregues", labelEn: "Projects Delivered" },
  { value: "3+", labelPt: "Anos de Experiencia", labelEn: "Years Experience" },
]

export function HeroSection() {
  const { language } = useLanguage()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const content = {
    pt: {
      greeting: "Ola, eu sou",
      name: "Henrique Monteiro Cardoso",
      title: "Desenvolvedor Full Stack & Estudante de ADS",
      description:
        "Transformo ideias em solucoes digitais de alta performance. Especializado em React, Next.js, Java e Python, com experiencia em administracao, TI e suporte ao cliente.",
      cta: "Solicitar Orcamento",
      viewProjects: "Ver Projetos",
    },
    en: {
      greeting: "Hello, I'm",
      name: "Henrique Monteiro Cardoso",
      title: "Full Stack Developer & ADS Student",
      description:
        "I turn ideas into high-performance digital solutions. Specialized in React, Next.js, Java and Python, with experience in administration, IT and customer support.",
      cta: "Request a Quote",
      viewProjects: "View Projects",
    },
  }

  const t = content[language]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      {/* Parallax Blobs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          x: mousePosition.x * 0.02,
          y: mousePosition.y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-lg text-muted-foreground mb-4 font-medium">{t.greeting}</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-balance">{t.name}</h1>
            <p className="text-2xl md:text-3xl text-primary mb-6 font-semibold">{t.title}</p>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-pretty">
              {t.description}
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-3 mb-8">
              <Button size="icon" variant="outline" asChild className="rounded-full">
                <a href="https://github.com/HenriqueMC17" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full">
                <a
                  href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full">
                <a href="mailto:henriquemon17@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full">
                <a href="tel:+5515988027261" aria-label="Telefone">
                  <Phone className="h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild className="text-base px-8">
                <a href="#contact">{t.cta}</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
                <a href="#projects">{t.viewProjects}</a>
              </Button>
            </div>

            {/* Social Proof / Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {language === "pt" ? stat.labelPt : stat.labelEn}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <a href="#about" aria-label="Rolar para baixo">
              <ArrowDown className="h-6 w-6 text-muted-foreground" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
