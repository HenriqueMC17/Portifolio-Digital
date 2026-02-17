"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="w-9 h-9">
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-9 h-9 relative overflow-hidden group">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-xl border-white/20">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`cursor-pointer ${theme === "light" ? "bg-white/10" : ""}`}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Modo Claro</span>
          {theme === "light" && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`cursor-pointer ${theme === "dark" ? "bg-white/10" : ""}`}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Modo Escuro</span>
          {theme === "dark" && <div className="ml-auto w-2 h-2 bg-purple-500 rounded-full" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`cursor-pointer ${theme === "system" ? "bg-white/10" : ""}`}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>Sistema</span>
          {theme === "system" && <div className="ml-auto w-2 h-2 bg-green-500 rounded-full" />}
        </DropdownMenuItem>

        {/* Current theme indicator */}
        <div className="px-2 py-1 text-xs text-muted-foreground border-t border-white/10 mt-1">
          Atual: {currentTheme === "dark" ? "Escuro" : "Claro"}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
