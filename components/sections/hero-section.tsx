"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

const stats = [
  { value: "10+", labelPt: "Projetos Reais", labelEn: "Real Projects" },
  { value: "8+", labelPt: "Tecnologias Principais", labelEn: "Core Technologies" },
  { value: "100%", labelPt: "Foco em Qualidade", labelEn: "Quality Focus" },
]

export function HeroSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      headline: "Desenvolvedor de Software focado em arquitetura, performance e soluções inteligentes.",
      subheadline: "Transformo problemas complexos em sistemas escaláveis, seguros e orientados a resultados reais.",
      viewProjects: "Ver Projetos",
      contact: "Falar Comigo",
      downloadCV: "Baixar Currículo",
    },
    en: {
      headline: "Software Developer focused on architecture, performance and intelligent solutions.",
      subheadline: "I turn complex problems into scalable, secure systems oriented to real outcomes.",
      viewProjects: "View Projects",
      contact: "Contact Me",
      downloadCV: "Download Resume",
    },
  }

  const t = content[language]

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-balance mb-6"
          >
            {t.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10"
          >
            {t.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
          >
            <Button size="lg" asChild className="text-base px-8">
              <a href="#projects">{t.viewProjects}</a>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <a href="#contact">{t.contact}</a>
            </Button>
            <Button size="lg" variant="secondary" asChild className="text-base px-8">
              <a href="/Henrique-Monteiro-Curriculo.pdf" download>
                <Download className="h-4 w-4 mr-2" />
                {t.downloadCV}
              </a>
            </Button>
          </motion.div>

          <div className="flex justify-center gap-3 mb-10">
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.value} className="rounded-xl border border-border bg-card/70 p-4">
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{language === "pt" ? stat.labelPt : stat.labelEn}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Rolar para seção sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowDown className="h-6 w-6 animate-bounce" />
      </a>
    </section>
  )
}
