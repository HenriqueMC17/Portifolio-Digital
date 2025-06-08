"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "pt" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  pt: {
    // Navigation
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.certifications": "Certificações",
    "nav.contributions": "Contribuições",
    "nav.contact": "Contato",

    // Hero
    "hero.title": "Desenvolvedor Full Stack",
    "hero.subtitle":
      "Estudante de Análise e Desenvolvimento de Sistemas com foco em soluções práticas e inovadoras. Transformando ideias em produtos digitais funcionais.",
    "hero.cta.contact": "Vamos Conversar",
    "hero.cta.projects": "Ver Projetos",
    "hero.location": "São Paulo, Brasil",
    "hero.availability": "Disponível para novos projetos",

    // About
    "about.title": "Sobre Mim",
    "about.subtitle": "Desenvolvedor em crescimento com visão prática",
    "about.description":
      "Estudante dedicado de Análise e Desenvolvimento de Sistemas, com experiência prática em desenvolvimento full stack e administração de sistemas. Focado em criar soluções eficientes que resolvem problemas reais.",

    // Experience
    "experience.title": "Experiência Profissional",
    "experience.subtitle": "Trajetória de crescimento e aprendizado técnico",

    // Projects
    "projects.title": "Projetos em Destaque",
    "projects.subtitle": "Soluções que geram impacto real",

    // Skills
    "skills.title": "Stack Tecnológico",
    "skills.subtitle": "Expertise em tecnologias modernas",

    // Contributions
    "contributions.title": "Contribuições GitHub",
    "contributions.subtitle": "Atividade e engajamento na comunidade",

    // Contact
    "contact.title": "Vamos Trabalhar Juntos",
    "contact.subtitle": "Pronto para o próximo desafio",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.certifications": "Certifications",
    "nav.contributions": "Contributions",
    "nav.contact": "Contact",

    // Hero
    "hero.title": "Full Stack Developer",
    "hero.subtitle":
      "Systems Analysis and Development student focused on practical and innovative solutions. Transforming ideas into functional digital products.",
    "hero.cta.contact": "Let's Talk",
    "hero.cta.projects": "View Projects",
    "hero.location": "São Paulo, Brazil",
    "hero.availability": "Available for new projects",

    // About
    "about.title": "About Me",
    "about.subtitle": "Growing developer with practical vision",
    "about.description":
      "Dedicated Systems Analysis and Development student with practical experience in full stack development and systems administration. Focused on creating efficient solutions that solve real problems.",

    // Experience
    "experience.title": "Professional Experience",
    "experience.subtitle": "Growth trajectory and technical learning",

    // Projects
    "projects.title": "Featured Projects",
    "projects.subtitle": "Solutions that generate real impact",

    // Skills
    "skills.title": "Technology Stack",
    "skills.subtitle": "Expertise in modern technologies",

    // Contributions
    "contributions.title": "GitHub Contributions",
    "contributions.subtitle": "Activity and community engagement",

    // Contact
    "contact.title": "Let's Work Together",
    "contact.subtitle": "Ready for the next challenge",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
