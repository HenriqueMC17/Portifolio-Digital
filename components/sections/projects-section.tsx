"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

// Dados dos projetos reais de Henrique
const projects = [
  {
    id: 1,
    title: "Safe Finance",
    description: "Aplicativo desenvolvido para auxiliar na gestão financeira de maneira intuitiva e prática.",
    category: "mobile",
    technologies: ["Java", "Android", "Firebase", "Material Design"],
    githubUrl: "https://github.com/HenriqueMC17/Safe-Finance",
    featured: true,
  },
  {
    id: 2,
    title: "Leand Peage Safe Finance",
    description: "Versão web da aplicação Safe Finance para gestão financeira pessoal.",
    category: "web",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    githubUrl: "https://github.com/HenriqueMC17/Leand-Peage-Safe-Finance",
    featured: true,
  },
  {
    id: 3,
    title: "Projeto Final",
    description: "Projeto final de desenvolvimento web com JavaScript.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Projeto-Final",
    featured: true,
  },
  {
    id: 4,
    title: "Calculadora",
    description: "Implementação de uma calculadora com interface gráfica.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Calculadora",
    featured: true,
  },
  {
    id: 5,
    title: "Pedra, Papel e Tesoura",
    description: "Jogo clássico de Pedra, Papel e Tesoura implementado em JavaScript.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Pedra-Papel-e-Tesoura",
    featured: true,
  },
  {
    id: 6,
    title: "Projeto Café em Java",
    description: "Sistema de gerenciamento para cafeteria implementado em Java.",
    category: "desktop",
    technologies: ["Java", "Swing", "JDBC"],
    githubUrl: "https://github.com/HenriqueMC17/Projeto-Cafe-em-Java",
    featured: true,
  },
]

// Lista completa de todos os repositórios
const allRepositories = [
  {
    id: 7,
    title: "Verificar se um número é par ou ímpar",
    description: "Programa Java para verificar se um número é par ou ímpar.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Verificar-se-um-numero-e-par-ou-impar-em-Java",
  },
  {
    id: 8,
    title: "Multiplicar e dividir por potências de 2",
    description: "Implementação em Java para multiplicar e dividir números por potências de 2.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Multiplicar-e-dividir-por-potencias-de-2-em-Java",
  },
  {
    id: 9,
    title: "Inverter os bits de um byte",
    description: "Programa Java para inverter os bits de um byte (8 bits).",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Inverter-os-bits-de-um-byte-8-bits-em-Java",
  },
  {
    id: 10,
    title: "Sanduíche em Java",
    description: "Implementação de um sistema de pedidos de sanduíche em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Sanduiche-em-Java",
  },
  {
    id: 11,
    title: "Formando em Java",
    description: "Sistema de gerenciamento de formandos implementado em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Formando-em-Java",
  },
  {
    id: 12,
    title: "Cadastro de Clientes",
    description: "Sistema de cadastro de clientes implementado em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Cadastro-de-Clientes-em-Java",
  },
  {
    id: 13,
    title: "Par ou Ímpar",
    description: "Jogo de par ou ímpar implementado em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Par-Ou-Impar-em-Java",
  },
  {
    id: 14,
    title: "Bem-Vindo em Java",
    description: "Programa de boas-vindas implementado em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Bem-Vindo-em-Java",
  },
  {
    id: 15,
    title: "Número Positivo, Negativo e Zero",
    description: "Programa Java para verificar se um número é positivo, negativo ou zero.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Numero-Positivo-Negativo-e-Zero-em-Java",
  },
  {
    id: 16,
    title: "Menu Interativo",
    description: "Implementação de um menu interativo em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Menu-Interativo-em-Java",
  },
  {
    id: 17,
    title: "Maior Valor",
    description: "Programa Java para encontrar o maior valor em um conjunto de números.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Maior-Valor-em-Java",
  },
  {
    id: 18,
    title: "Faixa Etária",
    description: "Programa Java para classificar pessoas por faixa etária.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Faixa-Etaria-em-Java",
  },
  {
    id: 19,
    title: "Classificador de Triângulo",
    description: "Programa Java para classificar triângulos com base em seus lados.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Classificador-Triangulo-em-Java",
  },
  {
    id: 20,
    title: "Calculadora Simples",
    description: "Implementação de uma calculadora simples em Java.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Calculadora-Simples-em-Java",
  },
  {
    id: 21,
    title: "Ano Bissexto",
    description: "Programa Java para verificar se um ano é bissexto.",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Ano-Bissexto",
  },
  {
    id: 22,
    title: "Tabuada",
    description: "Implementação de uma tabuada interativa em JavaScript.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Tabuada",
  },
  {
    id: 23,
    title: "Site Urso",
    description: "Site temático sobre ursos implementado em HTML.",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-Urso",
  },
  {
    id: 24,
    title: "Site Mario",
    description: "Site temático sobre o jogo Mario implementado em HTML.",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-Mario",
  },
  {
    id: 25,
    title: "Site com Cabeçalho",
    description: "Implementação de um site com cabeçalho em HTML.",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-com-Cabecalho",
  },
  {
    id: 26,
    title: "Maior ou Menor",
    description: "Jogo de adivinhar se o próximo número é maior ou menor em JavaScript.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Maior-ou-Menor",
  },
  {
    id: 27,
    title: "Idade de uma Pessoa",
    description: "Calculadora de idade implementada em JavaScript.",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Idade-de-uma-Pessoa",
  },
  {
    id: 28,
    title: "Criação de Site",
    description: "Projeto de criação de site com CSS.",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Criacao-de-Site",
  },
]

export function ProjectsSection() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("all")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Filtrar projetos com base na categoria selecionada
  const filteredProjects =
    activeTab === "all"
      ? projects
      : activeTab === "java"
        ? projects.filter((project) => project.technologies.includes("Java"))
        : activeTab === "web"
          ? projects.filter((project) => project.category === "web")
          : activeTab === "mobile"
            ? projects.filter((project) => project.category === "mobile")
            : projects

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading title={t("projects.title")} subtitle={t("projects.subtitle")} centered />

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mt-12">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button asChild variant="outline">
            <Link href="/projects">
              {t("projects.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const { t } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 w-full">
        <Image
          src={project.image || `/projects/placeholder-${project.category || "default"}.jpg`}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
        <div className="absolute bottom-4 left-4">
          <span className="px-2 py-1 bg-primary/90 text-primary-foreground rounded-md text-xs">
            {project.category === "web"
              ? "Web App"
              : project.category === "mobile"
                ? "Mobile App"
                : project.category === "java"
                  ? "Java"
                  : "Desktop App"}
          </span>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">{t("projects.technologies")}:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          {project.liveUrl && (
            <Button asChild size="sm" variant="default">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                {t("projects.viewLive")}
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                {t("projects.viewCode")}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
