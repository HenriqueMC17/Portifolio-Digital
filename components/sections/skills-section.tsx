"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

// Atualizar os dados das habilidades para incluir todas as ferramentas e linguagens mencionadas
const skills = {
  frontend: [
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 85 },
    { name: "JavaScript", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "React", level: 75 },
    { name: "Bootstrap", level: 80 },
    { name: "Tailwind CSS", level: 75 },
  ],
  backend: [
    { name: "Java", level: 95 },
    { name: "Python", level: 80 },
    { name: "C++", level: 75 },
    { name: "C#", level: 75 },
    { name: "SQL", level: 85 },
    { name: "PHP", level: 70 },
    { name: "Node.js", level: 70 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "GitHub", level: 90 },
    { name: "VS Code", level: 90 },
    { name: "Eclipse", level: 85 },
    { name: "Arduino", level: 80 },
    { name: "VBA", level: 85 },
    { name: "Apps Script", level: 80 },
    { name: "Photoshop", level: 75 },
    { name: "Cursor", level: 80 },
    { name: "v0 Dev", level: 70 },
  ],
  other: [
    { name: "Administração", level: 90 },
    { name: "Suporte Técnico", level: 85 },
    { name: "Gestão de Projetos", level: 80 },
    { name: "Análise de Dados", level: 85 },
    { name: "Comunicação", level: 90 },
    { name: "Trabalho em Equipe", level: 95 },
    { name: "Resolução de Problemas", level: 90 },
  ],
}

export function SkillsSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("skills.title")} subtitle={t("skills.subtitle")} centered />

        <Tabs defaultValue="backend" className="mt-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="backend">{t("skills.backend")}</TabsTrigger>
              <TabsTrigger value="frontend">{t("skills.frontend")}</TabsTrigger>
              <TabsTrigger value="tools">{t("skills.tools")}</TabsTrigger>
              <TabsTrigger value="other">{t("skills.other")}</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(skills).map(([category, categorySkills]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categorySkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        ref={ref}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="font-medium">{skill.name}</span>
                            <span className="text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-primary"
                              initial={{ width: 0 }}
                              animate={inView ? { width: `${skill.level}%` } : {}}
                              transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
