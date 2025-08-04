"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Menu, X, MessageCircle, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { AIHenriqueBot } from "@/components/chatbot/ai-henrique-bot"

export function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMenuOpen(false)
    }
  }

  const handleDownloadCV = () => {
    window.open(
      "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k&cid=DEFC6D6DB074BF52&id=DEFC6D6DB074BF52%21s06530a8fd7a1413f96aae8fc5308c101&parId=DEFC6D6DB074BF52%21sd11ecb22e073453eaa45bf1f2f3f921a&o=OneUp",
      "_blank",
    )
  }

  const navItems = [
    { id: "hero", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "skills", label: "Habilidades" },
    { id: "experience", label: "Experiência" },
    { id: "projects", label: "Projetos" },
    { id: "contact", label: "Contato" },
  ]

  if (!mounted) {
    return null
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              onClick={() => scrollToSection("hero")}
            >
              HMC
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection(item.id)}
                  className="text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </motion.div>

              {/* Chat Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChatOpen(true)}
                  className="hidden sm:flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Chat AI</span>
                </Button>
              </motion.div>

              {/* Download CV Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleDownloadCV}
                  className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Download className="h-4 w-4" />
                  <span>Baixar CV</span>
                </Button>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden rounded-full"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/50"
            >
              <div className="container mx-auto px-4 py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium py-2"
                  >
                    {item.label}
                  </motion.button>
                ))}

                {/* Mobile Action Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/50">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsChatOpen(true)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Chat AI</span>
                  </Button>

                  <Button
                    onClick={() => {
                      handleDownloadCV()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg"
                  >
                    <Download className="h-4 w-4" />
                    <span>Baixar CV</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* AI Chat Bot */}
      <AIHenriqueBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  )
}
