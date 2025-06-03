"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Briefcase } from "lucide-react"
import { Github } from "lucide-react"
import { GraduationCap } from "lucide-react"

export function AboutSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      value: 2,
      label: t("about.yearsExperience"),
      icon: <Briefcase className="h-6 w-6 text-primary" />,
    },
    {
      value: 5,
      label: t("about.projectsCompleted"),
      icon: <Code className="h-6 w-6 text-primary" />,
    },
    {
      value: 28,
      label: "Repositórios GitHub",
      icon: <Github className="h-6 w-6 text-primary" />,
    },
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("about.title")} subtitle={t("about.subtitle")} centered />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          {/* About Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-lg">{t("about.description1")}</p>
            <p className="text-lg">{t("about.description2")}</p>

            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-4">Tecnologias Favoritas</h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "JavaScript", "TypeScript", "Python", "HTML5", "CSS3", "Arduino"].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h3 className="text-xl font-semibold mb-4">Formação Acadêmica</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <GraduationCap className="w-5 h-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium">Técnologo em Análise e Desenvolvimento de Sistemas</h4>
                    <p className="text-sm text-muted-foreground">Centro Universitário Facens - 2025-2027</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 rounded-full bg-primary/10">{stat.icon}</div>
                    <h3 className="text-3xl font-bold text-primary mb-2">{stat.value}+</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
