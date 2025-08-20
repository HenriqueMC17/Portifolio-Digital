"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Heart, Code, Coffee, ArrowUp } from "lucide-react"
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

  const techStack = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Java", "Spring Boot"]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-green-500/10" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-orbitron font-bold text-2xl gradient-text"
            >
              {"<HMC />"}
            </motion.div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.
              Especializado em tecnologias modernas e sempre em busca de novos desafios.
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-110"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                      <link.icon className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-cyan-400">
              Links Rápidos
            </h3>
            <nav className="space-y-2">
              {[
                { label: "Sobre", href: "#about" },
                { label: "Projetos", href: "#projects" },
                { label: "Habilidades", href: "#skills" },
                { label: "Experiência", href: "#experience" },
                { label: "Contato", href: "#contact" },
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="block text-sm text-muted-foreground hover:text-cyan-400 transition-colors duration-300 hover:translate-x-1"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-orbitron font-semibold text-sm uppercase tracking-wider text-purple-400">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-xs px-3 py-1 bg-muted/50 hover:bg-cyan-400/10 rounded-full font-fira-code text-muted-foreground hover:text-cyan-400 transition-all duration-300 cursor-default hover:scale-105"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center text-xs text-muted-foreground space-x-1 pt-2"
            >
              <span>Feito com</span>
              <Heart className="h-3 w-3 text-red-500 fill-current animate-pulse" />
              <span>e muito</span>
              <Coffee className="h-3 w-3 text-amber-500" />
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-border/40"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
              <p className="text-xs text-muted-foreground">
                © {currentYear} Henrique Monteiro Cardoso. Todos os direitos reservados.
              </p>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Code className="h-3 w-3" />
                  <span>Open Source</span>
                </span>
                <span>•</span>
                <span className="font-fira-code">v2.0.0</span>
              </div>
            </div>

            <Button
              onClick={scrollToTop}
              variant="ghost"
              size="icon"
              className="hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 hover:scale-110"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="scan-lines w-full h-full" />
      </div>
    </footer>
  )
}
