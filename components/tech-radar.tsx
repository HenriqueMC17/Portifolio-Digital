"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Radar, TrendingUp, Eye, CheckCircle2, Clock, Zap, Code, Database, Cloud, Smartphone } from "lucide-react"

interface Technology {
  name: string
  category: "frontend" | "backend" | "database" | "devops" | "mobile" | "tools"
  status: "exploring" | "adopting" | "mastering" | "expert"
  description: string
  experience: string
  projects?: string[]
}

const technologies: Technology[] = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    status: "expert",
    description: "Biblioteca principal para desenvolvimento de interfaces",
    experience: "2+ anos",
    projects: ["Safe Finance", "Portfolio"],
  },
  {
    name: "Next.js",
    category: "frontend",
    status: "mastering",
    description: "Framework React para aplicações full-stack",
    experience: "1+ ano",
    projects: ["Portfolio", "Leand Peage"],
  },
  {
    name: "TypeScript",
    category: "frontend",
    status: "mastering",
    description: "JavaScript tipado para maior robustez",
    experience: "1+ ano",
    projects: ["Safe Finance", "Portfolio"],
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    status: "expert",
    description: "Framework CSS utilitário",
    experience: "1+ ano",
    projects: ["Portfolio", "Safe Finance"],
  },
  {
    name: "Framer Motion",
    category: "frontend",
    status: "adopting",
    description: "Biblioteca de animações para React",
    experience: "6 meses",
    projects: ["Portfolio"],
  },
  {
    name: "Svelte",
    category: "frontend",
    status: "exploring",
    description: "Framework moderno e performático",
    experience: "Estudando",
  },

  // Backend
  {
    name: "Java",
    category: "backend",
    status: "expert",
    description: "Linguagem principal para desenvolvimento backend",
    experience: "2+ anos",
    projects: ["Safe Finance", "Sistemas Empresariais"],
  },
  {
    name: "Spring Boot",
    category: "backend",
    status: "mastering",
    description: "Framework Java para APIs REST",
    experience: "1+ ano",
    projects: ["Safe Finance"],
  },
  {
    name: "Node.js",
    category: "backend",
    status: "mastering",
    description: "Runtime JavaScript para backend",
    experience: "1+ ano",
    projects: ["Portfolio API", "Automações"],
  },
  {
    name: "Python",
    category: "backend",
    status: "adopting",
    description: "Linguagem versátil para automação e APIs",
    experience: "6 meses",
    projects: ["Scripts de Automação"],
  },
  {
    name: "Rust",
    category: "backend",
    status: "exploring",
    description: "Linguagem de sistemas de alta performance",
    experience: "Estudando",
  },

  // Database
  {
    name: "PostgreSQL",
    category: "database",
    status: "mastering",
    description: "Banco relacional robusto",
    experience: "1+ ano",
    projects: ["Safe Finance"],
  },
  {
    name: "MySQL",
    category: "database",
    status: "expert",
    description: "Banco relacional popular",
    experience: "2+ anos",
    projects: ["Sistemas Empresariais"],
  },
  {
    name: "MongoDB",
    category: "database",
    status: "adopting",
    description: "Banco NoSQL orientado a documentos",
    experience: "6 meses",
  },
  {
    name: "Redis",
    category: "database",
    status: "exploring",
    description: "Cache em memória de alta performance",
    experience: "Estudando",
  },

  // DevOps
  {
    name: "Docker",
    category: "devops",
    status: "adopting",
    description: "Containerização de aplicações",
    experience: "6 meses",
    projects: ["Safe Finance"],
  },
  {
    name: "AWS",
    category: "devops",
    status: "exploring",
    description: "Plataforma de cloud computing",
    experience: "Estudando",
  },
  {
    name: "Vercel",
    category: "devops",
    status: "mastering",
    description: "Plataforma de deploy para frontend",
    experience: "1+ ano",
    projects: ["Portfolio"],
  },
  {
    name: "GitHub Actions",
    category: "devops",
    status: "adopting",
    description: "CI/CD integrado ao GitHub",
    experience: "6 meses",
    projects: ["Portfolio"],
  },

  // Tools
  {
    name: "Git",
    category: "tools",
    status: "expert",
    description: "Controle de versão",
    experience: "2+ anos",
    projects: ["Todos os projetos"],
  },
  {
    name: "VS Code",
    category: "tools",
    status: "expert",
    description: "Editor de código principal",
    experience: "2+ anos",
  },
  {
    name: "Figma",
    category: "tools",
    status: "adopting",
    description: "Design de interfaces",
    experience: "6 meses",
    projects: ["Portfolio Design"],
  },
]

const statusConfig = {
  exploring: {
    label: "Explorando",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: Eye,
    description: "Tecnologias que estou estudando e experimentando",
  },
  adopting: {
    label: "Adotando",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: TrendingUp,
    description: "Tecnologias que estou implementando em projetos",
  },
  mastering: {
    label: "Dominando",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: Zap,
    description: "Tecnologias que uso com confiança",
  },
  expert: {
    label: "Expert",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    description: "Tecnologias que domino completamente",
  },
}

const categoryConfig = {
  frontend: { label: "Frontend", icon: Code, color: "text-blue-600" },
  backend: { label: "Backend", icon: Database, color: "text-green-600" },
  database: { label: "Database", icon: Database, color: "text-purple-600" },
  devops: { label: "DevOps", icon: Cloud, color: "text-orange-600" },
  mobile: { label: "Mobile", icon: Smartphone, color: "text-pink-600" },
  tools: { label: "Tools", icon: Zap, color: "text-gray-600" },
}

export function TechRadar() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const filteredTechs = technologies.filter((tech) => {
    const statusMatch = !selectedStatus || tech.status === selectedStatus
    const categoryMatch = selectedCategory === "all" || tech.category === selectedCategory
    return statusMatch && categoryMatch
  })

  const techsByStatus = Object.entries(statusConfig).map(([status, config]) => ({
    status,
    config,
    techs: technologies.filter((tech) => tech.status === status),
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Radar className="h-6 w-6 text-primary" />
          <h3 className="text-2xl font-bold">Radar Tecnológico</h3>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Mapa das tecnologias que estou explorando, adotando e dominando em minha jornada de desenvolvimento
        </p>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {techsByStatus.map(({ status, config, techs }) => (
          <motion.div
            key={status}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              selectedStatus === status ? config.color : "bg-muted/30 hover:bg-muted/50"
            }`}
            onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
          >
            <div className="flex items-center gap-2 mb-2">
              <config.icon className="h-4 w-4" />
              <span className="font-medium text-sm">{config.label}</span>
            </div>
            <div className="text-2xl font-bold">{techs.length}</div>
            <div className="text-xs text-muted-foreground">{config.description}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="all">Todas</TabsTrigger>
          {Object.entries(categoryConfig).map(([key, config]) => (
            <TabsTrigger key={key} value={key} className="text-xs">
              {config.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTechs.map((tech, index) => {
              const statusInfo = statusConfig[tech.status]
              const categoryInfo = categoryConfig[tech.category]

              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <categoryInfo.icon className={`h-4 w-4 ${categoryInfo.color}`} />
                          <h4 className="font-semibold group-hover:text-primary transition-colors">{tech.name}</h4>
                        </div>
                        <Badge variant="outline" className={`text-xs ${statusInfo.color}`}>
                          {statusInfo.label}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Clock className="h-3 w-3" />
                          <span className="text-muted-foreground">Experiência: {tech.experience}</span>
                        </div>

                        {tech.projects && tech.projects.length > 0 && (
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Projetos:</div>
                            <div className="flex flex-wrap gap-1">
                              {tech.projects.slice(0, 2).map((project) => (
                                <Badge key={project} variant="secondary" className="text-xs">
                                  {project}
                                </Badge>
                              ))}
                              {tech.projects.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{tech.projects.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </TabsContent>
      </Tabs>

      {/* Clear Filters */}
      {(selectedStatus || selectedCategory !== "all") && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedStatus(null)
              setSelectedCategory("all")
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}
    </div>
  )
}
