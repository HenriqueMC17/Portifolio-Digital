"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ProjectsSection() {
  const { language } = useLanguage()
  const [filter, setFilter] = useState("all")

  const content = {
    pt: {
      title: "Projetos",
      filters: ["Todos", "Web", "IA", "Mobile"],
      projects: [
        {
          title: "AI Chat Assistant",
          description: "Assistente de chat inteligente com IA para atendimento ao cliente",
          tags: ["Next.js", "OpenAI", "TypeScript"],
          category: "ai",
          github: "#",
          demo: "#",
        },
        {
          title: "E-commerce Platform",
          description: "Plataforma completa de e-commerce com painel administrativo",
          tags: ["React", "Node.js", "MongoDB"],
          category: "web",
          github: "#",
          demo: "#",
        },
        {
          title: "Task Manager App",
          description: "Aplicativo de gerenciamento de tarefas com sincronização em tempo real",
          tags: ["React Native", "Firebase", "TypeScript"],
          category: "mobile",
          github: "#",
          demo: "#",
        },
      ],
    },
    en: {
      title: "Projects",
      filters: ["All", "Web", "AI", "Mobile"],
      projects: [
        {
          title: "AI Chat Assistant",
          description: "Intelligent chat assistant with AI for customer service",
          tags: ["Next.js", "OpenAI", "TypeScript"],
          category: "ai",
          github: "#",
          demo: "#",
        },
        {
          title: "E-commerce Platform",
          description: "Complete e-commerce platform with admin panel",
          tags: ["React", "Node.js", "MongoDB"],
          category: "web",
          github: "#",
          demo: "#",
        },
        {
          title: "Task Manager App",
          description: "Task management app with real-time sync",
          tags: ["React Native", "Firebase", "TypeScript"],
          category: "mobile",
          github: "#",
          demo: "#",
        },
      ],
    },
  }

  const t = content[language]

  const filteredProjects = filter === "all" ? t.projects : t.projects.filter((p) => p.category === filter.toLowerCase())

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-8">{t.title}</h2>

          <div className="flex justify-center gap-2 mb-12 flex-wrap">
            {t.filters.map((filterName, index) => (
              <Button
                key={index}
                variant={filter === (index === 0 ? "all" : filterName.toLowerCase()) ? "default" : "outline"}
                onClick={() => setFilter(index === 0 ? "all" : filterName.toLowerCase())}
              >
                {filterName}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
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
