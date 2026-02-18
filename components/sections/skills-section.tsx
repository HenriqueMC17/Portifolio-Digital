"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export function SkillsSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Habilidades Técnicas",
      subtitle: "Tecnologias e ferramentas que domino",
      categories: [
        {
          title: "Linguagens de Programação",
          skills: ["Java", "JavaScript", "TypeScript", "Python", "C++", "C#", "HTML5", "CSS3", "SQL"],
        },
        {
          title: "Frameworks & Bibliotecas",
          skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
        },
        {
          title: "Ferramentas & Plataformas",
          skills: ["GitHub", "VS Code", "Eclipse", "Arduino", "VBA", "Apps Script", "Docker"],
        },
        {
          title: "Competências Profissionais",
          skills: [
            "Microsoft Excel",
            "Sistemas Integrados",
            "Suporte Técnico",
            "Gestão de Processos",
            "Análise de Dados",
            "Treinamento",
          ],
        },
      ],
    },
    en: {
      title: "Technical Skills",
      subtitle: "Technologies and tools I master",
      categories: [
        {
          title: "Programming Languages",
          skills: ["Java", "JavaScript", "TypeScript", "Python", "C++", "C#", "HTML5", "CSS3", "SQL"],
        },
        {
          title: "Frameworks & Libraries",
          skills: ["React", "Next.js", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
        },
        {
          title: "Tools & Platforms",
          skills: ["GitHub", "VS Code", "Eclipse", "Arduino", "VBA", "Apps Script", "Docker"],
        },
        {
          title: "Professional Skills",
          skills: [
            "Microsoft Excel",
            "Integrated Systems",
            "Technical Support",
            "Process Management",
            "Data Analysis",
            "Training",
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {t.categories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
