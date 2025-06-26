"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  MapPin,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react"

interface TimelineEvent {
  id: string
  date: string
  title: string
  subtitle: string
  description: string
  type: "work" | "education" | "certification" | "project" | "achievement"
  location?: string
  skills?: string[]
  highlights?: string[]
  link?: string
  status: "completed" | "current" | "upcoming"
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "facens-2025",
    date: "Fev 2025 - Jul 2027",
    title: "Análise e Desenvolvimento de Sistemas",
    subtitle: "Centro Universitário Facens",
    description:
      "Curso superior focado em desenvolvimento de software, análise de sistemas e gestão de projetos tecnológicos.",
    type: "education",
    location: "Sorocaba, SP",
    skills: ["Programação", "Análise de Sistemas", "Gestão de Projetos", "Banco de Dados"],
    status: "current",
  },
  {
    id: "ccbeu-comercial-2025",
    date: "Fev 2025 - Presente",
    title: "Auxiliar Comercial",
    subtitle: "CCBEU Sorocaba",
    description:
      "Atendimento digital via WhatsApp, gestão de leads no Bitrix, controle de vendas e suporte operacional à equipe comercial.",
    type: "work",
    location: "Sorocaba, SP",
    skills: ["Bitrix", "DKSoft", "WhatsApp Business", "Excel", "E-mail Marketing"],
    highlights: [
      "Gestão de leads e conversões",
      "Implementação de melhorias no sistema DKSoft",
      "Elaboração de relatórios gerenciais",
    ],
    status: "current",
  },
  {
    id: "portfolio-2024",
    date: "Dez 2024",
    title: "Portfólio Profissional",
    subtitle: "Projeto Pessoal",
    description:
      "Desenvolvimento de portfólio moderno com Next.js, TypeScript, Framer Motion e integração com GitHub API.",
    type: "project",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GitHub API"],
    highlights: [
      "Design responsivo e acessível",
      "Animações avançadas",
      "Integração em tempo real com GitHub",
      "PWA com Service Worker",
    ],
    link: "https://github.com/HenriqueMC17/portfolio",
    status: "completed",
  },
  {
    id: "excel-profissionalizante-2024",
    date: "Out 2024",
    title: "Excel Profissionalizante",
    subtitle: "Geração Futuro Aprendizagem",
    description: "Certificação avançada em Excel com foco em dashboards, análise de dados e automação de processos.",
    type: "certification",
    skills: ["Excel Avançado", "Dashboards", "Análise de Dados", "VBA"],
    status: "completed",
  },
  {
    id: "assa-abloy-2024",
    date: "Jun - Dez 2024",
    title: "Aprendiz Auxiliar Administrativo II - SSMA",
    subtitle: "ASSA ABLOY Group",
    description:
      "Suporte administrativo na área de Saúde, Segurança e Meio Ambiente, com foco em gestão de EPIs e treinamentos.",
    type: "work",
    location: "Porto Feliz, SP",
    skills: ["Excel", "RELATE", "Gestão SSMA", "Treinamentos"],
    highlights: [
      "Reconhecimento pela conscientização de EPIs",
      "Organização de eventos SIPAT",
      "Melhoria de processos administrativos",
    ],
    status: "completed",
  },
  {
    id: "safe-finance-2024",
    date: "Set 2024",
    title: "Safe Finance",
    subtitle: "Sistema de Gestão Financeira",
    description: "Aplicação web para controle financeiro pessoal com Java Spring Boot, PostgreSQL e interface moderna.",
    type: "project",
    skills: ["Java", "Spring Boot", "PostgreSQL", "HTML", "CSS", "JavaScript"],
    highlights: [
      "Arquitetura MVC robusta",
      "Sistema de autenticação",
      "Dashboard interativo",
      "Relatórios financeiros",
    ],
    link: "https://github.com/HenriqueMC17/Safe-Finance",
    status: "completed",
  },
  {
    id: "micropro-2024",
    date: "Fev 2024",
    title: "Analista em Suporte Técnico",
    subtitle: "MicroPRO",
    description: "Certificação completa em suporte técnico, gestão de infraestrutura de TI e resolução de problemas.",
    type: "certification",
    skills: ["Suporte Técnico", "Infraestrutura TI", "Troubleshooting", "Help Desk"],
    status: "completed",
  },
  {
    id: "ccbeu-comercial-2023",
    date: "Jan 2023 - Jan 2024",
    title: "Auxiliar Comercial",
    subtitle: "CCBEU Sorocaba",
    description: "Suporte à equipe comercial, treinamentos no sistema DKSoft e gestão de processos administrativos.",
    type: "work",
    location: "Sorocaba, SP",
    skills: ["DKSoft", "Sponte", "Excel", "Atendimento ao Cliente"],
    highlights: ["Treinamentos mensais da equipe", "Migração entre sistemas", "Melhoria de processos"],
    status: "completed",
  },
  {
    id: "gestao-negocios-2022",
    date: "Dez 2022",
    title: "Gestão de Pequenos Negócios",
    subtitle: "Start",
    description:
      "Formação completa em gestão empresarial, incluindo SWOT, CANVAS, marketing digital e estratégias de preços.",
    type: "certification",
    skills: ["Gestão Empresarial", "SWOT", "CANVAS", "Marketing Digital"],
    status: "completed",
  },
  {
    id: "ensino-medio-2024",
    date: "Jan 2022 - Dez 2024",
    title: "Ensino Médio Completo",
    subtitle: "Colégio Objetivo Zona Norte",
    description: "Formação básica com foco em exatas e preparação para ensino superior.",
    type: "education",
    location: "Sorocaba, SP",
    status: "completed",
  },
]

const typeConfig = {
  work: { icon: Briefcase, color: "text-blue-600", bg: "bg-blue-100", label: "Trabalho" },
  education: { icon: GraduationCap, color: "text-green-600", bg: "bg-green-100", label: "Educação" },
  certification: { icon: Award, color: "text-purple-600", bg: "bg-purple-100", label: "Certificação" },
  project: { icon: Code, color: "text-orange-600", bg: "bg-orange-100", label: "Projeto" },
  achievement: { icon: Award, color: "text-yellow-600", bg: "bg-yellow-100", label: "Conquista" },
}

const statusConfig = {
  current: { label: "Atual", color: "bg-green-100 text-green-800" },
  completed: { label: "Concluído", color: "bg-gray-100 text-gray-800" },
  upcoming: { label: "Em breve", color: "bg-blue-100 text-blue-800" },
}

export function InteractiveTimeline() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredEvents = selectedType ? timelineEvents.filter((event) => event.type === selectedType) : timelineEvents

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedItems(newExpanded)
  }

  const eventsByType = Object.entries(typeConfig).map(([type, config]) => ({
    type,
    config,
    count: timelineEvents.filter((event) => event.type === type).length,
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Timeline Profissional</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Minha jornada profissional, acadêmica e de desenvolvimento pessoal
        </p>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant={selectedType === null ? "default" : "outline"} size="sm" onClick={() => setSelectedType(null)}>
          Todos ({timelineEvents.length})
        </Button>
        {eventsByType.map(({ type, config, count }) => (
          <Button
            key={type}
            variant={selectedType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(selectedType === type ? null : type)}
            className="flex items-center gap-1"
          >
            <config.icon className="h-3 w-3" />
            {config.label} ({count})
          </Button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />

        <div className="space-y-8">
          <AnimatePresence>
            {filteredEvents.map((event, index) => {
              const typeInfo = typeConfig[event.type]
              const statusInfo = statusConfig[event.status]
              const isExpanded = expandedItems.has(event.id)
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background transform -translate-x-1.5 md:-translate-x-1.5 z-10" />

                  {/* Content */}
                  <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-8" : "md:pl-8"} pl-12 md:pl-0`}>
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${typeInfo.bg}`}>
                              <typeInfo.icon className={`h-4 w-4 ${typeInfo.color}`} />
                            </div>
                            <div>
                              <Badge variant="outline" className={`text-xs ${statusInfo.color}`}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {event.date}
                          </div>
                        </div>

                        {/* Title and Subtitle */}
                        <h4 className="font-semibold text-lg mb-1">{event.title}</h4>
                        <p className="text-primary font-medium mb-2">{event.subtitle}</p>

                        {/* Location */}
                        {event.location && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                        {/* Skills */}
                        {event.skills && event.skills.length > 0 && (
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-1">
                              {event.skills.slice(0, 3).map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                              {event.skills.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{event.skills.length - 3} mais
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Expandable Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3"
                            >
                              {/* All Skills */}
                              {event.skills && event.skills.length > 3 && (
                                <div>
                                  <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                                    Todas as competências:
                                  </h5>
                                  <div className="flex flex-wrap gap-1">
                                    {event.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Highlights */}
                              {event.highlights && event.highlights.length > 0 && (
                                <div>
                                  <h5 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">
                                    Principais conquistas:
                                  </h5>
                                  <ul className="text-xs space-y-1">
                                    {event.highlights.map((highlight, i) => (
                                      <li key={i} className="flex items-start">
                                        <span className="w-1 h-1 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                                        <span className="text-muted-foreground">{highlight}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleExpanded(event.id)}
                            className="text-xs"
                          >
                            {isExpanded ? (
                              <>
                                <ChevronUp className="h-3 w-3 mr-1" />
                                Menos detalhes
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-3 w-3 mr-1" />
                                Mais detalhes
                              </>
                            )}
                          </Button>

                          {event.link && (
                            <Button variant="ghost" size="sm" asChild>
                              <a href={event.link} target="_blank" rel="noopener noreferrer" className="text-xs">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Ver projeto
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
