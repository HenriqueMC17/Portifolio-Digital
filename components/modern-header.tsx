"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

const navigationItems = [
  { label: { pt: "Inicio", en: "Home" }, href: "#hero" },
  { label: { pt: "Sobre", en: "About" }, href: "#about" },
  { label: { pt: "Servicos", en: "Services" }, href: "#services" },
  { label: { pt: "Projetos", en: "Projects" }, href: "#projects" },
  { label: { pt: "Depoimentos", en: "Testimonials" }, href: "#testimonials" },
  { label: { pt: "Blog", en: "Blog" }, href: "#blog" },
  { label: { pt: "Contato", en: "Contact" }, href: "#contact" },
]

export function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="text-2xl font-bold gradient-text">
            HM
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navegacao principal">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label[language]}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"}
              className="rounded-full"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="rounded-full font-mono text-xs"
            >
              {language === "pt" ? "EN" : "PT"}
            </Button>

            {/* Desktop CTA */}
            <Button asChild size="sm" className="hidden md:inline-flex">
              <a href="#contact">{language === "pt" ? "Fale Comigo" : "Contact Me"}</a>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav
            className="lg:hidden py-4 bg-background/95 backdrop-blur-xl border border-border rounded-lg mt-2 mb-4 shadow-lg"
            aria-label="Navegacao mobile"
          >
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label[language]}
              </a>
            ))}
            <div className="px-4 pt-3 border-t border-border mt-2">
              <Button asChild size="sm" className="w-full">
                <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                  {language === "pt" ? "Fale Comigo" : "Contact Me"}
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
