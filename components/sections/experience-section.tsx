"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  technologies: string[]
}

export function ExperienceSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Experiencia Profissional",
      subtitle: "Linha do tempo das minhas experiencias e entregas",
      experiences: [
        {
          title: "Assistente Comercial",
          company: "CCBEU Sorocaba",
          period: "Fev 2025 - Presente",
          description:
            "Atuacao na area comercial com foco em processos administrativos, atendimento ao cliente e otimizacao de sistemas internos.",
          responsibilities: [
            "Gestao de processos comerciais e administrativos",
            "Atendimento e suporte ao cliente",
            "Otimizacao de planilhas e relatorios com Excel avancado",
            "Integracao entre sistemas educacionais e comerciais",
          ],
          technologies: ["Excel", "Sistemas Integrados", "Gestao de Processos"],
        },
        {
          title: "Jovem Aprendiz - Administrativo",
          company: "ASSA ABLOY",
          period: "Jun 2024 - Jan 2025",
          description:
            "Atuacao como jovem aprendiz no setor administrativo de multinacional, com foco em suporte tecnico, gestao de dados e processos internos.",
          responsibilities: [
            "Suporte tecnico e administrativo",
            "Gestao e organizacao de dados corporativos",
            "Treinamento em privacidade e protecao de dados (LGPD)",
            "Participacao em programas de seguranca cibernetica",
          ],
          technologies: ["Excel", "VBA", "Sistemas Corporativos", "LGPD"],
        },
        {
          title: "Tecnologo em Analise e Desenvolvimento de Sistemas",
          company: "Centro Universitario Facens",
          period: "2024 - Presente",
          description:
            "Formacao superior em ADS com foco em desenvolvimento de software, algoritmos, banco de dados e engenharia de software.",
          responsibilities: [
            "Desenvolvimento de projetos academicos em Java, Python e C#",
            "Estudo de estruturas de dados e algoritmos",
            "Projetos com banco de dados relacional (SQL, PostgreSQL)",
            "Participacao em projetos de extensao e hackathons",
          ],
          technologies: ["Java", "Python", "C#", "SQL", "PostgreSQL", "Git"],
        },
      ] as Experience[],
    },
    en: {
      title: "Professional Experience",
      subtitle: "Timeline of my experiences and deliveries",
      experiences: [
        {
          title: "Commercial Assistant",
          company: "CCBEU Sorocaba",
          period: "Feb 2025 - Present",
          description:
            "Working in commercial area focusing on administrative processes, customer service and internal systems optimization.",
          responsibilities: [
            "Management of commercial and administrative processes",
            "Customer service and support",
            "Optimization of spreadsheets and reports with advanced Excel",
            "Integration between educational and commercial systems",
          ],
          technologies: ["Excel", "Integrated Systems", "Process Management"],
        },
        {
          title: "Young Apprentice - Administrative",
          company: "ASSA ABLOY",
          period: "Jun 2024 - Jan 2025",
          description:
            "Young apprentice in the administrative sector of a multinational company, focusing on technical support, data management and internal processes.",
          responsibilities: [
            "Technical and administrative support",
            "Management and organization of corporate data",
            "Training in privacy and data protection (LGPD)",
            "Participation in cybersecurity programs",
          ],
          technologies: ["Excel", "VBA", "Corporate Systems", "LGPD"],
        },
        {
          title: "Systems Analysis and Development",
          company: "Centro Universitario Facens",
          period: "2024 - Present",
          description:
            "Higher education in ADS focusing on software development, algorithms, databases and software engineering.",
          responsibilities: [
            "Development of academic projects in Java, Python and C#",
            "Study of data structures and algorithms",
            "Projects with relational databases (SQL, PostgreSQL)",
            "Participation in extension projects and hackathons",
          ],
          technologies: ["Java", "Python", "C#", "SQL", "PostgreSQL", "Git"],
        },
      ] as Experience[],
    },
  }

  const t = content[language]

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">{t.title}</h2>
            <p className="text-muted-foreground text-lg">{t.subtitle}</p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

            <div className="space-y-8">
              {t.experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 md:ml-16 relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-[2.55rem] top-8 w-3 h-3 rounded-full bg-primary border-2 border-background hidden md:block" />

                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                            <h3 className="text-xl font-semibold">{exp.title}</h3>
                            <Badge variant="outline" className="text-xs w-fit">{exp.period}</Badge>
                          </div>
                          <p className="text-primary font-medium mb-2">{exp.company}</p>
                          <p className="text-muted-foreground text-sm mb-3">{exp.description}</p>

                          {/* Responsibilities */}
                          <ul className="space-y-1.5 mb-3">
                            {exp.responsibilities.map((resp, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {resp}
                              </li>
                            ))}
                          </ul>

                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1.5">
                            {exp.technologies.map((tech, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
