"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ExperienceSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Experiência",
      experiences: [
        {
          title: "Desenvolvedor Full Stack Senior",
          company: "Tech Innovations Inc.",
          period: "2022 - Presente",
          description:
            "Liderando desenvolvimento de aplicações web escaláveis com React e Node.js. Implementação de soluções de IA para otimização de processos.",
        },
        {
          title: "Desenvolvedor Full Stack",
          company: "Digital Solutions Ltd.",
          period: "2020 - 2022",
          description:
            "Desenvolvimento de plataformas e-commerce e sistemas de gerenciamento. Trabalho em equipe ágil com metodologia Scrum.",
        },
        {
          title: "Desenvolvedor Frontend",
          company: "StartUp Ventures",
          period: "2018 - 2020",
          description:
            "Criação de interfaces modernas e responsivas. Implementação de animações e interações complexas.",
        },
      ],
    },
    en: {
      title: "Experience",
      experiences: [
        {
          title: "Senior Full Stack Developer",
          company: "Tech Innovations Inc.",
          period: "2022 - Present",
          description:
            "Leading development of scalable web applications with React and Node.js. Implementation of AI solutions for process optimization.",
        },
        {
          title: "Full Stack Developer",
          company: "Digital Solutions Ltd.",
          period: "2020 - 2022",
          description:
            "Development of e-commerce platforms and management systems. Agile team work with Scrum methodology.",
        },
        {
          title: "Frontend Developer",
          company: "StartUp Ventures",
          period: "2018 - 2020",
          description:
            "Creation of modern and responsive interfaces. Implementation of complex animations and interactions.",
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">{t.title}</h2>

          <div className="space-y-6">
            {t.experiences.map((exp, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Briefcase className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
                      <p className="text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
