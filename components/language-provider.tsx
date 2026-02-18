"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<string, Record<string, string>> = {
  pt: {
    "nav.home": "Inicio",
    "nav.about": "Sobre",
    "nav.skills": "Habilidades",
    "nav.projects": "Projetos",
    "nav.experience": "Experiencia",
    "nav.blog": "Blog",
    "nav.contact": "Contato",
    "hero.title": "Desenvolvedor de Software",
    "hero.subtitle": "Focado em arquitetura, performance e solucoes inteligentes",
    "hero.cta": "Ver Projetos",
    "about.title": "Sobre Mim",
    "skills.title": "Habilidades Tecnicas",
    "projects.title": "Projetos",
    "projects.filter.all": "Todos",
    "projects.filter.web": "Web",
    "projects.filter.automation": "Automacao",
    "projects.filter.education": "Educacao",
    "experience.title": "Experiencia Profissional",
    "blog.title": "Artigos Recentes",
    contact: "Contato",
    letsWork: "Vamos Trabalhar Juntos",
    name: "Nome",
    email: "E-mail",
    message: "Mensagem",
    sendMessage: "Enviar Mensagem",
    location: "Localizacao",
    "newsletter.title": "Assine a Newsletter",
    "newsletter.subtitle": "Receba atualizacoes sobre novos projetos e artigos",
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
    "hero.title": "Software Developer",
    "hero.subtitle": "Focused on architecture, performance and intelligent solutions",
    "hero.cta": "View Projects",
    "about.title": "About Me",
    "skills.title": "Technical Skills",
    "projects.title": "Projects",
    "projects.filter.all": "All",
    "projects.filter.web": "Web",
    "projects.filter.automation": "Automation",
    "projects.filter.education": "Education",
    "experience.title": "Professional Experience",
    "blog.title": "Recent Articles",
    contact: "Contact",
    letsWork: "Let's Work Together",
    name: "Name",
    email: "Email",
    message: "Message",
    sendMessage: "Send Message",
    location: "Location",
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
      return translations[language]?.[key] || key
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
