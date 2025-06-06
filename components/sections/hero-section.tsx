"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [translations, setTranslations] = useState({
    greeting: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    cta: "Ver Projetos",
    contact: "Contato",
  })
  const languageContext = useLanguage()

  // Safe access to language context after mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update translations when language context is available
  useEffect(() => {
    if (languageContext) {
      setTranslations({
        greeting: languageContext.t("hero.greeting") || "Olá, eu sou",
        role: languageContext.t("hero.role") || "Desenvolvedor Full Stack",
        cta: languageContext.t("hero.cta") || "Ver Projetos",
        contact: languageContext.t("hero.contact") || "Contato",
      })
    }
  }, [languageContext])

  const scrollToNextSection = () => {
    if (scrollRef.current) {
      const nextSection = scrollRef.current.nextElementSibling
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section ref={scrollRef} className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-muted-foreground">{translations.greeting} </span>
              <span className="text-primary">Henrique Monteiro Cardoso</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6">{translations.role}</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              Sou um estudante dedicado e apaixonado por tecnologia. Acredito que a combinação de conhecimento técnico e
              sensibilidade humana pode criar soluções inovadoras que impactam positivamente a sociedade. Aqui,
              compartilho meus projetos, ideias e experiências que refletem essa visão.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <Button asChild size="lg">
                <Link href="#projects">{translations.cta}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#contact">{translations.contact}</Link>
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start space-x-4">
              <a
                href="https://github.com/HenriqueMC17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?ogbl#inbox?compose=DmwnWsLPtbbGXsfgCfnRmFjhbKHcJSLgJFZHwNzqrLjkWqlBzgnHZDGNLLhJFBtqMJnLbcmDSgWg"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src="https://media.licdn.com/dms/image/v2/D4D03AQFKZkX8KAg7eA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1719774970076?e=1753920000&v=beta&t=-rUc6PMJ9lPgnuHfx2MFWeGYIMuuVWBN_dwZhpC7piw"
                alt="Henrique Monteiro Cardoso"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <button
            onClick={scrollToNextSection}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-6 w-6 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
