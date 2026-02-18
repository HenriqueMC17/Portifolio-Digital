"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, GitBranch, Star } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function ProjectsSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Projetos",
      safeFinance: {
        title: "Safe Finance",
        contexto: "Sistema desenvolvido para organização e controle financeiro.",
        problema: "Dificuldade em visualizar, organizar e controlar entradas e saídas financeiras de forma estruturada.",
        solucao:
          "Aplicação com interface intuitiva, organização por categorias, cálculos automatizados e estrutura modular.",
        stack: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
        decisoes: [
          "Separação clara entre lógica e interface",
          "Organização por componentes reutilizáveis",
          "Estrutura preparada para escalabilidade",
        ],
        impacto: ["Melhor organização financeira", "Redução de erros manuais", "Maior controle e previsibilidade"],
        licoes: [
          "Importância de UX clara em sistemas financeiros",
          "Estrutura modular facilita evolução futura",
        ],
      },
      dynamicTitle: "Outros Projetos Públicos",
      dynamicDescription:
        "Os repositórios públicos são integrados via GitHub para exibir projetos recentes, linguagens mais utilizadas, commits/contribuições, stars e forks.",
      ctas: { code: "Código", demo: "Demo" },
    },
    en: {
      title: "Projects",
      safeFinance: {
        title: "Safe Finance",
        contexto: "System built for financial organization and control.",
        problema: "Difficulty to visualize, organize and control income and expenses in a structured way.",
        solucao: "Application with intuitive interface, category-based organization, automated calculations and modular architecture.",
        stack: ["JavaScript", "TypeScript", "SQL", "HTML", "CSS"],
        decisoes: [
          "Clear separation between logic and interface",
          "Reusable component organization",
          "Structure prepared for scalability",
        ],
        impacto: ["Better financial organization", "Reduced manual errors", "Higher control and predictability"],
        licoes: ["Clear UX matters in financial systems", "Modular structure makes future evolution easier"],
      },
      dynamicTitle: "Other Public Projects",
      dynamicDescription:
        "Public repositories are integrated through GitHub to show latest projects, most-used languages, commits/contributions, stars and forks.",
      ctas: { code: "Code", demo: "Demo" },
    },
  }

  const t = content[language]

  return (
    <section id="projects" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-10">{t.title}</h2>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t.safeFinance.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p><strong>Contexto:</strong> {t.safeFinance.contexto}</p>
              <p><strong>Problema:</strong> {t.safeFinance.problema}</p>
              <p><strong>Solução:</strong> {t.safeFinance.solucao}</p>

              <div>
                <p className="font-semibold mb-2">Stack utilizada</p>
                <div className="flex flex-wrap gap-2">
                  {t.safeFinance.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="font-semibold mb-2">Decisões técnicas</p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {t.safeFinance.decisoes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Impacto</p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {t.safeFinance.impacto.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="font-semibold mb-2">Lições aprendidas</p>
                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                    {t.safeFinance.licoes.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" asChild>
                  <a href="https://github.com/HenriqueMC17" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    {t.ctas.code}
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="#contact">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {t.ctas.demo}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.dynamicTitle}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p>{t.dynamicDescription}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-lg border border-border p-3 flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-primary" />
                  <span>Commits e contribuições</span>
                </div>
                <div className="rounded-lg border border-border p-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span>Stars e forks</span>
                </div>
                <div className="rounded-lg border border-border p-3 flex items-center gap-2">
                  <Github className="h-4 w-4 text-primary" />
                  <span>Projetos recentes e linguagens</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
