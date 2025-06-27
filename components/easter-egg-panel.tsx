"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Egg, X, Lock, Unlock, RefreshCw } from "lucide-react"
import { useEasterEggs } from "@/components/easter-egg-provider"
import { useAnalytics } from "@/components/analytics-provider"

export function EasterEggPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const { easterEggs, activeEasterEggs, unlockedEasterEggs, activateEasterEgg, deactivateEasterEgg, resetEasterEggs } =
    useEasterEggs()
  const { trackEvent } = useAnalytics()

  const togglePanel = () => {
    setIsOpen(!isOpen)
    trackEvent("button_click", { buttonId: "easter-egg-panel-toggle" })
  }

  const handleActivate = (id: string) => {
    activateEasterEgg(id as any)
    trackEvent("button_click", { buttonId: `activate-easter-egg-${id}` })
  }

  const handleDeactivate = (id: string) => {
    deactivateEasterEgg(id as any)
    trackEvent("button_click", { buttonId: `deactivate-easter-egg-${id}` })
  }

  const handleReset = () => {
    resetEasterEggs()
    trackEvent("button_click", { buttonId: "reset-easter-eggs" })
  }

  return (
    <>
      <motion.button
        className="fixed bottom-4 left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePanel}
      >
        <Egg className="h-5 w-5" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="easter-egg-panel fixed left-2 md:left-4 bottom-16 w-[calc(100vw-16px)] max-w-80 bg-card shadow-lg rounded-lg p-4 z-40 border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Egg className="h-5 w-5 mr-2 text-primary" />
                <h3 className="font-semibold text-sm md:text-base">Easter Eggs</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={togglePanel}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3 max-h-60 md:max-h-80 overflow-y-auto pr-2">
              {easterEggs.map((egg) => (
                <div key={egg.id} className={`p-3 rounded-lg border ${egg.isUnlocked ? "bg-muted/50" : "bg-muted/20"}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center min-w-0 flex-1">
                      {egg.isUnlocked ? (
                        <Unlock className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                      ) : (
                        <Lock className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className="font-medium text-sm truncate">{egg.isUnlocked ? egg.name : "???"}</span>
                    </div>
                    <Badge variant={egg.isActive ? "default" : "outline"} className="text-xs ml-2 flex-shrink-0">
                      {egg.isActive ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {egg.isUnlocked ? egg.description : "Easter egg bloqueado. Descubra a sequência secreta!"}
                  </p>

                  {egg.isUnlocked && (
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs bg-muted px-2 py-1 rounded font-mono flex-shrink-0 min-w-0">
                        <span className="truncate">{egg.trigger}</span>
                      </div>

                      {egg.isActive ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs flex-shrink-0 bg-transparent"
                          onClick={() => handleDeactivate(egg.id)}
                        >
                          Desativar
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="default"
                          className="h-7 text-xs flex-shrink-0"
                          onClick={() => handleActivate(egg.id)}
                        >
                          Ativar
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                <span>{unlockedEasterEggs.length}</span>
                <span> de </span>
                <span>{easterEggs.length}</span>
                <span> descobertos</span>
              </div>

              <Button
                size="sm"
                variant="outline"
                className="h-8 bg-transparent"
                onClick={handleReset}
                disabled={activeEasterEggs.length === 0}
              >
                <RefreshCw className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Resetar</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
