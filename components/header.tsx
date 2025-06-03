"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Home, User, Briefcase, Code, Award, Mail, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useLanguage } from "@/contexts/language-context"

const navigation = [
  { name: "nav.home", href: "#home", icon: Home },
  { name: "nav.about", href: "#about", icon: User },
  { name: "nav.projects", href: "#projects", icon: Code },
  { name: "nav.skills", href: "#skills", icon: Briefcase },
  { name: "nav.experience", href: "#experience", icon: FileText },
  { name: "Certificações", href: "#certifications", icon: Award },
  { name: "nav.contact", href: "#contact", icon: Mail },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const pathname = usePathname()
  const { t, language, setLanguage } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navigation.map((item) => item.href.replace("#", ""))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    if (href.startsWith("#")) {
      const element = document.getElementById(href.replace("#", ""))
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/40" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Henrique Oliveira
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive = activeSection === item.href.replace("#", "")
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {item.name === "Certificações" ? item.name : t(item.name)}
                  {isActive && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant={language === "pt-BR" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("pt-BR")}
                className="text-xs"
              >
                PT
              </Button>
              <Button
                variant={language === "en-US" ? "default" : "ghost"}
                size="sm"
                onClick={() => setLanguage("en-US")}
                className="text-xs"
              >
                EN
              </Button>
            </div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-border/40"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = activeSection === item.href.replace("#", "")
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`flex items-center space-x-3 text-sm font-medium transition-colors hover:text-primary ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name === "Certificações" ? item.name : t(item.name)}</span>
                    </button>
                  )
                })}

                {/* Mobile Language Toggle */}
                <div className="flex items-center space-x-2 pt-4 border-t border-border/40">
                  <span className="text-sm text-muted-foreground">Idioma:</span>
                  <Button
                    variant={language === "pt-BR" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLanguage("pt-BR")}
                    className="text-xs"
                  >
                    PT
                  </Button>
                  <Button
                    variant={language === "en-US" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setLanguage("en-US")}
                    className="text-xs"
                  >
                    EN
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
