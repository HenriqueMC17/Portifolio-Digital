"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import {
  useKeySequence,
  createEasterEggs,
  type EasterEgg,
  type EasterEggType,
  launchEmojiConfetti,
} from "@/lib/easter-eggs"
import { useToast } from "@/hooks/use-toast"
import { useAnalytics } from "@/components/analytics-provider"

interface EasterEggContextType {
  easterEggs: EasterEgg[]
  activeEasterEggs: EasterEggType[]
  unlockedEasterEggs: EasterEggType[]
  activateEasterEgg: (id: EasterEggType) => void
  deactivateEasterEgg: (id: EasterEggType) => void
  resetEasterEggs: () => void
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined)

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [easterEggs, setEasterEggs] = useState<EasterEgg[]>(createEasterEggs())
  const [activeEasterEggs, setActiveEasterEggs] = useState<EasterEggType[]>([])
  const [unlockedEasterEggs, setUnlockedEasterEggs] = useState<EasterEggType[]>([])
  const { toast } = useToast()
  const { trackEvent } = useAnalytics()

  // Carregar easter eggs desbloqueados do localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("unlockedEasterEggs")
        if (saved) {
          const parsed = JSON.parse(saved) as EasterEggType[]
          setUnlockedEasterEggs(parsed)

          // Atualizar o estado de desbloqueio nos easter eggs
          setEasterEggs((prev) =>
            prev.map((egg) => ({
              ...egg,
              isUnlocked: parsed.includes(egg.id),
            })),
          )
        }
      } catch (error) {
        console.error("Erro ao carregar easter eggs:", error)
      }
    }
  }, [])

  // Salvar easter eggs desbloqueados no localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && unlockedEasterEggs.length > 0) {
      localStorage.setItem("unlockedEasterEggs", JSON.stringify(unlockedEasterEggs))
    }
  }, [unlockedEasterEggs])

  // Função para ativar um easter egg
  const activateEasterEgg = useCallback(
    (id: EasterEggType) => {
      setEasterEggs((prev) => {
        const updatedEggs = prev.map((egg) => {
          if (egg.id === id) {
            // Verificar se já está ativo
            if (egg.isActive) return egg

            // Ativar o easter egg
            const cleanup = egg.activate()

            // Rastrear evento
            trackEvent("easter_egg_activated", { id })

            // Mostrar toast de descoberta se for a primeira vez
            if (!egg.isUnlocked) {
              toast({
                title: "🎉 Easter Egg Descoberto!",
                description: `Você desbloqueou: ${egg.name}`,
                duration: 5000,
              })

              // Lançar confetti para celebrar
              launchEmojiConfetti("🥚")

              // Adicionar à lista de desbloqueados
              setUnlockedEasterEggs((prev) => [...prev, id])
            }

            return {
              ...egg,
              isActive: true,
              isUnlocked: true,
              deactivate: () => {
                if (typeof cleanup === "function") {
                  cleanup()
                }
                egg.deactivate()
              },
            }
          }
          return egg
        })

        return updatedEggs
      })

      setActiveEasterEggs((prev) => [...prev, id])
    },
    [toast, trackEvent],
  )

  // Função para desativar um easter egg
  const deactivateEasterEgg = useCallback(
    (id: EasterEggType) => {
      setEasterEggs((prev) => {
        const updatedEggs = prev.map((egg) => {
          if (egg.id === id && egg.isActive) {
            egg.deactivate()
            return { ...egg, isActive: false }
          }
          return egg
        })

        return updatedEggs
      })

      setActiveEasterEggs((prev) => prev.filter((eggId) => eggId !== id))

      // Rastrear evento
      trackEvent("easter_egg_deactivated", { id })
    },
    [trackEvent],
  )

  // Função para resetar todos os easter eggs
  const resetEasterEggs = useCallback(() => {
    // Desativar todos os easter eggs ativos
    easterEggs.forEach((egg) => {
      if (egg.isActive) {
        egg.deactivate()
      }
    })

    setActiveEasterEggs([])

    // Rastrear evento
    trackEvent("easter_eggs_reset")
  }, [easterEggs, trackEvent])

  // Configurar detecção de sequências de teclas
  const sequences = Object.fromEntries(easterEggs.map((egg) => [egg.id, egg.trigger.split("")]))

  useKeySequence(sequences, (id) => {
    activateEasterEgg(id as EasterEggType)
  })

  // Limpar easter eggs ativos ao desmontar
  useEffect(() => {
    return () => {
      easterEggs.forEach((egg) => {
        if (egg.isActive) {
          egg.deactivate()
        }
      })
    }
  }, [easterEggs])

  return (
    <EasterEggContext.Provider
      value={{
        easterEggs,
        activeEasterEggs,
        unlockedEasterEggs,
        activateEasterEgg,
        deactivateEasterEgg,
        resetEasterEggs,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  )
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext)

  if (context === undefined) {
    throw new Error("useEasterEggs must be used within an EasterEggProvider")
  }

  return context
}
