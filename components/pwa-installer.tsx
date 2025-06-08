"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { useAnalytics } from "@/components/analytics-provider"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Verificar se o app já está instalado
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
      return
    }

    // Capturar o evento beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setIsVisible(true)

      // Rastrear evento
      trackEvent("pwa_install_prompt")
    }

    // Detectar quando o PWA é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setDeferredPrompt(null)
      setIsVisible(false)

      // Rastrear evento
      trackEvent("pwa_installed")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    // Mostrar o banner após 5 segundos se o prompt estiver disponível
    const timer = setTimeout(() => {
      if (deferredPrompt) {
        setIsVisible(true)
      }
    }, 5000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
      clearTimeout(timer)
    }
  }, [deferredPrompt, trackEvent])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    // Mostrar o prompt de instalação
    deferredPrompt.prompt()

    // Aguardar a escolha do usuário
    const choiceResult = await deferredPrompt.userChoice

    if (choiceResult.outcome === "accepted") {
      setIsInstalled(true)
      // Rastrear evento
      trackEvent("pwa_installed")
    } else {
      // Rastrear evento
      trackEvent("pwa_install_dismissed")
    }

    // Limpar o prompt
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    // Rastrear evento
    trackEvent("pwa_install_dismissed")
  }

  if (isInstalled || !isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-card shadow-lg rounded-lg p-4 z-50 border"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Download className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-sm">Instalar Aplicativo</h3>
                <p className="text-xs text-muted-foreground">Acesse offline e tenha uma experiência melhor</p>
              </div>
            </div>
            <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="default" className="flex-1" onClick={handleInstall}>
              <Download className="h-4 w-4 mr-1" />
              Instalar
            </Button>
            <Button size="sm" variant="outline" onClick={handleDismiss}>
              Agora não
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
