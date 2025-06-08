"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const skillCategories = [
  {
    title: "Linguagens de Programação",
    skills: ["Java", "JavaScript", "TypeScript", "Python", "C++", "C#", "SQL"],
  },
  {
    title: "Tecnologias Web",
    skills: ["HTML5", "CSS3", "Bootstrap", "Responsive Design", "VBA", "Apps Script"],
  },
  {
    title: "Ferramentas e Sistemas",
    skills: ["GitHub", "VS Code", "Eclipse", "Arduino", "Microsoft Office", "DKSoft", "Sponte"],
  },
  {
    title: "Competências Técnicas",
    skills: ["Análise de Dados", "Dashboards", "Suporte Técnico", "Gestão de TI", "Segurança Digital"],
  },
  {
    title: "Gestão e Administração",
    skills: ["Gestão de Equipes", "Atendimento ao Cliente", "Processos Administrativos", "Treinamento"],
  },
  {
    title: "Soft Skills",
    skills: ["Comunicação", "Trabalho em Equipe", "Liderança", "Pensamento Crítico", "Resolução de Problemas"],
  },
]

export function SkillsSection() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  return (
    <section id="skills" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tecnologias, ferramentas e competências que desenvolvi ao longo da minha jornada acadêmica e profissional.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
