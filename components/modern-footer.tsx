"use client"

import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ModernFooter() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  const content = {
    pt: {
      tagline: "Construindo o futuro, uma linha de codigo por vez.",
      navigation: "Navegacao",
      services: "Servicos",
      contact: "Contato",
      rights: "Todos os direitos reservados.",
      navLinks: [
        { label: "Inicio", href: "#hero" },
        { label: "Sobre", href: "#about" },
        { label: "Projetos", href: "#projects" },
        { label: "Blog", href: "#blog" },
        { label: "Contato", href: "#contact" },
      ],
      serviceLinks: [
        { label: "Desenvolvimento Web", href: "#services" },
        { label: "Aplicacoes Mobile", href: "#services" },
        { label: "Solucoes com IA", href: "#services" },
        { label: "Consultoria Digital", href: "#services" },
      ],
    },
    en: {
      tagline: "Building the future, one line of code at a time.",
      navigation: "Navigation",
      services: "Services",
      contact: "Contact",
      rights: "All rights reserved.",
      navLinks: [
        { label: "Home", href: "#hero" },
        { label: "About", href: "#about" },
        { label: "Projects", href: "#projects" },
        { label: "Blog", href: "#blog" },
        { label: "Contact", href: "#contact" },
      ],
      serviceLinks: [
        { label: "Web Development", href: "#services" },
        { label: "Mobile Apps", href: "#services" },
        { label: "AI Solutions", href: "#services" },
        { label: "Digital Consulting", href: "#services" },
      ],
    },
  }

  const t = content[language]

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-4">HM</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.tagline}</p>
            <div className="flex gap-3">
              <a
                href="https://github.com/HenriqueMC17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:henriquemon17@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.navigation}</h4>
            <ul className="space-y-2">
              {t.navLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.services}</h4>
            <ul className="space-y-2">
              {t.serviceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">{t.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:henriquemon17@gmail.com" className="hover:text-primary transition-colors">
                  henriquemon17@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="tel:+5515988027261" className="hover:text-primary transition-colors">
                  +55 (15) 98802-7261
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Sorocaba, SP - Brasil</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Henrique Monteiro Cardoso. {t.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {language === "pt" ? "Politica de Privacidade" : "Privacy Policy"}
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              {language === "pt" ? "Termos de Uso" : "Terms of Use"}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
