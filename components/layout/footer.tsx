"use client"

import { Github, Linkedin, Mail } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {currentYear} Henrique. {t("footer.rights")}.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t("footer.version")} 2.0</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/HenriqueMC17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com/in/henrique"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="mailto:contato@henrique.dev"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
