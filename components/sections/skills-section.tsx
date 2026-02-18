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
      subtitle: "Dashboard de competências, evolução e radar tecnológico",
      categories: [
        { title: "Front-end", skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
        { title: "Back-end", skills: ["Java", "Node.js", "Python", "C#", "APIs REST", "Integração de serviços"] },
        { title: "Banco de Dados", skills: ["SQL", "PostgreSQL", "MySQL", "Modelagem relacional"] },
        { title: "DevOps & Infraestrutura", skills: ["Git", "GitHub", "CI/CD", "Deploy em nuvem", "Versionamento"] },
        { title: "Automação e Produtividade", skills: ["VBA", "Google Apps Script", "Arduino", "Integração entre sistemas"] },
        {
          title: "Soft Skills",
          skills: ["Pensamento analítico", "Organização", "Comunicação técnica", "Resolução estruturada", "Aprendizado contínuo"],
        },
      ],
      levels: [
        { label: "🔵 Dominando", items: ["Java", "JavaScript", "SQL", "HTML/CSS"] },
        { label: "🟣 Em evolução", items: ["TypeScript", "React", "Next.js"] },
        { label: "🟢 Explorando", items: ["Arquitetura avançada", "Performance web", "IA aplicada"] },
      ],
    },
    en: {
      title: "Technical Skills",
      subtitle: "Skills dashboard, growth track and technology radar",
      categories: [
        { title: "Front-end", skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
        { title: "Back-end", skills: ["Java", "Node.js", "Python", "C#", "REST APIs", "Service integration"] },
        { title: "Databases", skills: ["SQL", "PostgreSQL", "MySQL", "Relational modeling"] },
        { title: "DevOps & Infrastructure", skills: ["Git", "GitHub", "CI/CD", "Cloud deploy", "Versioning"] },
        { title: "Automation & Productivity", skills: ["VBA", "Google Apps Script", "Arduino", "Systems integration"] },
        { title: "Soft Skills", skills: ["Analytical thinking", "Organization", "Technical communication", "Structured problem solving", "Continuous learning"] },
      ],
      levels: [
        { label: "🔵 Mastering", items: ["Java", "JavaScript", "SQL", "HTML/CSS"] },
        { label: "🟣 Growing", items: ["TypeScript", "React", "Next.js"] },
        { label: "🟢 Exploring", items: ["Advanced architecture", "Web performance", "Applied AI"] },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="skills" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
            <p className="text-center text-muted-foreground mb-12">{t.subtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {t.categories.map((category) => (
                <Card key={category.title} className="h-full">
                  <CardHeader>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {t.levels.map((level) => (
                <Card key={level.label}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-3">{level.label}</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                      {level.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
