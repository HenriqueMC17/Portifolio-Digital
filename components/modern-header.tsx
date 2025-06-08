"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Globe, Moon, Sun, Github, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { useAnalytics } from "@/components/analytics-provider"
import { throttle } from "@/lib/utils"

const navigation = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.certifications", href: "#certifications" },
  { key: "nav.contributions", href: "#contributions" },
  { key: "nav.contact", href: "#contact" },
]

export function ModernHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { trackEvent } = useAnalytics()

  // Throttled scroll handler for performance
  const handleScroll = useCallback(
    throttle(() => {
      setScrolled(window.scrollY > 50)
    }, 100),
    [],
  )

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const handleNavClick = useCallback(
    (href: string, name: string) => {
      setIsOpen(false)
      trackEvent("link_click", { href, section: name })

      // Smooth scroll with offset for fixed header
      const element = document.querySelector(href)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    },
    [trackEvent],
  )

  const handleThemeToggle = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    trackEvent("button_click", { buttonId: "theme-toggle", newTheme })
  }, [theme, setTheme, trackEvent])

  const handleLanguageToggle = useCallback(() => {
    const newLanguage = language === "pt" ? "en" : "pt"
    setLanguage(newLanguage)
    trackEvent("button_click", { buttonId: "language-toggle", newLanguage })
  }, [language, setLanguage, trackEvent])

  const handleMobileMenuToggle = useCallback(() => {
    setIsOpen(!isOpen)
    trackEvent("button_click", { buttonId: "mobile-menu-toggle", isOpen: !isOpen })
  }, [isOpen, trackEvent])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isOpen])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono font-bold text-xl gradient-text"
          >
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                handleNavClick("#hero", "logo")
              }}
              aria-label="Voltar ao início"
            >
              {"<HMC />"}
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Navegação principal">
            {navigation.map((item, index) => (
              <motion.a
                key={item.key}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href, t(item.key))
                }}
              >
                {t(item.key)}
              </motion.a>
            ))}
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLanguageToggle}
              className="hidden md:flex"
              aria-label={`Alterar idioma para ${language === "pt" ? "inglês" : "português"}`}
            >
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              aria-label={`Alterar para tema ${theme === "dark" ? "claro" : "escuro"}`}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>

            {/* Social Links */}
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="icon" asChild aria-label="Perfil no GitHub">
                <a
                  href="https://github.com/HenriqueMC17"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("link_click", { href: "github", external: true })}
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Perfil no LinkedIn">
                <a
                  href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("link_click", { href: "linkedin", external: true })}
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild aria-label="Enviar email">
                <a href="mailto:henriquemon17@gmail.com" onClick={() => trackEvent("link_click", { href: "email" })}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={handleMobileMenuToggle}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10"
              role="navigation"
              aria-label="Navegação móvel"
            >
              <div className="space-y-2">
                {navigation.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavClick(item.href, t(item.key))
                    }}
                  >
                    {t(item.key)}
                  </a>
                ))}
                <div className="flex items-center space-x-2 pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLanguageToggle}
                    aria-label={`Alterar idioma para ${language === "pt" ? "inglês" : "português"}`}
                  >
                    <Globe className="h-4 w-4 mr-1" aria-hidden="true" />
                    {language.toUpperCase()}
                  </Button>
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
