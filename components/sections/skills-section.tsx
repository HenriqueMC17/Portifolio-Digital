"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Monitor,
  Server,
  Database,
  GitBranch,
  Cog,
  Brain,
} from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

const categoryIcons = [Monitor, Server, Database, GitBranch, Cog, Brain]

export function SkillsSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Habilidades Tecnicas",
      subtitle: "Tecnologias, ferramentas e competencias que domino",
      categories: [
        {
          title: "Front-end",
          skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
        },
        {
          title: "Back-end",
          skills: ["Java", "Node.js", "Python", "C#", "APIs REST", "Integracao de servicos"],
        },
        {
          title: "Banco de Dados",
          skills: ["SQL", "PostgreSQL", "MySQL", "Modelagem relacional"],
        },
        {
          title: "DevOps & Infraestrutura",
          skills: ["Git & GitHub", "CI/CD", "Deploy em nuvem", "Versionamento e organizacao de projetos"],
        },
        {
          title: "Automacao e Produtividade",
          skills: ["VBA", "Google Apps Script", "Arduino", "Integracao entre sistemas"],
        },
        {
          title: "Soft Skills",
          skills: [
            "Pensamento analitico",
            "Organizacao",
            "Comunicacao tecnica clara",
            "Resolucao estruturada de problemas",
            "Aprendizado continuo",
          ],
        },
      ],
    },
    en: {
      title: "Technical Skills",
      subtitle: "Technologies, tools and competencies I master",
      categories: [
        {
          title: "Front-end",
          skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
        },
        {
          title: "Back-end",
          skills: ["Java", "Node.js", "Python", "C#", "REST APIs", "Service integration"],
        },
        {
          title: "Databases",
          skills: ["SQL", "PostgreSQL", "MySQL", "Relational modeling"],
        },
        {
          title: "DevOps & Infrastructure",
          skills: ["Git & GitHub", "CI/CD", "Cloud deploy", "Versioning and project organization"],
        },
        {
          title: "Automation & Productivity",
          skills: ["VBA", "Google Apps Script", "Arduino", "Systems integration"],
        },
        {
          title: "Soft Skills",
          skills: [
            "Analytical thinking",
            "Organization",
            "Clear technical communication",
            "Structured problem solving",
            "Continuous learning",
          ],
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
            <p className="text-center text-muted-foreground mb-12">{t.subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.categories.map((category, index) => {
                const Icon = categoryIcons[index]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-xl">{category.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="text-sm">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
