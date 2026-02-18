"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Target, Lightbulb, CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

interface Project {
  title: string
  context: string
  problem: string
  solution: string
  results: string[]
  tags: string[]
  category: string
  github: string
  demo: string
}

export function ProjectsSection() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState("all")

  const content = {
    pt: {
      title: "Projetos",
      subtitle: "Cases reais com contexto, desafio, solucao e resultado",
      filters: ["Todos", "Web", "Automacao", "Educacao"],
      contextLabel: "Contexto",
      problemLabel: "Desafio",
      solutionLabel: "Solucao",
      resultsLabel: "Resultados",
      projects: [
        {
          title: "Safe Finance",
          context: "Sistema desenvolvido para organizacao e controle financeiro.",
          problem: "Dificuldade em gerenciar financas pessoais de forma prática e intuitiva com visao clara de receitas e despesas.",
          solution: "Aplicacao web com painel interativo, registro de transacoes, categorias customizaveis e relatorios visuais.",
          results: [
            "Interface intuitiva para controle financeiro",
            "Relatorios visuais com graficos interativos",
            "Categorias customizaveis para transacoes",
          ],
          tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          category: "web",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Portfolio Digital",
          context: "Construcao de portfolio profissional moderno para apresentacao de competencias e projetos.",
          problem: "Necessidade de um portfolio que transmita profissionalismo, modernidade e demonstre habilidades tecnicas avancadas.",
          solution: "Site responsivo com Next.js, animacoes suaves, tema dark/light, internacionalizacao PT/EN e chatbot assistente.",
          results: [
            "Site 100% responsivo e acessivel",
            "Performance otimizada com Lighthouse alto",
            "Internacionalizacao completa PT/EN",
          ],
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
          category: "web",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Automacao de Planilhas",
          context: "Projeto voltado a automacao de processos repetitivos em planilhas no ambiente corporativo.",
          problem: "Processos manuais demorados e suscetíveis a erros em controles de dados com Excel.",
          solution: "Macros e scripts em VBA e Google Apps Script para automatizar relatorios, validacoes e integracao de dados.",
          results: [
            "Reducao significativa de tempo em processos manuais",
            "Eliminacao de erros humanos em calculos",
            "Integracao automatica entre planilhas",
          ],
          tags: ["VBA", "Google Apps Script", "Excel", "Automacao"],
          category: "automacao",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Sistema Educacional",
          context: "Desenvolvimento de ferramentas de suporte para sistemas educacionais no CCBEU Sorocaba.",
          problem: "Falta de integracao entre os processos comerciais e academicos, gerando retrabalho e inconsistencias.",
          solution: "Otimizacao de processos comerciais com integracao de sistemas, treinamento de equipe e automacao de relatorios.",
          results: [
            "Processos comerciais otimizados",
            "Melhor integracao entre departamentos",
            "Treinamento de equipe concluido com sucesso",
          ],
          tags: ["Sistemas Integrados", "Excel", "Gestao de Processos", "Treinamento"],
          category: "educacao",
          github: "#",
          demo: "#",
        },
        {
          title: "Projetos IoT com Arduino",
          context: "Projetos academicos e pessoais envolvendo automacao com hardware e sensores.",
          problem: "Necessidade de aprender integracao entre software e hardware para solucoes de automacao fisica.",
          solution: "Desenvolvimento de projetos com Arduino, sensores e atuadores, integrando programacao C++ com eletronica basica.",
          results: [
            "Dominio de programacao embarcada",
            "Integracao software-hardware funcional",
            "Projetos de automacao residencial",
          ],
          tags: ["Arduino", "C++", "IoT", "Sensores"],
          category: "automacao",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
      ] as Project[],
    },
    en: {
      title: "Projects",
      subtitle: "Real cases with context, challenge, solution and results",
      filters: ["All", "Web", "Automation", "Education"],
      contextLabel: "Context",
      problemLabel: "Challenge",
      solutionLabel: "Solution",
      resultsLabel: "Results",
      projects: [
        {
          title: "Safe Finance",
          context: "System developed for financial organization and control.",
          problem: "Difficulty managing personal finances in a practical and intuitive way with a clear view of income and expenses.",
          solution: "Web application with interactive dashboard, transaction recording, customizable categories and visual reports.",
          results: [
            "Intuitive interface for financial control",
            "Visual reports with interactive charts",
            "Customizable categories for transactions",
          ],
          tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
          category: "web",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Digital Portfolio",
          context: "Building a modern professional portfolio to showcase skills and projects.",
          problem: "Need for a portfolio that conveys professionalism, modernity and demonstrates advanced technical skills.",
          solution: "Responsive site with Next.js, smooth animations, dark/light theme, PT/EN internationalization and chatbot assistant.",
          results: [
            "100% responsive and accessible site",
            "Optimized performance with high Lighthouse score",
            "Complete PT/EN internationalization",
          ],
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
          category: "web",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Spreadsheet Automation",
          context: "Project focused on automating repetitive processes in spreadsheets in a corporate environment.",
          problem: "Time-consuming manual processes susceptible to errors in data controls with Excel.",
          solution: "Macros and scripts in VBA and Google Apps Script to automate reports, validations and data integration.",
          results: [
            "Significant reduction in manual process time",
            "Elimination of human errors in calculations",
            "Automatic integration between spreadsheets",
          ],
          tags: ["VBA", "Google Apps Script", "Excel", "Automation"],
          category: "automation",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
        {
          title: "Educational System",
          context: "Development of support tools for educational systems at CCBEU Sorocaba.",
          problem: "Lack of integration between commercial and academic processes, causing rework and inconsistencies.",
          solution: "Optimization of commercial processes with systems integration, team training and report automation.",
          results: [
            "Optimized commercial processes",
            "Better integration between departments",
            "Team training completed successfully",
          ],
          tags: ["Integrated Systems", "Excel", "Process Management", "Training"],
          category: "education",
          github: "#",
          demo: "#",
        },
        {
          title: "IoT Projects with Arduino",
          context: "Academic and personal projects involving automation with hardware and sensors.",
          problem: "Need to learn software-hardware integration for physical automation solutions.",
          solution: "Development of projects with Arduino, sensors and actuators, integrating C++ programming with basic electronics.",
          results: [
            "Mastery of embedded programming",
            "Functional software-hardware integration",
            "Home automation projects",
          ],
          tags: ["Arduino", "C++", "IoT", "Sensors"],
          category: "automation",
          github: "https://github.com/HenriqueMC17",
          demo: "#",
        },
      ] as Project[],
    },
  }

  const t = content[language]
  const filterMap: Record<string, string> = {
    "Todos": "all", "All": "all",
    "Web": "web",
    "Automacao": "automacao", "Automation": "automation",
    "Educacao": "educacao", "Education": "education",
  }

  const filteredProjects = filter === "all"
    ? t.projects
    : t.projects.filter((p) => p.category === filter)

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold gradient-text mb-4">{t.title}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle}</p>
          </motion.div>

          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {t.filters.map((filterName, index) => {
              const filterValue = filterMap[filterName] || filterName.toLowerCase()
              return (
                <Button
                  key={index}
                  variant={filter === filterValue ? "default" : "outline"}
                  onClick={() => setFilter(filterValue)}
                  className={filter !== filterValue ? "bg-transparent" : ""}
                >
                  {filterName}
                </Button>
              )
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                      <CardDescription className="text-sm">{project.context}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Problem */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Target className="h-4 w-4 text-destructive flex-shrink-0" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.problemLabel}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{project.problem}</p>
                      </div>

                      {/* Solution */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Lightbulb className="h-4 w-4 text-primary flex-shrink-0" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{t.solutionLabel}</span>
                        </div>
                        <p className="text-sm text-muted-foreground pl-6">{project.solution}</p>
                      </div>

                      {/* Results */}
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">{t.resultsLabel}</span>
                        <ul className="space-y-1">
                          {project.results.map((result, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle2 className="h-3.5 w-3.5 text-accent-foreground mt-0.5 flex-shrink-0" />
                              {result}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        {project.github !== "#" && (
                          <Button size="sm" variant="outline" asChild className="bg-transparent">
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-2" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.demo !== "#" && (
                          <Button size="sm" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
