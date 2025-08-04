"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, EyeOff, Type, Contrast, Volume2, VolumeX, Keyboard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface AccessibilitySettings {
  highContrast: boolean
  largeText: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  soundEffects: boolean
}

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNavigation: false,
    soundEffects: true,
  })

  useEffect(() => {
    // Carregar configurações salvas
    const saved = localStorage.getItem("accessibility-settings")
    if (saved) {
      setSettings(JSON.parse(saved))
    }

    // Detectar preferências do sistema
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSettings((prev) => ({ ...prev, reducedMotion: true }))
    }

    if (window.matchMedia("(prefers-contrast: high)").matches) {
      setSettings((prev) => ({ ...prev, highContrast: true }))
    }
  }, [])

  useEffect(() => {
    // Salvar configurações
    localStorage.setItem("accessibility-settings", JSON.stringify(settings))

    // Aplicar configurações
    const root = document.documentElement

    if (settings.highContrast) {
      root.classList.add("high-contrast")
    } else {
      root.classList.remove("high-contrast")
    }

    if (settings.largeText) {
      root.classList.add("large-text")
    } else {
      root.classList.remove("large-text")
    }

    if (settings.reducedMotion) {
      root.classList.add("reduced-motion")
    } else {
      root.classList.remove("reduced-motion")
    }

    if (settings.keyboardNavigation) {
      root.classList.add("keyboard-navigation")
    } else {
      root.classList.remove("keyboard-navigation")
    }
  }, [settings])

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      {/* Botão de Acessibilidade */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-4 z-50 w-12 h-12 rounded-full"
        size="icon"
        variant="outline"
        aria-label="Abrir painel de acessibilidade"
      >
        <Eye className="h-5 w-5" />
      </Button>

      {/* Painel de Acessibilidade */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-32 right-4 z-40 w-80"
          >
            <Card className="shadow-xl border-2">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Acessibilidade</h3>
                  <Button onClick={() => setIsOpen(false)} size="sm" variant="ghost" aria-label="Fechar painel">
                    <EyeOff className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Alto Contraste */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Contrast className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Alto Contraste</p>
                        <p className="text-sm text-muted-foreground">Aumenta o contraste das cores</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleSetting("highContrast")}
                      variant={settings.highContrast ? "default" : "outline"}
                      size="sm"
                    >
                      {settings.highContrast ? "Ativo" : "Inativo"}
                    </Button>
                  </div>

                  {/* Texto Grande */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Type className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Texto Grande</p>
                        <p className="text-sm text-muted-foreground">Aumenta o tamanho da fonte</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleSetting("largeText")}
                      variant={settings.largeText ? "default" : "outline"}
                      size="sm"
                    >
                      {settings.largeText ? "Ativo" : "Inativo"}
                    </Button>
                  </div>

                  {/* Navegação por Teclado */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Keyboard className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Navegação por Teclado</p>
                        <p className="text-sm text-muted-foreground">Destaca elementos focados</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleSetting("keyboardNavigation")}
                      variant={settings.keyboardNavigation ? "default" : "outline"}
                      size="sm"
                    >
                      {settings.keyboardNavigation ? "Ativo" : "Inativo"}
                    </Button>
                  </div>

                  {/* Efeitos Sonoros */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.soundEffects ? (
                        <Volume2 className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <VolumeX className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium">Efeitos Sonoros</p>
                        <p className="text-sm text-muted-foreground">Sons de interação</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => toggleSetting("soundEffects")}
                      variant={settings.soundEffects ? "default" : "outline"}
                      size="sm"
                    >
                      {settings.soundEffects ? "Ativo" : "Inativo"}
                    </Button>
                  </div>
                </div>

                {/* Atalhos de Teclado */}
                <div className="mt-6 pt-4 border-t">
                  <h4 className="font-medium mb-3">Atalhos de Teclado</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Tab / Shift+Tab</span>
                      <span>Navegar</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enter / Space</span>
                      <span>Ativar</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Esc</span>
                      <span>Fechar</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Alt + A</span>
                      <span>Acessibilidade</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Hook para atalhos de teclado
export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + A para abrir acessibilidade
      if (e.altKey && e.key === "a") {
        e.preventDefault()
        const button = document.querySelector('[aria-label="Abrir painel de acessibilidade"]') as HTMLButtonElement
        button?.click()
      }

      // Esc para fechar modais
      if (e.key === "Escape") {
        const closeButtons = document.querySelectorAll('[aria-label="Fechar painel"]')
        closeButtons.forEach((button) => (button as HTMLButtonElement).click())
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])
}

// Componente para skip links
export function SkipLinks() {
  return (
    <div className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50">
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Pular para o conteúdo principal
      </a>
    </div>
  )
}
