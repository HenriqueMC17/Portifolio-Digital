"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { ptBR } from "@/locales/pt-br"
import { enUS } from "@/locales/en-us"

export type Language = "pt-BR" | "en-US"
type Translations = typeof ptBR

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: keyof typeof ptBR) => string
}

// Create context with default values to avoid undefined errors
const LanguageContext = createContext<LanguageContextType>({
  language: "pt-BR",
  setLanguage: () => {},
  t: (key) => key,
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR")
  const [translations, setTranslations] = useState<Translations>(ptBR)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      // Only access localStorage after component mounts
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && (savedLanguage === "pt-BR" || savedLanguage === "en-US")) {
        setLanguage(savedLanguage)
      } else {
        // Check browser language
        const browserLanguage = typeof navigator !== "undefined" ? navigator.language : "pt-BR"
        if (browserLanguage.startsWith("en")) {
          setLanguage("en-US")
        }
      }
    } catch (error) {
      console.error("Error accessing localStorage or navigator:", error)
    }
  }, [])

  useEffect(() => {
    // Update translations when language changes
    if (language === "en-US") {
      setTranslations(enUS)
    } else {
      setTranslations(ptBR)
    }

    // Save language preference
    if (mounted) {
      try {
        localStorage.setItem("language", language)
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }, [language, mounted])

  const t = (key: keyof typeof ptBR): string => {
    try {
      return translations[key] || key
    } catch (error) {
      console.error("Translation error for key:", key, error)
      return key
    }
  }

  const value = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return a safe fallback instead of throwing an error
    return {
      language: "pt-BR" as Language,
      setLanguage: () => {},
      t: (key: string) => key,
    }
  }
  return context
}
