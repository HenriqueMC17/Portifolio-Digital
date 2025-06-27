"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, Palette, Moon, Briefcase, User, Loader2, CheckCircle2 } from "lucide-react"

interface CVTemplate {
  id: string
  name: string
  description: string
  preview: string
  style: "corporate" | "creative" | "dark" | "clean"
  icon: React.ReactNode
}

const cvTemplates: CVTemplate[] = [
  {
    id: "corporate",
    name: "Corporativo",
    description: "Design profissional e conservador, ideal para empresas tradicionais",
    preview: "/placeholder.svg?height=300&width=200",
    style: "corporate",
    icon: <Briefcase className="h-5 w-5" />,
  },
  {
    id: "creative",
    name: "Criativo",
    description: "Layout moderno e colorido, perfeito para áreas criativas",
    preview: "/placeholder.svg?height=300&width=200",
    style: "creative",
    icon: <Palette className="h-5 w-5" />,
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Tema escuro elegante, destaque para desenvolvedores",
    preview: "/placeholder.svg?height=300&width=200",
    style: "dark",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    id: "clean",
    name: "Minimalista",
    description: "Design limpo e focado no conteúdo essencial",
    preview: "/placeholder.svg?height=300&width=200",
    style: "clean",
    icon: <FileText className="h-5 w-5" />,
  },
]

// Dados do currículo baseados no portfólio
const cvData = {
  personalInfo: {
    name: "Henrique Monteiro Cardoso",
    title: "Desenvolvedor Full Stack",
    email: "henrique.monteiro.cardoso@outlook.com",
    phone: "+55 (15) 99999-9999",
    location: "Sorocaba, SP",
    linkedin: "linkedin.com/in/henrique-monteiro-cardoso",
    github: "github.com/HenriqueMC17",
    website: "henriquemc.dev",
  },
  summary:
    "Desenvolvedor Full Stack em formação com 2+ anos de experiência em Java, JavaScript e TypeScript. Especializado em criar soluções web modernas e funcionais, com foco em performance e experiência do usuário. Experiência comprovada em gestão administrativa e suporte técnico, sempre buscando otimizar processos e agregar valor aos projetos.",
  experience: [
    {
      title: "Auxiliar Comercial",
      company: "CCBEU Sorocaba",
      period: "Fev 2025 - Presente",
      location: "Sorocaba, SP",
      description: [
        "Gestão de leads e conversões no sistema Bitrix",
        "Atendimento digital via WhatsApp Business",
        "Implementação de melhorias no sistema DKSoft",
        "Elaboração de relatórios gerenciais em Excel",
      ],
    },
    {
      title: "Aprendiz Auxiliar Administrativo II - SSMA",
      company: "ASSA ABLOY Group",
      period: "Jun - Dez 2024",
      location: "Porto Feliz, SP",
      description: [
        "Suporte administrativo na área de Saúde, Segurança e Meio Ambiente",
        "Gestão de EPIs e controle de treinamentos",
        "Reconhecimento por conscientização de segurança",
        "Organização de eventos SIPAT",
      ],
    },
    {
      title: "Auxiliar Comercial",
      company: "CCBEU Sorocaba",
      period: "Jan 2023 - Jan 2024",
      location: "Sorocaba, SP",
      description: [
        "Suporte à equipe comercial e treinamentos",
        "Migração entre sistemas DKSoft e Sponte",
        "Melhoria de processos administrativos",
        "Atendimento ao cliente e suporte técnico",
      ],
    },
  ],
  education: [
    {
      degree: "Análise e Desenvolvimento de Sistemas",
      institution: "Centro Universitário Facens",
      period: "Fev 2025 - Jul 2027",
      location: "Sorocaba, SP",
      status: "Em andamento",
    },
    {
      degree: "Ensino Médio Completo",
      institution: "Colégio Objetivo Zona Norte",
      period: "Jan 2022 - Dez 2024",
      location: "Sorocaba, SP",
      status: "Concluído",
    },
  ],
  skills: {
    technical: [
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "C++",
      "C#",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Spring Boot",
      "Node.js",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Git",
      "Docker",
      "VS Code",
      "Vercel",
    ],
    soft: [
      "Comunicação",
      "Trabalho em Equipe",
      "Liderança",
      "Resolução de Problemas",
      "Pensamento Crítico",
      "Adaptabilidade",
    ],
  },
  projects: [
    {
      name: "Safe Finance",
      description: "Sistema de gestão financeira pessoal com Java e Spring Boot",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "HTML5", "CSS3"],
      url: "github.com/HenriqueMC17/Safe-Finance",
    },
    {
      name: "Portfolio Website",
      description: "Site moderno com Next.js, animações avançadas e Easter Eggs",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      url: "henriquemc.dev",
    },
  ],
  certifications: [
    "Excel Profissionalizante e Especialista em Planilhas Eletrônicas (2024)",
    "Analista em Suporte Técnico (2024)",
    "Privacy and Data Protection Essentials (2024)",
    "Gestão de Pequenos Negócios (2022)",
  ],
}

export function CVGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<CVTemplate>(cvTemplates[0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationComplete, setGenerationComplete] = useState(false)

  const generateCV = async () => {
    setIsGenerating(true)
    setGenerationComplete(false)

    // Simular geração do PDF
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Aqui você integraria com uma biblioteca de geração de PDF
    // como jsPDF, Puppeteer, ou um serviço externo

    setIsGenerating(false)
    setGenerationComplete(true)

    // Reset após 3 segundos
    setTimeout(() => {
      setGenerationComplete(false)
    }, 3000)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Gerador de Currículo Inteligente</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Gere seu currículo em PDF com base nos dados do portfólio. Escolha entre diferentes layouts profissionais.
        </p>
      </div>

      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="templates">Escolher Template</TabsTrigger>
          <TabsTrigger value="preview">Visualizar Dados</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Template Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cvTemplates.map((template) => (
              <motion.div
                key={template.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedTemplate(template)}
              >
                <Card
                  className={`h-full transition-all duration-300 ${
                    selectedTemplate.id === template.id ? "ring-2 ring-primary shadow-lg" : "hover:shadow-md"
                  }`}
                >
                  <CardContent className="p-4">
                    {/* Preview Image */}
                    <div className="relative mb-4">
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-48 object-cover rounded-lg bg-muted"
                      />
                      {selectedTemplate.id === template.id && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle2 className="h-6 w-6 text-primary bg-white rounded-full" />
                        </div>
                      )}
                    </div>

                    {/* Template Info */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {template.icon}
                        <h3 className="font-semibold">{template.name}</h3>
                      </div>

                      <p className="text-sm text-muted-foreground">{template.description}</p>

                      <Badge variant="outline" className="w-fit">
                        {template.style}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <Button onClick={generateCV} disabled={isGenerating} size="lg" className="min-w-[200px]">
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Gerando PDF...
                </>
              ) : generationComplete ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  PDF Gerado!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Gerar Currículo - {selectedTemplate.name}
                </>
              )}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {/* Data Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informações Pessoais
                </h3>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Nome:</strong> {cvData.personalInfo.name}
                  </div>
                  <div>
                    <strong>Título:</strong> {cvData.personalInfo.title}
                  </div>
                  <div>
                    <strong>Email:</strong> {cvData.personalInfo.email}
                  </div>
                  <div>
                    <strong>Localização:</strong> {cvData.personalInfo.location}
                  </div>
                  <div>
                    <strong>LinkedIn:</strong> {cvData.personalInfo.linkedin}
                  </div>
                  <div>
                    <strong>GitHub:</strong> {cvData.personalInfo.github}
                  </div>
                  <div>
                    <strong>Website:</strong> {cvData.personalInfo.website}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Resumo Profissional</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cvData.summary}</p>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experiência Profissional
                </h3>
                <div className="space-y-4">
                  {cvData.experience.slice(0, 2).map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-medium">{exp.title}</h4>
                      <p className="text-sm text-primary">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.period}</p>
                      <ul className="text-xs text-muted-foreground mt-2 space-y-1">
                        {exp.description.slice(0, 2).map((desc, i) => (
                          <li key={i}>• {desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Habilidades</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Técnicas</h4>
                    <div className="flex flex-wrap gap-1">
                      {cvData.skills.technical.slice(0, 8).map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      <Badge variant="outline" className="text-xs">
                        +{cvData.skills.technical.length - 8} mais
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Comportamentais</h4>
                    <div className="flex flex-wrap gap-1">
                      {cvData.skills.soft.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Generate Button */}
          <div className="text-center">
            <Button onClick={generateCV} disabled={isGenerating} size="lg" className="min-w-[200px]">
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Gerando PDF...
                </>
              ) : generationComplete ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  PDF Gerado!
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Gerar Currículo - {selectedTemplate.name}
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
