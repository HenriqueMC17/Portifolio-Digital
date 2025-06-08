"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, Code, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"

export function ModernFooter() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/HenriqueMC17",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:henriquemon17@gmail.com",
      label: "Email",
    },
  ]

  const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"]

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Description */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono font-bold text-xl gradient-text"
            >
              {"<HMC />"}
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link) => (
                <Button
                  key={link.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary transition-colors"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Links Rápidos</h3>
            <nav className="space-y-2">
              {[
                { label: "Sobre", href: "#about" },
                { label: "Projetos", href: "#projects" },
                { label: "Habilidades", href: "#skills" },
                { label: "Contato", href: "#contact" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wider">Construído com</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 bg-muted rounded-md font-mono text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex items-center text-xs text-muted-foreground space-x-1">
              <span>Feito com</span>
              <Heart className="h-3 w-3 text-red-500 fill-current" />
              <span>e muito</span>
              <Coffee className="h-3 w-3 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-xs text-muted-foreground">
              © {currentYear} Henrique Monteiro Cardoso. Todos os direitos reservados.
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Code className="h-3 w-3" />
                <span>Open Source</span>
              </span>
              <span>•</span>
              <span>Versão 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
