"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.experience": "Experiência",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "hero.title": "Desenvolvedor Full Stack & Especialista em IA",
    "hero.subtitle": "Criando experiências digitais inovadoras com React, Next.js e Inteligência Artificial",
    "hero.cta": "Ver Projetos",
    "about.title": "Sobre Mim",
    "skills.title": "Habilidades Técnicas",
    "projects.title": "Projetos em Destaque",
    "projects.filter.all": "Todos",
    "projects.filter.web": "Web",
    "projects.filter.mobile": "Mobile",
    "projects.filter.ai": "IA",
    "experience.title": "Experiência Profissional",
    "blog.title": "Artigos Recentes",
    "contact.title": "Entre em Contato",
    "contact.name": "Nome",
    "contact.email": "E-mail",
    "contact.message": "Mensagem",
    "contact.send": "Enviar Mensagem",
    "newsletter.title": "Assine a Newsletter",
    "newsletter.subtitle": "Receba atualizações sobre novos projetos e artigos",
    "newsletter.placeholder": "Seu melhor e-mail",
    "newsletter.button": "Inscrever-se",
    "faq.title": "Perguntas Frequentes",
    "footer.rights": "Todos os direitos reservados",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.experience": "Experience",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "hero.title": "Full Stack Developer & AI Specialist",
    "hero.subtitle": "Creating innovative digital experiences with React, Next.js and Artificial Intelligence",
    "hero.cta": "View Projects",
    "about.title": "About Me",
    "skills.title": "Technical Skills",
    "projects.title": "Featured Projects",
    "projects.filter.all": "All",
    "projects.filter.web": "Web",
    "projects.filter.mobile": "Mobile",
    "projects.filter.ai": "AI",
    "experience.title": "Professional Experience",
    "blog.title": "Recent Articles",
    "contact.title": "Get in Touch",
    "contact.name": "Name",
    "contact.email": "Email",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "newsletter.title": "Subscribe to Newsletter",
    "newsletter.subtitle": "Receive updates about new projects and articles",
    "newsletter.placeholder": "Your best email",
    "newsletter.button": "Subscribe",
    "faq.title": "Frequently Asked Questions",
    "footer.rights": "All rights reserved",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof typeof translations.pt] || key
    },
    [language],
  )

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("language") as Language
      if (savedLang && (savedLang === "pt" || savedLang === "en")) {
        setLanguageState(savedLang)
      }
    }
  }, [])

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
