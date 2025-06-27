"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Clock,
  Target,
  TrendingUp,
  Zap,
  Play,
  Code,
  Database,
  Lightbulb,
  CheckCircle2,
} from "lucide-react"
import { useState } from "react"

interface ProjectMetrics {
  timeReduction?: string
  costSaving?: string
  userImpact?: string
  performanceGain?: string
  efficiency?: string
}

interface TechnicalDecision {
  decision: string
  reason: string
  alternative?: string
}

interface LessonLearned {
  lesson: string
  category: "technical" | "business" | "personal"
}

interface EnhancedProject {
  id: string
  name: string
  description: string
  longDescription: string
  problem: string
  solution: string
  whereUsed: string
  stack: string[]
  metrics: ProjectMetrics
  lessonsLearned: LessonLearned[]
  technicalDecisions: TechnicalDecision[]
  githubUrl: string
  liveUrl?: string
  videoUrl?: string
  screenshots: string[]
  status: "completed" | "in-progress" | "planning"
  category: "web" | "mobile" | "desktop" | "api"
  featured: boolean
  stars?: number
  forks?: number
  lastUpdate: string
}

const enhancedProjects: EnhancedProject[] = [
  {
    id: "safe-finance",
    name: "Safe Finance",
    description: "Sistema completo de gestão financeira pessoal com dashboard interativo",
    longDescription:
      "Safe Finance é uma aplicação web robusta desenvolvida para resolver o problema comum de controle financeiro pessoal. O sistema oferece uma interface intuitiva para gerenciamento de receitas, despesas, categorização automática e relatórios detalhados.",
    problem: "Dificuldade em controlar gastos pessoais e falta de visibilidade sobre padrões de consumo",
    solution: "Sistema web com dashboard interativo, categorização automática, alertas de gastos e relatórios visuais",
    whereUsed: "Uso pessoal e demonstração para potenciais empregadores",
    stack: ["Java", "Spring Boot", "PostgreSQL", "HTML5", "CSS3", "JavaScript", "Bootstrap"],
    metrics: {
      timeReduction: "70% menos tempo para controle financeiro",
      efficiency: "95% de precisão na categorização",
      userImpact: "Controle total sobre 100% dos gastos mensais",
    },
    lessonsLearned: [
      {
        lesson: "Importância da validação de dados tanto no frontend quanto no backend",
        category: "technical",
      },
      {
        lesson: "Necessidade de feedback visual imediato para melhor UX",
        category: "business",
      },
      {
        lesson: "Planejamento de arquitetura evita refatorações custosas",
        category: "personal",
      },
    ],
    technicalDecisions: [
      {
        decision: "PostgreSQL como banco de dados",
        reason: "Melhor suporte para transações complexas e integridade referencial",
        alternative: "MySQL seria mais simples, mas menos robusto",
      },
      {
        decision: "Spring Boot para o backend",
        reason: "Ecossistema maduro, segurança integrada e facilidade de deploy",
        alternative: "Node.js seria mais rápido para prototipagem",
      },
    ],
    githubUrl: "https://github.com/HenriqueMC17/Safe-Finance",
    liveUrl: "https://safe-finance-demo.vercel.app",
    screenshots: ["/placeholder.svg?height=400&width=600"],
    status: "completed",
    category: "web",
    featured: true,
    stars: 12,
    forks: 3,
    lastUpdate: "2024-09-15",
  },
  {
    id: "portfolio-website",
    name: "Portfolio Website",
    description: "Portfólio profissional moderno com animações avançadas e Easter Eggs",
    longDescription:
      "Este portfólio representa o estado da arte em desenvolvimento frontend, combinando Next.js 15, TypeScript, Framer Motion e uma arquitetura PWA completa. Inclui integração em tempo real com GitHub, sistema de analytics próprio e múltiplos Easter Eggs interativos.",
    problem: "Necessidade de um portfólio que demonstrasse habilidades técnicas avançadas e se destacasse no mercado",
    solution: "Website moderno com animações sofisticadas, integração de APIs, PWA e recursos únicos como Easter Eggs",
    whereUsed: "Apresentação profissional para recrutadores e networking",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API", "Vercel"],
    metrics: {
      performanceGain: "Lighthouse Score 98/100",
      userImpact: "50+ visualizações semanais",
      efficiency: "100% responsivo em todos os dispositivos",
    },
    lessonsLearned: [
      {
        lesson: "Animações devem melhorar a UX, não apenas impressionar",
        category: "business",
      },
      {
        lesson: "Performance é crucial mesmo com muitas animações",
        category: "technical",
      },
      {
        lesson: "Detalhes fazem a diferença na percepção profissional",
        category: "personal",
      },
    ],
    technicalDecisions: [
      {
        decision: "Next.js 15 com App Router",
        reason: "Server Components, melhor SEO e performance otimizada",
        alternative: "React SPA seria mais simples mas menos otimizado",
      },
      {
        decision: "Framer Motion para animações",
        reason: "Controle granular e performance superior",
        alternative: "CSS animations seriam mais leves mas menos flexíveis",
      },
    ],
    githubUrl: "https://github.com/HenriqueMC17/portfolio-website",
    liveUrl: "https://henriquemc.dev",
    videoUrl: "/placeholder-video.mp4",
    screenshots: ["/placeholder.svg?height=400&width=600"],
    status: "completed",
    category: "web",
    featured: true,
    stars: 8,
    forks: 2,
    lastUpdate: "2024-12-20",
  },
  {
    id: "leand-peage",
    name: "Leand Peage Safe Finance",
    description: "Extensão do Safe Finance com recursos avançados de investimentos",
    longDescription:
      "Evolução do Safe Finance com funcionalidades avançadas para controle de investimentos, análise de portfólio e projeções financeiras. Inclui integração com APIs de cotações e relatórios automatizados.",
    problem: "Necessidade de controle mais sofisticado incluindo investimentos e planejamento financeiro",
    solution: "Plataforma integrada com módulos de investimento, análise de risco e projeções automáticas",
    whereUsed: "Projeto acadêmico e demonstração de habilidades avançadas",
    stack: ["Java", "Spring Boot", "React", "PostgreSQL", "APIs Financeiras"],
    metrics: {
      efficiency: "80% de automação nos relatórios",
      userImpact: "Controle completo de portfólio de investimentos",
    },
    lessonsLearned: [
      {
        lesson: "Integração com APIs externas requer tratamento robusto de erros",
        category: "technical",
      },
      {
        lesson: "Dados financeiros exigem precisão absoluta",
        category: "business",
      },
    ],
    technicalDecisions: [
      {
        decision: "Separação em microserviços",
        reason: "Escalabilidade e manutenibilidade",
        alternative: "Monolito seria mais simples inicialmente",
      },
    ],
    githubUrl: "https://github.com/HenriqueMC17/Leand-Peage-Safe-Finance",
    screenshots: ["/placeholder.svg?height=400&width=600"],
    status: "in-progress",
    category: "web",
    featured: false,
    stars: 5,
    forks: 1,
    lastUpdate: "2024-11-30",
  },
]

const statusConfig = {
  completed: { label: "Concluído", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  "in-progress": { label: "Em Desenvolvimento", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  planning: { label: "Planejamento", color: "bg-blue-100 text-blue-800", icon: Lightbulb },
}

const categoryConfig: Record<EnhancedProject["category"], { label: string; icon: React.ElementType }> = {
  web: { label: "Web", icon: Code },
  mobile: { label: "Mobile", icon: Zap },
  desktop: { label: "Desktop", icon: Database },
  api: { label: "API", icon: Database },
}

export function EnhancedProjectsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [selectedProject, setSelectedProject] = useState<EnhancedProject | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const featuredProjects = enhancedProjects.filter((p) => p.featured)
  const allProjects = enhancedProjects

  return (
    <section id="enhanced-projects" className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Projetos & Case Studies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Análise detalhada dos projetos com impacto real, decisões técnicas e lições aprendidas
          </p>
        </motion.div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Projetos em Destaque
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card
                  className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <CardContent className="p-0">
                    {/* Project Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.screenshots[0] || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={statusConfig[project.status].color}>
                          {statusConfig[project.status].label}
                        </Badge>
                        {project.featured && (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Destaque
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {project.name}
                          </h4>
                          <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                        </div>
                      </div>

                      {/* Problem & Solution */}
                      <div className="space-y-3 mb-4">
                        <div>
                          <h5 className="font-medium text-sm text-red-600 mb-1">Problema:</h5>
                          <p className="text-sm text-muted-foreground">{project.problem}</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-sm text-green-600 mb-1">Solução:</h5>
                          <p className="text-sm text-muted-foreground">{project.solution}</p>
                        </div>
                      </div>

                      {/* Metrics */}
                      {Object.keys(project.metrics).length > 0 && (
                        <div className="mb-4">
                          <h5 className="font-medium text-sm mb-2 flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            Impacto:
                          </h5>
                          <div className="grid grid-cols-1 gap-2">
                            {Object.entries(project.metrics).map(([key, value]) => (
                              <div key={key} className="flex items-center gap-2 text-sm">
                                <Target className="h-3 w-3 text-green-500" />
                                <span className="text-muted-foreground">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div className="mb-4">
                        <h5 className="font-medium text-sm mb-2">Stack Tecnológica:</h5>
                        <div className="flex flex-wrap gap-1">
                          {project.stack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.stack.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.stack.length - 4} mais
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {project.stars && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span>{project.stars}</span>
                            </div>
                          )}
                          {project.forks && (
                            <div className="flex items-center gap-1">
                              <GitFork className="h-3 w-3" />
                              <span>{project.forks}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{project.lastUpdate}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              Código
                            </a>
                          </Button>
                          {project.liveUrl && (
                            <Button size="sm" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Demo
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div>
          <h3 className="text-2xl font-semibold mb-8">Todos os Projetos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer"
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {categoryConfig[project.category] &&
                          (() => {
                            const Icon = categoryConfig[project.category].icon
                            return <Icon className="h-5 w-5 text-primary" />
                          })()}
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{project.name}</h4>
                      </div>
                      <Badge className={statusConfig[project.status].color}>{statusConfig[project.status].label}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.description}</p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.stack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.stack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.stack.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{project.lastUpdate}</span>
                      <div className="flex items-center gap-2">
                        {project.stars && (
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            {project.stars}
                          </span>
                        )}
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          Ver detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{selectedProject.name}</h3>
                    <p className="text-muted-foreground">{selectedProject.longDescription}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)}>
                    ×
                  </Button>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="technical">Técnico</TabsTrigger>
                    <TabsTrigger value="impact">Impacto</TabsTrigger>
                    <TabsTrigger value="lessons">Lições</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Problema Identificado</h4>
                        <p className="text-muted-foreground">{selectedProject.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Solução Implementada</h4>
                        <p className="text-muted-foreground">{selectedProject.solution}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Onde foi Utilizado</h4>
                      <p className="text-muted-foreground">{selectedProject.whereUsed}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Stack Tecnológica Completa</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.stack.map((tech) => (
                          <Badge key={tech} variant="outline">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="technical" className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Decisões Técnicas</h4>
                      <div className="space-y-4">
                        {selectedProject.technicalDecisions.map((decision, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <h5 className="font-medium mb-2">{decision.decision}</h5>
                              <p className="text-sm text-muted-foreground mb-2">
                                <strong>Motivo:</strong> {decision.reason}
                              </p>
                              {decision.alternative && (
                                <p className="text-sm text-muted-foreground">
                                  <strong>Alternativa considerada:</strong> {decision.alternative}
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="impact" className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Métricas de Impacto</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(selectedProject.metrics).map(([key, value]) => (
                          <Card key={key}>
                            <CardContent className="p-4 text-center">
                              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                              <p className="font-semibold">{value}</p>
                              <p className="text-sm text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="lessons" className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Lições Aprendidas</h4>
                      <div className="space-y-4">
                        {selectedProject.lessonsLearned.map((lesson, index) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <Badge
                                  variant="outline"
                                  className={
                                    lesson.category === "technical"
                                      ? "bg-blue-100 text-blue-800"
                                      : lesson.category === "business"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                  }
                                >
                                  {lesson.category === "technical"
                                    ? "Técnica"
                                    : lesson.category === "business"
                                      ? "Negócio"
                                      : "Pessoal"}
                                </Badge>
                                <p className="text-sm text-muted-foreground flex-1">{lesson.lesson}</p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex gap-4 mt-6 pt-6 border-t">
                  <Button asChild>
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Ver Código
                    </a>
                  </Button>
                  {selectedProject.liveUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Demo
                      </a>
                    </Button>
                  )}
                  {selectedProject.videoUrl && (
                    <Button variant="outline" asChild>
                      <a href={selectedProject.videoUrl} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-2" />
                        Ver Vídeo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
