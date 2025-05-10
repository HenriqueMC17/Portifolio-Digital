"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ptBR } from "@/locales/pt-br"
import { enUS } from "@/locales/en-us"

type Language = "pt-BR" | "en-US"
type Translations = typeof ptBR

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof ptBR) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const [translations, setTranslations] = useState<Translations>(ptBR)

  useEffect(() => {
    // Verificar se há uma preferência de idioma salva
    const savedLanguage = localStorage.getItem("language") as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      // Verificar o idioma do navegador
      const browserLanguage = navigator.language
      if (browserLanguage.startsWith("en")) {
        setLanguage("en-US")
      }
    }
  }, [])

  useEffect(() => {
    // Atualizar as traduções quando o idioma mudar
    if (language === "en-US") {
      setTranslations(enUS)
    } else {
      setTranslations(ptBR)
    }

    // Salvar a preferência de idioma
    localStorage.setItem("language", language)
  }, [language])

  const t = (key: keyof typeof ptBR) => {
    return translations[key] || key
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
