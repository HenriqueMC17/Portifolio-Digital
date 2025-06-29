"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ExternalLink,
  Github,
  Code,
  Globe,
  Smartphone,
  Server,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Target,
  Lightbulb,
  CheckCircle,
  AlertTriangle,
  BookOpen,
} from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  category: "web" | "mobile" | "backend" | "fullstack"
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl: string
  featured: boolean
  status: "completed" | "in-progress" | "planning"
  impact: {
    problem: string
    solution: string
    metrics: {
      label: string
      value: string
      improvement: string
    }[]
    technicalDecisions: {
      decision: string
      reasoning: string
    }[]
    lessonsLearned: string[]
    challenges: string[]
  }
  timeline: {
    start: string
    end?: string
    duration: string
  }
  team?: {
    size: number
    role: string
  }
}

const categoryConfig = {
  web: {
    icon: Globe,
    label: "Web App",
    color: "bg-blue-500",
  },
  mobile: {
    icon: Smartphone,
    label: "Mobile",
    color: "bg-green-500",
  },
  backend: {
    icon: Server,
    label: "Backend",
    color: "bg-purple-500",
  },
  fullstack: {
    icon: Code,
    label: "Full Stack",
    color: "bg-orange-500",
  },
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: "Concluído",
    color: "text-green-600",
  },
  "in-progress": {
    icon: Zap,
    label: "Em Desenvolvimento",
    color: "text-yellow-600",
  },
  planning: {
    icon: Target,
    label: "Planejamento",
    color: "text-blue-600",
  },
}

const projects: Project[] = [
  {
    id: "safe-finance",
    title: "Safe Finance",
    description: "Sistema completo de gestão financeira pessoal com Java e Spring Boot",
    longDescription:
      "Safe Finance é uma aplicação web completa para controle financeiro pessoal, desenvolvida com Java e Spring Boot. O sistema permite gerenciar receitas, despesas, categorias e gerar relatórios detalhados com gráficos interativos.",
    category: "fullstack",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf", "Bootstrap", "Chart.js"],
    githubUrl: "https://github.com/HenriqueMC17/SafeFinance",
    imageUrl: "/placeholder.svg?height=300&width=500",
    featured: true,
    status: "completed",
    impact: {
      problem:
        "Dificuldade em controlar gastos pessoais e falta de visibilidade sobre padrões de consumo, levando a decisões financeiras inadequadas.",
      solution:
        "Sistema web intuitivo que centraliza todas as informações financeiras com categorização automática, relatórios visuais e alertas inteligentes.",
      metrics: [
        {
          label: "Redução no tempo de controle",
          value: "70%",
          improvement: "De 2h/semana para 30min/semana",
        },
        {
          label: "Precisão nos relatórios",
          value: "95%",
          improvement: "Eliminação de erros manuais",
        },
        {
          label: "Economia identificada",
          value: "R$ 500/mês",
          improvement: "Através de análise de padrões",
        },
      ],
      technicalDecisions: [
        {
          decision: "Spring Boot + JPA",
          reasoning: "Facilita desenvolvimento rápido e manutenção, com ORM robusto para operações de banco",
        },
        {
          decision: "PostgreSQL",
          reasoning: "Banco relacional confiável com suporte a JSON para dados flexíveis",
        },
        {
          decision: "Thymeleaf + Bootstrap",
          reasoning: "Renderização server-side para melhor SEO e responsividade nativa",
        },
      ],
      lessonsLearned: [
        "Importância da validação de dados tanto no frontend quanto backend",
        "Otimização de queries com JPA para melhor performance",
        "Design patterns como Repository e Service para código limpo",
      ],
      challenges: [
        "Implementação de relatórios complexos com múltiplas agregações",
        "Sincronização de dados em tempo real sem comprometer performance",
        "Criação de interface intuitiva para usuários não técnicos",
      ],
    },
    timeline: {
      start: "2024-03",
      end: "2024-06",
      duration: "3 meses",
    },
    team: {
      size: 1,
      role: "Desenvolvedor Full Stack",
    },
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Site pessoal moderno com Next.js, animações avançadas e Easter Eggs interativos",
    longDescription:
      "Portfolio pessoal desenvolvido com Next.js 14, TypeScript e Tailwind CSS. Inclui animações com Framer Motion, sistema de Easter Eggs, PWA, analytics customizado e integração com GitHub API.",
    category: "web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Vercel"],
    githubUrl: "https://github.com/HenriqueMC17/portfolio",
    liveUrl: "https://henriquemc.dev",
    imageUrl: "/placeholder.svg?height=300&width=500",
    featured: true,
    status: "completed",
    impact: {
      problem:
        "Necessidade de uma presença digital profissional que demonstrasse habilidades técnicas e criatividade de forma interativa.",
      solution:
        "Website moderno com design único, animações fluidas, recursos interativos e otimização para performance e SEO.",
      metrics: [
        {
          label: "Lighthouse Score",
          value: "98/100",
          improvement: "Performance otimizada",
        },
        {
          label: "Tempo de carregamento",
          value: "1.2s",
          improvement: "Otimização de imagens e código",
        },
        {
          label: "Taxa de engajamento",
          value: "85%",
          improvement: "Easter Eggs e interatividade",
        },
      ],
      technicalDecisions: [
        {
          decision: "Next.js 14 com App Router",
          reasoning: "SSR/SSG para melhor SEO, roteamento moderno e otimizações automáticas",
        },
        {
          decision: "Framer Motion",
          reasoning: "Animações fluidas e performáticas com controle granular",
        },
        {
          decision: "Supabase",
          reasoning: "Backend-as-a-Service para analytics e dados dinâmicos",
        },
      ],
      lessonsLearned: [
        "Balanceamento entre animações e performance",
        "Implementação de PWA com service workers",
        "Otimização de Core Web Vitals",
      ],
      challenges: [
        "Criação de sistema de Easter Eggs sem impactar performance",
        "Responsividade complexa com animações",
        "Integração de múltiplas APIs de forma eficiente",
      ],
    },
    timeline: {
      start: "2024-11",
      end: "2025-01",
      duration: "2 meses",
    },
    team: {
      size: 1,
      role: "Desenvolvedor Full Stack",
    },
  },
  {
    id: "task-manager-api",
    title: "Task Manager API",
    description: "API RESTful para gerenciamento de tarefas com autenticação JWT",
    longDescription:
      "API completa para gerenciamento de tarefas desenvolvida com Node.js e Express. Inclui autenticação JWT, validação de dados, documentação Swagger e testes automatizados.",
    category: "backend",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Swagger", "Jest"],
    githubUrl: "https://github.com/HenriqueMC17/task-manager-api",
    imageUrl: "/placeholder.svg?height=300&width=500",
    featured: false,
    status: "completed",
    impact: {
      problem: "Necessidade de uma API robusta e bem documentada para aplicações de produtividade.",
      solution: "API RESTful completa com autenticação, validação e documentação automática.",
      metrics: [
        {
          label: "Cobertura de testes",
          value: "92%",
          improvement: "Qualidade e confiabilidade",
        },
        {
          label: "Tempo de resposta",
          value: "<100ms",
          improvement: "Otimização de queries",
        },
        {
          label: "Uptime",
          value: "99.9%",
          improvement: "Tratamento de erros robusto",
        },
      ],
      technicalDecisions: [
        {
          decision: "MongoDB",
          reasoning: "Flexibilidade para estruturas de dados variáveis e escalabilidade horizontal",
        },
        {
          decision: "JWT",
          reasoning: "Autenticação stateless e segura para APIs distribuídas",
        },
        {
          decision: "Swagger",
          reasoning: "Documentação automática e interface de testes integrada",
        },
      ],
      lessonsLearned: [
        "Importância da documentação automática de APIs",
        "Estratégias de teste para APIs RESTful",
        "Implementação segura de autenticação JWT",
      ],
      challenges: [
        "Implementação de middleware de autenticação robusto",
        "Validação complexa de dados de entrada",
        "Otimização de queries MongoDB para performance",
      ],
    },
    timeline: {
      start: "2024-08",
      end: "2024-09",
      duration: "1 mês",
    },
    team: {
      size: 1,
      role: "Desenvolvedor Backend",
    },
  },
]

export function EnhancedProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "all" || project.category === selectedCategory,
  )

  const categories = [
    { value: "all", label: "Todos" },
    { value: "web", label: "Web" },
    { value: "mobile", label: "Mobile" },
    { value: "backend", label: "Backend" },
    { value: "fullstack", label: "Full Stack" },
  ]

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soluções reais para problemas reais, com foco em impacto e qualidade técnica
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.value)}
              className="mb-2"
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              const CategoryIcon = categoryConfig[project.category].icon
              const StatusIcon = statusConfig[project.status].icon

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <Badge className={`${categoryConfig[project.category].color} text-white`}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {categoryConfig[project.category].label}
                        </Badge>
                        {project.featured && <Badge variant="secondary">Destaque</Badge>}
                      </div>
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90">
                          <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig[project.status].color}`} />
                          {statusConfig[project.status].label}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {project.title}
                        <div className="flex gap-2">
                          {project.githubUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button variant="ghost" size="icon" asChild>
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col">
                      <p className="text-muted-foreground mb-4 flex-1">{project.description}</p>

                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button className="w-full" onClick={() => setSelectedProject(project)}>
                              Ver Case Study
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <CategoryIcon className="h-5 w-5 text-primary" />
                                {project.title}
                              </DialogTitle>
                            </DialogHeader>

                            <Tabs defaultValue="overview" className="w-full">
                              <TabsList className="grid w-full grid-cols-5">
                                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                                <TabsTrigger value="impact">Impacto</TabsTrigger>
                                <TabsTrigger value="technical">Técnico</TabsTrigger>
                                <TabsTrigger value="lessons">Aprendizados</TabsTrigger>
                                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                              </TabsList>

                              <TabsContent value="overview" className="space-y-4">
                                <img
                                  src={project.imageUrl || "/placeholder.svg"}
                                  alt={project.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                <p className="text-muted-foreground">{project.longDescription}</p>
                                <div className="flex flex-wrap gap-2">
                                  {project.technologies.map((tech) => (
                                    <Badge key={tech} variant="outline">
                                      {tech}
                                    </Badge>
                                  ))}
                                </div>
                              </TabsContent>

                              <TabsContent value="impact" className="space-y-6">
                                <div>
                                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-red-500" />
                                    Problema
                                  </h3>
                                  <p className="text-muted-foreground">{project.impact.problem}</p>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    <Lightbulb className="h-5 w-5 text-yellow-500" />
                                    Solução
                                  </h3>
                                  <p className="text-muted-foreground">{project.impact.solution}</p>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-green-500" />
                                    Métricas de Impacto
                                  </h3>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {project.impact.metrics.map((metric, index) => (
                                      <Card key={index}>
                                        <CardContent className="p-4 text-center">
                                          <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                                          <div className="font-medium mb-1">{metric.label}</div>
                                          <div className="text-sm text-muted-foreground">{metric.improvement}</div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              </TabsContent>

                              <TabsContent value="technical" className="space-y-6">
                                <div>
                                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <Code className="h-5 w-5 text-blue-500" />
                                    Decisões Técnicas
                                  </h3>
                                  <div className="space-y-4">
                                    {project.impact.technicalDecisions.map((decision, index) => (
                                      <Card key={index}>
                                        <CardContent className="p-4">
                                          <h4 className="font-semibold mb-2">{decision.decision}</h4>
                                          <p className="text-muted-foreground text-sm">{decision.reasoning}</p>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                    Desafios Enfrentados
                                  </h3>
                                  <ul className="space-y-2">
                                    {project.impact.challenges.map((challenge, index) => (
                                      <li key={index} className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-muted-foreground">{challenge}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </TabsContent>

                              <TabsContent value="lessons" className="space-y-4">
                                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                  <BookOpen className="h-5 w-5 text-purple-500" />
                                  Lições Aprendidas
                                </h3>
                                <ul className="space-y-3">
                                  {project.impact.lessonsLearned.map((lesson, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                      <span className="text-muted-foreground">{lesson}</span>
                                    </li>
                                  ))}
                                </ul>
                              </TabsContent>

                              <TabsContent value="timeline" className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <Card>
                                    <CardContent className="p-4">
                                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-primary" />
                                        Timeline
                                      </h3>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Início:</span>
                                          <span>{project.timeline.start}</span>
                                        </div>
                                        {project.timeline.end && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Fim:</span>
                                            <span>{project.timeline.end}</span>
                                          </div>
                                        )}
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Duração:</span>
                                          <span className="font-medium">{project.timeline.duration}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {project.team && (
                                    <Card>
                                      <CardContent className="p-4">
                                        <h3 className="font-semibold mb-2 flex items-center gap-2">
                                          <Users className="h-4 w-4 text-primary" />
                                          Equipe
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tamanho:</span>
                                            <span>
                                              {project.team.size} pessoa{project.team.size > 1 ? "s" : ""}
                                            </span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Minha função:</span>
                                            <span className="font-medium">{project.team.role}</span>
                                          </div>
                                        </div>
                                      </CardContent>
                                    </Card>
                                  )}
                                </div>
                              </TabsContent>
                            </Tabs>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
