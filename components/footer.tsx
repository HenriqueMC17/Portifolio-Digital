"use client"

import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div>
            <Link href="/" className="text-2xl font-bold font-poppins">
              <span className="text-primary">HC</span>Portfolio
            </Link>
            <p className="mt-4 text-muted-foreground">
              Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python e outras tecnologias.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="/#skills" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.skills")}
                </Link>
              </li>
              <li>
                <Link href="/#experience" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.experience")}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conecte-se</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/HenriqueMC17"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:henriquemon17@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Henrique Monteiro Cardoso. {t("footer.rights")}.
          </p>
          <p className="text-sm text-muted-foreground mt-2 md:mt-0 flex items-center">
            {t("footer.madeWith")} <Heart className="h-4 w-4 mx-1 text-red-500" /> Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
