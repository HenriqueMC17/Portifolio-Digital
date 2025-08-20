"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Code, Briefcase, Mail, Github, Linkedin, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export function ModernHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#home", label: "Início", icon: Home },
    { href: "#about", label: "Sobre", icon: User },
    { href: "#skills", label: "Habilidades", icon: Code },
    { href: "#projects", label: "Projetos", icon: Briefcase },
    { href: "#contact", label: "Contato", icon: Mail },
  ]

  const socialLinks = [
    { href: "https://github.com/HenriqueMC17", icon: Github, label: "GitHub" },
    { href: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/", icon: Linkedin, label: "LinkedIn" },
  ]

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const downloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv-henrique-monteiro-cardoso.pdf"
    link.download = "CV-Henrique-Monteiro-Cardoso.pdf"
    link.click()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-orbitron font-bold text-xl gradient-text cursor-pointer"
            onClick={() => handleNavClick("#home")}
          >
            {"<HMC />"}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.href)}
                className="relative group text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Social Links */}
            {socialLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="icon"
                asChild
                className="hover:text-cyan-400 transition-colors"
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <link.icon className="h-4 w-4" />
                </a>
              </Button>
            ))}

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="font-mono text-xs hover:text-cyan-400"
            >
              {language.toUpperCase()}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Download CV */}
            <Button
              onClick={downloadCV}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <Download className="h-4 w-4 mr-2" />
              CV
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border/50"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                ))}

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2">
                    {socialLinks.map((link) => (
                      <Button key={link.href} variant="ghost" size="icon" asChild className="hover:text-cyan-400">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <link.icon className="h-4 w-4" />
                        </a>
                      </Button>
                    ))}
                    <ThemeToggle />
                  </div>

                  <Button
                    onClick={downloadCV}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-lg"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    CV
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
