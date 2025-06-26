"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechRadar } from "@/components/tech-radar"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, TimerIcon as Timeline, Radar, BarChart3 } from "lucide-react"

const skillCategories = [
  {
    title: "Linguagens de Programação",
    skills: [
      { name: "Java", level: 90, experience: "2+ anos", projects: 8 },
      { name: "JavaScript", level: 85, experience: "2+ anos", projects: 12 },
      { name: "TypeScript", level: 80, experience: "1+ ano", projects: 6 },
      { name: "Python", level: 70, experience: "1 ano", projects: 4 },
      { name: "C++", level: 65, experience: "6 meses", projects: 2 },
      { name: "C#", level: 60, experience: "6 meses", projects: 2 },
      { name: "SQL", level: 85, experience: "2+ anos", projects: 10 },
    ],
  },
  {
    title: "Tecnologias Web",
    skills: [
      { name: "React", level: 90, experience: "2+ anos", projects: 8 },
      { name: "Next.js", level: 85, experience: "1+ ano", projects: 4 },
      { name: "HTML5", level: 95, experience: "3+ anos", projects: 15 },
      { name: "CSS3", level: 90, experience: "3+ anos", projects: 15 },
      { name: "Tailwind CSS", level: 85, experience: "1+ ano", projects: 6 },
      { name: "Bootstrap", level: 80, experience: "2+ anos", projects: 8 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Spring Boot", level: 80, experience: "1+ ano", projects: 4 },
      { name: "Node.js", level: 75, experience: "1+ ano", projects: 5 },
      { name: "PostgreSQL", level: 85, experience: "1+ ano", projects: 6 },
      { name: "MySQL", level: 90, experience: "2+ anos", projects: 8 },
      { name: "MongoDB", level: 65, experience: "6 meses", projects: 2 },
    ],
  },
  {
    title: "Ferramentas & DevOps",
    skills: [
      { name: "Git", level: 95, experience: "3+ anos", projects: 20 },
      { name: "GitHub", level: 90, experience: "2+ anos", projects: 15 },
      { name: "VS Code", level: 95, experience: "3+ anos", projects: 20 },
      { name: "Docker", level: 70, experience: "6 meses", projects: 3 },
      { name: "Vercel", level: 85, experience: "1+ ano", projects: 5 },
    ],
  },
  {
    title: "Soft Skills",
    skills: [
      { name: "Comunicação", level: 90, experience: "Profissional", projects: 0 },
      { name: "Trabalho em Equipe", level: 95, experience: "Profissional", projects: 0 },
      { name: "Liderança", level: 80, experience: "Profissional", projects: 0 },
      { name: "Resolução de Problemas", level: 90, experience: "Profissional", projects: 0 },
      { name: "Pensamento Crítico", level: 85, experience: "Profissional", projects: 0 },
      { name: "Adaptabilidade", level: 90, experience: "Profissional", projects: 0 },
    ],
  },
]

function SkillBar({ skill, index }: { skill: any; index: number }) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">{skill.name}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{skill.experience}</span>
          <Badge variant="outline" className="text-xs">
            {skill.level}%
          </Badge>
        </div>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-primary to-chart-1 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
        />
      </div>
      {skill.projects > 0 && (
        <div className="text-xs text-muted-foreground">
          Usado em {skill.projects} projeto{skill.projects > 1 ? "s" : ""}
        </div>
      )}
    </motion.div>
  )
}

export function EnhancedSkillsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
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
          <h2 className="text-3xl font-bold mb-4">Habilidades & Tecnologias</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore minhas competências técnicas, experiência profissional e jornada de aprendizado contínuo
          </p>
        </motion.div>

        <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Habilidades
            </TabsTrigger>
            <TabsTrigger value="radar" className="flex items-center gap-2">
              <Radar className="h-4 w-4" />
              Tech Radar
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Timeline className="h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-6">
                        <Code className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-lg">{category.title}</h3>
                      </div>
                      <div className="space-y-4">
                        {category.skills.map((skill, index) => (
                          <SkillBar key={skill.name} skill={skill} index={index} />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="radar">
            <TechRadar />
          </TabsContent>

          <TabsContent value="timeline">
            <InteractiveTimeline />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
