"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Loader2, CheckCircle, Send } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type ContactFormState = {
  name: string
  email: string
  subject: string
  message: string
  website: string
}

export function ContactSection() {
  const { language } = useLanguage()
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")
  const [formState, setFormState] = useState<ContactFormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  })

  const suggestedSubject = useMemo(() => {
    if (formState.message.length < 25) return ""
    if (/projeto|orcamento|orçamento|proposal|budget/i.test(formState.message)) return language === "pt" ? "Proposta de Projeto" : "Project Proposal"
    if (/vaga|oportunidade|job|hiring/i.test(formState.message)) return language === "pt" ? "Oportunidade Profissional" : "Career Opportunity"
    return language === "pt" ? "Contato Profissional" : "Professional Contact"
  }, [formState.message, language])

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email) || formState.email.length === 0
  const messageIsValid = formState.message.length >= 20 || formState.message.length === 0

  const content = {
    pt: {
      title: "Contato",
      subtitle: "Estou disponível para oportunidades, projetos e parcerias estratégicas.",
      name: "Nome",
      email: "E-mail",
      subject: "Assunto",
      message: "Mensagem",
      response: "Tempo médio de resposta: até 24h.",
      send: "Enviar mensagem",
      sending: "Enviando...",
      sent: "Mensagem enviada!",
      honeypot: "Não preencher",
    },
    en: {
      title: "Contact",
      subtitle: "I am available for opportunities, projects and strategic partnerships.",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Message",
      response: "Average response time: within 24h.",
      send: "Send message",
      sending: "Sending...",
      sent: "Message sent!",
      honeypot: "Do not fill",
    },
  }

  const t = content[language]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!emailIsValid || !messageIsValid) return
    if (formState.website.trim()) return

    setStatus("sending")
    setTimeout(() => {
      setStatus("sent")
      setTimeout(() => {
        setStatus("idle")
        setFormState({ name: "", email: "", subject: "", message: "", website: "" })
      }, 2000)
    }, 1200)
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-6">
            <h2 className="text-4xl font-bold gradient-text">{t.title}</h2>
            <p className="text-muted-foreground">{t.subtitle}</p>
            <p className="text-sm text-primary">{t.response}</p>

            <div className="space-y-3">
              <a className="flex items-center gap-3 p-4 rounded-lg border border-border" href="mailto:henriquemon17@gmail.com">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">henriquemon17@gmail.com</span>
              </a>
              <a className="flex items-center gap-3 p-4 rounded-lg border border-border" href="tel:+5515988027261">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+55 (15) 98802-7261</span>
              </a>
              <div className="flex items-center gap-3 p-4 rounded-lg border border-border">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Sorocaba, SP - Brasil</span>
              </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} onSubmit={handleSubmit} className="lg:col-span-3 p-6 rounded-2xl border border-border bg-card space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium mb-1.5">{t.name}</label>
                <input id="contact-name" required value={formState.name} onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-sm" />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium mb-1.5">{t.email}</label>
                <input id="contact-email" type="email" required value={formState.email} onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-sm" />
                {!emailIsValid && <p className="text-xs text-destructive mt-1">{language === "pt" ? "E-mail inválido." : "Invalid email."}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-sm font-medium mb-1.5">{t.subject}</label>
              <input id="contact-subject" required value={formState.subject} onChange={(e) => setFormState((s) => ({ ...s, subject: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-sm" placeholder={suggestedSubject || (language === "pt" ? "Ex: Proposta de projeto" : "Ex: Project proposal")} />
              {suggestedSubject && !formState.subject && <p className="text-xs text-muted-foreground mt-1">{language === "pt" ? `Sugestão automática: ${suggestedSubject}` : `Suggested subject: ${suggestedSubject}`}</p>}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium mb-1.5">{t.message}</label>
              <textarea id="contact-message" required rows={5} value={formState.message} onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))} className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-sm resize-none" />
              {!messageIsValid && <p className="text-xs text-destructive mt-1">{language === "pt" ? "Mensagem deve ter ao menos 20 caracteres." : "Message must have at least 20 characters."}</p>}
            </div>

            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">{t.honeypot}</label>
              <input id="contact-website" tabIndex={-1} autoComplete="off" value={formState.website} onChange={(e) => setFormState((s) => ({ ...s, website: e.target.value }))} />
            </div>

            <button type="submit" disabled={status !== "idle" || !emailIsValid || !messageIsValid} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm disabled:opacity-60">
              {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "sent" && <CheckCircle className="w-4 h-4" />}
              {status === "idle" && <Send className="w-4 h-4" />}
              {status === "idle" && t.send}
              {status === "sending" && t.sending}
              {status === "sent" && t.sent}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
