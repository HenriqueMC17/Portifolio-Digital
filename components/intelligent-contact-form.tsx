"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Code,
  Users,
  MessageSquare,
  Loader2,
} from "lucide-react"

interface ContactSuggestion {
  type: "job" | "project" | "collaboration" | "question"
  title: string
  description: string
  icon: React.ReactNode
  template: {
    subject: string
    message: string
  }
}

const contactSuggestions: ContactSuggestion[] = [
  {
    type: "job",
    title: "Oportunidade de Emprego",
    description: "Tenho uma vaga que pode interessar",
    icon: <Briefcase className="h-4 w-4" />,
    template: {
      subject: "Oportunidade de Emprego - [Nome da Empresa]",
      message:
        "Olá Henrique,\n\nTemos uma oportunidade que pode ser do seu interesse na nossa empresa. Gostaria de conversar sobre:\n\n• Posição: [Cargo]\n• Modalidade: [Presencial/Remoto/Híbrido]\n• Tecnologias: [Stack principal]\n• Localização: [Cidade/Estado]\n\nPodemos agendar uma conversa?\n\nAtenciosamente,\n[Seu nome]",
    },
  },
  {
    type: "project",
    title: "Projeto Freelance",
    description: "Preciso de ajuda com um projeto",
    icon: <Code className="h-4 w-4" />,
    template: {
      subject: "Proposta de Projeto Freelance",
      message:
        "Olá Henrique,\n\nTenho um projeto que gostaria de discutir com você:\n\n• Tipo de projeto: [Web/Mobile/Desktop]\n• Tecnologias desejadas: [Stack]\n• Prazo estimado: [Tempo]\n• Orçamento: [Valor aproximado]\n\nDescrição do projeto:\n[Descreva brevemente o que precisa ser desenvolvido]\n\nTem interesse em conversar sobre os detalhes?\n\nObrigado(a),\n[Seu nome]",
    },
  },
  {
    type: "collaboration",
    title: "Colaboração",
    description: "Vamos trabalhar juntos em algo",
    icon: <Users className="h-4 w-4" />,
    template: {
      subject: "Proposta de Colaboração",
      message:
        "Olá Henrique,\n\nVi seu portfólio e fiquei impressionado(a) com seus projetos. Gostaria de propor uma colaboração:\n\n• Tipo de colaboração: [Open source/Projeto pessoal/Startup]\n• Área de interesse: [Frontend/Backend/Full Stack]\n• Objetivo: [Descreva o objetivo]\n\nAcredito que podemos criar algo interessante juntos. O que acha?\n\nAbraços,\n[Seu nome]",
    },
  },
  {
    type: "question",
    title: "Dúvida Técnica",
    description: "Tenho uma pergunta sobre tecnologia",
    icon: <MessageSquare className="h-4 w-4" />,
    template: {
      subject: "Dúvida sobre [Tecnologia/Projeto]",
      message:
        "Olá Henrique,\n\nTenho uma dúvida técnica e acredito que você pode me ajudar:\n\n• Contexto: [Explique a situação]\n• Tecnologia envolvida: [Stack/Linguagem]\n• Problema específico: [Descreva o problema]\n\nJá tentei:\n[Liste o que já foi tentado]\n\nVocê teria alguma sugestão ou dica?\n\nObrigado(a) pela atenção,\n[Seu nome]",
    },
  },
]

const intentKeywords = {
  job: ["vaga", "emprego", "trabalho", "contratação", "oportunidade", "posição", "cargo"],
  project: ["projeto", "freelance", "desenvolvimento", "criar", "construir", "desenvolver"],
  collaboration: ["colaboração", "parceria", "juntos", "equipe", "colaborar", "contribuir"],
  question: ["dúvida", "pergunta", "ajuda", "como", "problema", "erro", "bug"],
}

export function IntelligentContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [detectedIntent, setDetectedIntent] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<ContactSuggestion[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Detectar intenção baseada no assunto e mensagem
  useEffect(() => {
    const text = `${formData.subject} ${formData.message}`.toLowerCase()

    for (const [intent, keywords] of Object.entries(intentKeywords)) {
      const hasKeyword = keywords.some((keyword) => text.includes(keyword))
      if (hasKeyword) {
        setDetectedIntent(intent)
        setSuggestions(contactSuggestions.filter((s) => s.type === intent))
        return
      }
    }

    setDetectedIntent(null)
    setSuggestions([])
  }, [formData.subject, formData.message])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória"
    } else if (formData.message.length < 10) {
      newErrors.message = "Mensagem muito curta (mínimo 10 caracteres)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simular envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Aqui você integraria com seu serviço de email
      // Por exemplo: Notion, Telegram, Slack, etc.

      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const applySuggestion = (suggestion: ContactSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      subject: suggestion.template.subject,
      message: suggestion.template.message,
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intent Detection */}
      {detectedIntent && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">Sugestão Inteligente</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Detectei que você está interessado em{" "}
                <strong>
                  {detectedIntent === "job" && "oportunidades de emprego"}
                  {detectedIntent === "project" && "projetos freelance"}
                  {detectedIntent === "collaboration" && "colaboração"}
                  {detectedIntent === "question" && "dúvidas técnicas"}
                </strong>
                . Aqui estão alguns templates que podem ajudar:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => applySuggestion(suggestion)}
                    className="justify-start h-auto p-3"
                  >
                    <div className="flex items-start gap-2">
                      {suggestion.icon}
                      <div className="text-left">
                        <div className="font-medium text-xs">{suggestion.title}</div>
                        <div className="text-xs text-muted-foreground">{suggestion.description}</div>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Form */}
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>Mensagem enviada com sucesso! Retornarei em breve.</span>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200"
              >
                <AlertCircle className="h-4 w-4" />
                <span>Erro ao enviar mensagem. Tente novamente ou use o email direto.</span>
              </motion.div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome *
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Seu nome completo"
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Assunto *
              </label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Sobre o que você gostaria de conversar?"
                className={errors.subject ? "border-red-500" : ""}
              />
              {errors.subject && <p className="text-xs text-red-500">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Mensagem *
              </label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Descreva sua proposta, dúvida ou oportunidade..."
                rows={6}
                className={errors.message ? "border-red-500" : ""}
              />
              {errors.message && <p className="text-xs text-red-500">{errors.message}</p>}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mínimo 10 caracteres</span>
                <span>{formData.message.length} caracteres</span>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Quick Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Send className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Email Direto</h3>
            <p className="text-sm text-muted-foreground mb-2">henrique.monteiro.cardoso@outlook.com</p>
            <Badge variant="secondary">Resposta em 24h</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">in</span>
              </div>
            </div>
            <h3 className="font-semibold mb-1">LinkedIn</h3>
            <p className="text-sm text-muted-foreground mb-2">Conecte-se profissionalmente</p>
            <Badge variant="secondary">Networking</Badge>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-1">WhatsApp</h3>
            <p className="text-sm text-muted-foreground mb-2">Conversa rápida e direta</p>
            <Badge variant="secondary">Instantâneo</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
