import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github } from "lucide-react"

// Lista completa de todos os repositórios
const allRepositories = [
  // Projetos em destaque
  {
    id: 1,
    title: "Safe Finance",
    description: "Aplicativo desenvolvido para auxiliar na gestão financeira de maneira intuitiva e prática.",
    image: "/projects/safe-finance.jpg",
    category: "mobile",
    technologies: ["Java", "Android", "Firebase", "Material Design"],
    githubUrl: "https://github.com/HenriqueMC17/Safe-Finance",
    featured: true,
  },
  {
    id: 2,
    title: "Leand Peage Safe Finance",
    description: "Versão web da aplicação Safe Finance para gestão financeira pessoal.",
    image: "/projects/leand-peage.jpg",
    category: "web",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    githubUrl: "https://github.com/HenriqueMC17/Leand-Peage-Safe-Finance",
    featured: true,
  },
  // Projetos Java
  {
    id: 3,
    title: "Verificar se um número é par ou ímpar",
    description: "Programa Java para verificar se um número é par ou ímpar.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Verificar-se-um-numero-e-par-ou-impar-em-Java",
  },
  {
    id: 4,
    title: "Multiplicar e dividir por potências de 2",
    description: "Implementação em Java para multiplicar e dividir números por potências de 2.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Multiplicar-e-dividir-por-potencias-de-2-em-Java",
  },
  {
    id: 5,
    title: "Inverter os bits de um byte",
    description: "Programa Java para inverter os bits de um byte (8 bits).",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Inverter-os-bits-de-um-byte-8-bits-em-Java",
  },
  {
    id: 6,
    title: "Sanduíche em Java",
    description: "Implementação de um sistema de pedidos de sanduíche em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Sanduiche-em-Java",
  },
  {
    id: 7,
    title: "Projeto Café em Java",
    description: "Sistema de gerenciamento para cafeteria implementado em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Projeto-Cafe-em-Java",
  },
  {
    id: 8,
    title: "Formando em Java",
    description: "Sistema de gerenciamento de formandos implementado em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Formando-em-Java",
  },
  {
    id: 9,
    title: "Cadastro de Clientes",
    description: "Sistema de cadastro de clientes implementado em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Cadastro-de-Clientes-em-Java",
  },
  {
    id: 10,
    title: "Par ou Ímpar",
    description: "Jogo de par ou ímpar implementado em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Par-Ou-Impar-em-Java",
  },
  {
    id: 11,
    title: "Bem-Vindo em Java",
    description: "Programa de boas-vindas implementado em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Bem-Vindo-em-Java",
  },
  {
    id: 12,
    title: "Número Positivo, Negativo e Zero",
    description: "Programa Java para verificar se um número é positivo, negativo ou zero.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Numero-Positivo-Negativo-e-Zero-em-Java",
  },
  {
    id: 13,
    title: "Menu Interativo",
    description: "Implementação de um menu interativo em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Menu-Interativo-em-Java",
  },
  {
    id: 14,
    title: "Maior Valor",
    description: "Programa Java para encontrar o maior valor em um conjunto de números.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Maior-Valor-em-Java",
  },
  {
    id: 15,
    title: "Faixa Etária",
    description: "Programa Java para classificar pessoas por faixa etária.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Faixa-Etaria-em-Java",
  },
  {
    id: 16,
    title: "Classificador de Triângulo",
    description: "Programa Java para classificar triângulos com base em seus lados.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Classificador-Triangulo-em-Java",
  },
  {
    id: 17,
    title: "Calculadora Simples",
    description: "Implementação de uma calculadora simples em Java.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Calculadora-Simples-em-Java",
  },
  {
    id: 18,
    title: "Ano Bissexto",
    description: "Programa Java para verificar se um ano é bissexto.",
    image: "/projects/java-placeholder.jpg",
    category: "java",
    technologies: ["Java"],
    githubUrl: "https://github.com/HenriqueMC17/Ano-Bissexto",
  },
  // Projetos Web
  {
    id: 19,
    title: "Calculadora",
    description: "Implementação de uma calculadora com interface gráfica.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Calculadora",
  },
  {
    id: 20,
    title: "Projeto Final",
    description: "Projeto final de desenvolvimento web com JavaScript.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Projeto-Final",
  },
  {
    id: 21,
    title: "Tabuada",
    description: "Implementação de uma tabuada interativa em JavaScript.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Tabuada",
  },
  {
    id: 22,
    title: "Site Urso",
    description: "Site temático sobre ursos implementado em HTML.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-Urso",
  },
  {
    id: 23,
    title: "Site Mario",
    description: "Site temático sobre o jogo Mario implementado em HTML.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-Mario",
  },
  {
    id: 24,
    title: "Site com Cabeçalho",
    description: "Implementação de um site com cabeçalho em HTML.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Site-com-Cabecalho",
  },
  {
    id: 25,
    title: "Pedra, Papel e Tesoura",
    description: "Jogo clássico de Pedra, Papel e Tesoura implementado em JavaScript.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Pedra-Papel-e-Tesoura",
  },
  {
    id: 26,
    title: "Maior ou Menor",
    description: "Jogo de adivinhar se o próximo número é maior ou menor em JavaScript.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Maior-ou-Menor",
  },
  {
    id: 27,
    title: "Idade de uma Pessoa",
    description: "Calculadora de idade implementada em JavaScript.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/HenriqueMC17/Idade-de-uma-Pessoa",
  },
  {
    id: 28,
    title: "Criação de Site",
    description: "Projeto de criação de site com CSS.",
    image: "/projects/web-placeholder.jpg",
    category: "web",
    technologies: ["HTML", "CSS"],
    githubUrl: "https://github.com/HenriqueMC17/Criacao-de-Site",
  },
]

export default function ProjectsPage() {
  // Agrupar projetos por categoria
  const featuredProjects = allRepositories.filter((project) => project.featured)
  const javaProjects = allRepositories.filter((project) => project.category === "java")
  const webProjects = allRepositories.filter((project) => project.category === "web")
  const mobileProjects = allRepositories.filter((project) => project.category === "mobile")

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para a página inicial
        </Link>
      </div>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Todos os Projetos</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Explore todos os projetos que desenvolvi, incluindo aplicações web, mobile e estudos de caso em Java.
        </p>
      </div>

      {/* Projetos em Destaque */}
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Projetos em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Projetos Java */}
      {javaProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Projetos Java</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {javaProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Projetos Web */}
      {webProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Projetos Web</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* Projetos Mobile */}
      {mobileProjects.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Projetos Mobile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mobileProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/50">
      <div className="relative h-48 w-full">
        <Image
          src={project.image || `/projects/placeholder-${project.category || "default"}.jpg`}
          alt={project.title}
          fill
          className="object-cover"
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
          <h4 className="text-sm font-medium mb-2">Tecnologias:</h4>
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
                Ver ao vivo
              </a>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild size="sm" variant="outline">
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Ver código
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
