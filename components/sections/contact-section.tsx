"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, Loader2 } from "lucide-react"

export function ContactSection() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")
    const mailtoLink = `mailto:henriquemon17@gmail.com?subject=${encodeURIComponent(formState.subject || "Contato via Portfolio")}&body=${encodeURIComponent(`Nome: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`
    window.open(mailtoLink, "_blank")
    setTimeout(() => {
      setStatus("sent")
      setFormState({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => setStatus("idle"), 4000)
    }, 1000)
  }

  const contactInfo = [
    { icon: Mail, label: "Email", value: "henriquemon17@gmail.com", href: "mailto:henriquemon17@gmail.com" },
    { icon: Phone, label: "Telefone", value: "+55 (15) 98802-7261", href: "tel:+5515988027261" },
    { icon: MapPin, label: t("location"), value: "Sorocaba, SP - Brasil", href: null },
    { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/henrique-monteiro-cardoso", href: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/" },
    { icon: Github, label: "GitHub", value: "github.com/HenriqueMC17", href: "https://github.com/HenriqueMC17" },
  ]

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            {t("contact")}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
            {t("letsWork")}
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto leading-relaxed">
            Tem um projeto em mente? Entre em contato e vamos transformar sua ideia em realidade.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-semibold text-foreground mb-1">Disponibilidade</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Respondo em ate 24 horas. Disponivel para projetos freelance e oportunidades CLT/PJ.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">Disponivel para novos projetos</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5 p-6 md:p-8 rounded-2xl bg-card border border-border">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">{t("name")}</label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">{t("email")}</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground mb-1.5">Assunto</label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={formState.subject}
                  onChange={e => setFormState(s => ({ ...s, subject: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
                  placeholder="Ex: Orcamento para site institucional"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">{t("message")}</label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-lg bg-background border border-input text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-none"
                  placeholder="Descreva seu projeto ou sua necessidade..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60 transition-colors"
              >
                {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                {status === "sent" && <CheckCircle className="w-4 h-4" />}
                {status === "idle" && <Send className="w-4 h-4" />}
                {status === "idle" && t("sendMessage")}
                {status === "sending" && "Enviando..."}
                {status === "sent" && "Mensagem enviada!"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
