"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Award, Lightbulb } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ExperienceSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Timeline Profissional",
      items: [
        {
          year: "2024 - Atual",
          type: "Experiência",
          title: "Desenvolvimento Full Stack e soluções sob medida",
          description: "Construção de aplicações web, integrações e automações orientadas à eficiência operacional.",
          icon: Briefcase,
          tags: ["Java", "TypeScript", "Python", "SQL"],
        },
        {
          year: "2023 - 2024",
          type: "Projetos",
          title: "Projetos relevantes e evolução técnica",
          description: "Implementação de projetos com foco em arquitetura limpa, performance e manutenção sustentável.",
          icon: Lightbulb,
          tags: ["Next.js", "React", "Integrações", "Automação"],
        },
        {
          year: "2022 - 2024",
          type: "Certificações",
          title: "Qualificações técnicas e formação complementar",
          description: "Consolidação de base técnica com certificações e aprendizado contínuo voltado à aplicação prática.",
          icon: Award,
          tags: ["Dados", "Segurança", "TI", "Gestão"],
        },
      ],
    },
    en: {
      title: "Professional Timeline",
      items: [
        {
          year: "2024 - Present",
          type: "Experience",
          title: "Full Stack development and tailored solutions",
          description: "Building web applications, integrations and automations focused on operational efficiency.",
          icon: Briefcase,
          tags: ["Java", "TypeScript", "Python", "SQL"],
        },
        {
          year: "2023 - 2024",
          type: "Projects",
          title: "Relevant projects and technical growth",
          description: "Project implementation focused on clean architecture, performance and sustainable maintenance.",
          icon: Lightbulb,
          tags: ["Next.js", "React", "Integrations", "Automation"],
        },
        {
          year: "2022 - 2024",
          type: "Certifications",
          title: "Technical qualifications and complementary education",
          description: "Strengthening technical foundations with certifications and continuous practical learning.",
          icon: Award,
          tags: ["Data", "Security", "IT", "Management"],
        },
      ],
    },
  }

  const t = content[language]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-12">{t.title}</h2>

          <div className="space-y-6">
            {t.items.map((item) => (
              <Card key={item.title}>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="outline">{item.year}</Badge>
                        <Badge>{item.type}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
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
