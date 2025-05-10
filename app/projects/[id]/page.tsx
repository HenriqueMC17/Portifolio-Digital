import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

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
    longDescription: [
      "A Safe Finance é um aplicativo desenvolvido com o objetivo principal de auxiliar na gestão financeira, de maneira intuitiva e prática. Seu design visa atender a públicos que não possuem conhecimentos prévios sobre o uso de aplicativos bancários ou planilhas de Excel.",
      "O aplicativo permite que os usuários registrem suas receitas e despesas, categorizem transações, visualizem relatórios detalhados e estabeleçam metas financeiras. A interface foi projetada para ser simples e intuitiva, facilitando o uso por pessoas de todas as idades.",
      "O desenvolvimento foi realizado utilizando Java para Android, com Firebase como backend para armazenamento de dados e autenticação de usuários. O Material Design foi aplicado para garantir uma experiência de usuário moderna e consistente.",
    ],
    features: [
      "Registro de receitas e despesas",
      "Categorização de transações",
      "Relatórios financeiros detalhados",
      "Estabelecimento de metas financeiras",
      "Notificações de pagamentos pendentes",
      "Sincronização de dados na nuvem",
      "Autenticação segura de usuários",
    ],
    challenges: [
      "Implementação de uma interface intuitiva para usuários sem experiência em finanças",
      "Desenvolvimento de um sistema de sincronização eficiente com o Firebase",
      "Criação de relatórios financeiros visualmente informativos",
      "Garantia de segurança dos dados financeiros dos usuários",
    ],
    screenshots: [
      { url: "/projects/safe-finance-1.jpg", caption: "Tela inicial do aplicativo" },
      { url: "/projects/safe-finance-2.jpg", caption: "Registro de transações" },
      { url: "/projects/safe-finance-3.jpg", caption: "Relatórios financeiros" },
      { url: "/projects/safe-finance-4.jpg", caption: "Configuração de metas" },
    ],
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
    longDescription: [
      "O Leand Peage Safe Finance é a versão web do aplicativo Safe Finance, desenvolvido para oferecer as mesmas funcionalidades de gestão financeira em uma plataforma acessível via navegador.",
      "Esta versão foi criada para atender usuários que preferem utilizar computadores para gerenciar suas finanças, oferecendo uma interface responsiva que se adapta a diferentes tamanhos de tela.",
      "O desenvolvimento foi realizado utilizando HTML5, CSS3 e JavaScript, com Bootstrap para garantir responsividade e consistência visual. A aplicação permite que os usuários acessem suas informações financeiras de qualquer dispositivo com acesso à internet.",
    ],
    features: [
      "Interface responsiva para desktop e mobile",
      "Registro e categorização de transações financeiras",
      "Visualização de relatórios e gráficos",
      "Exportação de dados em diferentes formatos",
      "Sincronização com a versão mobile",
      "Autenticação segura de usuários",
    ],
    challenges: [
      "Desenvolvimento de uma interface web que mantivesse a simplicidade da versão mobile",
      "Implementação de gráficos interativos para visualização de dados financeiros",
      "Criação de um sistema de sincronização entre as versões web e mobile",
      "Otimização do desempenho para carregamento rápido em diferentes dispositivos",
    ],
    screenshots: [
      { url: "/projects/leand-peage-1.jpg", caption: "Dashboard principal" },
      { url: "/projects/leand-peage-2.jpg", caption: "Formulário de registro de transações" },
      { url: "/projects/leand-peage-3.jpg", caption: "Visualização de relatórios" },
      { url: "/projects/leand-peage-4.jpg", caption: "Configurações de conta" },
    ],
  },
  // Adicione mais projetos com detalhes aqui...
]

export default function ProjectPage({ params }: { params: { id: string } }) {
  const projectId = Number.parseInt(params.id)
  const project = allRepositories.find((p) => p.id === projectId)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="mb-8">
        <Link
          href="/projects"
          className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para projetos
        </Link>
      </div>

      {/* Hero Section */}
      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-12">
        <Image
          src={project.image || `/projects/placeholder-${project.category || "default"}.jpg`}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <span className="px-2 py-1 bg-primary/90 text-primary-foreground rounded-md text-xs mb-4 inline-block">
            {project.category === "web"
              ? "Web App"
              : project.category === "mobile"
                ? "Mobile App"
                : project.category === "java"
                  ? "Java"
                  : "Desktop App"}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Sobre o Projeto</h2>
              <div className="space-y-4">
                {project.longDescription ? (
                  project.longDescription.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <p className="text-muted-foreground">{project.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          {project.features && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Funcionalidades</h2>
                <ul className="list-disc list-inside space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground">
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Challenges */}
          {project.challenges && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Desafios e Soluções</h2>
                <ul className="list-disc list-inside space-y-2">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-muted-foreground">
                      {challenge}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Screenshots */}
          {project.screenshots && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Screenshots</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={screenshot.url || `/projects/placeholder-${project.category || "default"}.jpg`}
                        alt={screenshot.caption || `Screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end">
                        <p className="p-3 text-sm">{screenshot.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Project Info */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Informações do Projeto</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Categoria</h3>
                  <p>
                    {project.category === "web"
                      ? "Aplicação Web"
                      : project.category === "mobile"
                        ? "Aplicação Mobile"
                        : project.category === "java"
                          ? "Aplicação Java"
                          : "Aplicação Desktop"}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tecnologias</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Links */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Links</h2>

              <div className="space-y-4">
                {project.liveUrl && (
                  <Button asChild className="w-full">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Ver projeto ao vivo
                    </a>
                  </Button>
                )}

                {project.githubUrl && (
                  <Button asChild variant="outline" className="w-full">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Ver código fonte
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Contact CTA */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">Interessado em um projeto similar?</h2>
              <p className="text-muted-foreground mb-4">
                Vamos conversar sobre como posso ajudar a transformar sua ideia em realidade.
              </p>
              <Button asChild className="w-full">
                <Link href="/#contact">Entre em contato</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
