"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { QrCode, ListChecks, BarChart3, Boxes } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function BlogSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Mini Aplicações",
      subtitle: "Demonstrações práticas de capacidade técnica",
      apps: [
        { icon: QrCode, title: "Gerador de QR Code", status: "Explorando", description: "Entrada de texto/URL com geração instantânea de QR." },
        { icon: ListChecks, title: "To-do List Funcional", status: "Dominando", description: "CRUD de tarefas com feedback visual e organização." },
        { icon: BarChart3, title: "Dashboard Financeiro", status: "Em evolução", description: "Indicadores e visualização de entradas/saídas." },
        { icon: Boxes, title: "Componentes Interativos", status: "Dominando", description: "Conjunto de componentes reutilizáveis para UI de produção." },
      ],
      cta: "Solicitar demonstração",
    },
    en: {
      title: "Mini Applications",
      subtitle: "Practical demonstrations of technical capability",
      apps: [
        { icon: QrCode, title: "QR Code Generator", status: "Exploring", description: "Text/URL input with instant QR generation." },
        { icon: ListChecks, title: "Functional To-do List", status: "Mastering", description: "Task CRUD with visual feedback and organization." },
        { icon: BarChart3, title: "Financial Dashboard", status: "Growing", description: "Indicators and income/expense visualization." },
        { icon: Boxes, title: "Interactive Components", status: "Mastering", description: "Reusable component set for production UI." },
      ],
      cta: "Request demo",
    },
  }

  const t = content[language]

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
          <p className="text-center text-muted-foreground mb-10">{t.subtitle}</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {t.apps.map((app) => (
              <Card key={app.title}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <app.icon className="h-5 w-5 text-primary" />
                    {app.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  <Badge variant="secondary">{app.status}</Badge>
                  <p>{app.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <a href="#contact">{t.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
