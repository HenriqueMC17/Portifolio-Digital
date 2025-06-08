"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAnalytics } from "@/components/analytics-provider"

export function AnalyticsConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const { isEnabled, setEnabled } = useAnalytics()

  useEffect(() => {
    // Verificar se o usuário já fez uma escolha
    const consent = localStorage.getItem("analytics_consent")

    if (consent === null) {
      // Se não houver escolha prévia, mostrar o banner após 2 segundos
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000)

      return () => clearTimeout(timer)
    } else {
      // Aplicar a escolha prévia
      setEnabled(consent === "true")
    }
  }, [setEnabled])

  const handleAccept = () => {
    setEnabled(true)
    localStorage.setItem("analytics_consent", "true")
    setIsVisible(false)
  }

  const handleDecline = () => {
    setEnabled(false)
    localStorage.setItem("analytics_consent", "false")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-0 right-0 mx-auto max-w-lg bg-card shadow-lg rounded-lg p-4 z-50 border"
      >
        <h3 className="font-semibold mb-2">Sua privacidade é importante</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Este site utiliza analytics para melhorar a experiência do usuário. Você permite a coleta de dados anônimos
          sobre sua navegação?
        </p>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={handleDecline}>
            Recusar
          </Button>
          <Button variant="default" size="sm" onClick={handleAccept}>
            Aceitar
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
