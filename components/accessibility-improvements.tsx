"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accessibility, Type, Keyboard, X, Contrast, ZoomIn } from "lucide-react"

interface AccessibilityState {
  highContrast: boolean
  largeText: boolean
  keyboardNavigation: boolean
  screenReader: boolean
  reducedMotion: boolean
}

export function AccessibilityImprovements() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilityState>({
    highContrast: false,
    largeText: false,
    keyboardNavigation: false,
    screenReader: false,
    reducedMotion: false,
  })

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem("accessibility-settings")
    if (saved) {
      const parsedSettings = JSON.parse(saved)
      setSettings(parsedSettings)
      applySettings(parsedSettings)
    }

    // Keyboard shortcuts
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "a") {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [])

  const applySettings = (newSettings: AccessibilityState) => {
    const root = document.documentElement

    // High contrast
    if (newSettings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    // Large text
    if (newSettings.largeText) {
      root.classList.add("large-text")
    } else {
      root.classList.remove("large-text")
    }

    // Keyboard navigation
    if (newSettings.keyboardNavigation) {
      root.classList.add("keyboard-navigation")
    } else {
      root.classList.remove("keyboard-navigation")
    }

    // Reduced motion
    if (newSettings.reducedMotion) {
      root.classList.add("reduce-motion")
    } else {
      root.classList.remove("reduce-motion")
    }
  }

  const updateSetting = (key: keyof AccessibilityState) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    }
    setSettings(newSettings)
    applySettings(newSettings)
    localStorage.setItem("accessibility-settings", JSON.stringify(newSettings))
  }

  const resetSettings = () => {
    const defaultSettings: AccessibilityState = {
      highContrast: false,
      largeText: false,
      keyboardNavigation: false,
      screenReader: false,
      reducedMotion: false,
    }
    setSettings(defaultSettings)
    applySettings(defaultSettings)
    localStorage.removeItem("accessibility-settings")
  }

  const accessibilityOptions = [
    {
      key: "highContrast" as keyof AccessibilityState,
      icon: Contrast,
      title: "Alto Contraste",
      description: "Aumenta o contraste para melhor visibilidade",
      active: settings.highContrast,
    },
    {
      key: "largeText" as keyof AccessibilityState,
      icon: Type,
      title: "Texto Grande",
      description: "Aumenta o tamanho da fonte em todo o site",
      active: settings.largeText,
    },
    {
      key: "keyboardNavigation" as keyof AccessibilityState,
      icon: Keyboard,
      title: "Navegação por Teclado",
      description: "Melhora a navegação usando apenas o teclado",
      active: settings.keyboardNavigation,
    },
    {
      key: "reducedMotion" as keyof AccessibilityState,
      icon: ZoomIn,
      title: "Reduzir Animações",
      description: "Reduz ou remove animações e transições",
      active: settings.reducedMotion,
    },
  ]

  return (
    <>
      {/* Accessibility Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label="Abrir painel de acessibilidade (Alt + A)"
          title="Acessibilidade (Alt + A)"
        >
          <Accessibility className="w-5 h-5" />
        </Button>
      </motion.div>

      {/* Skip Links */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
        <Button
          onClick={() => document.getElementById("main-content")?.focus()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Pular para o conteúdo principal
        </Button>
      </div>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-background rounded-2xl shadow-2xl border border-border/50 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/50 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                    <Accessibility className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Acessibilidade</h3>
                    <p className="text-sm text-muted-foreground">Personalize sua experiência</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-red-500/10 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Options */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {accessibilityOptions.map((option) => (
                  <Card
                    key={option.key}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      option.active
                        ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => updateSetting(option.key)}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          option.active
                            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <option.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{option.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          option.active ? "bg-green-500 border-green-500" : "border-muted-foreground"
                        }`}
                      >
                        {option.active && <div className="w-full h-full rounded-full bg-white scale-50"></div>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-border/50 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    <p>Atalhos: Alt + A para abrir</p>
                    <p>Esc para fechar</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={resetSettings} className="text-xs bg-transparent">
                    Resetar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%) brightness(110%);
        }
        
        .large-text {
          font-size: 120% !important;
        }
        
        .large-text * {
          font-size: inherit !important;
        }
        
        .keyboard-navigation *:focus {
          outline: 3px solid #3b82f6 !important;
          outline-offset: 2px !important;
        }
        
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .reduce-motion * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  )
}
