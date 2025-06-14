"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { GitHubProjects } from "@/components/github-projects"
import { useLanguage } from "@/components/language-provider"

export function ProjectsSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })
  const { t } = useLanguage()

  return (
    <section id="projects" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">{t("projects.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">{t("projects.subtitle")}</p>
          <div className="mt-4 text-sm text-muted-foreground">Conectado ao GitHub • Dados em tempo real</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GitHubProjects />
        </motion.div>
      </div>
    </section>
  )
}
