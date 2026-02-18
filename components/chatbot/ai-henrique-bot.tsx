"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send, Bot, User, Download, Github, Mail, Code, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
}

interface QuickAction {
  label: string
  action: string
  icon: React.ElementType
}

export function AIHenriqueBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions: QuickAction[] = [
    { label: "Sobre mim", action: "sobre", icon: User },
    { label: "Projetos", action: "projetos", icon: Briefcase },
    { label: "Habilidades", action: "skills", icon: Code },
    { label: "Contato", action: "contato", icon: Mail },
    { label: "Download CV", action: "cv", icon: Download },
    { label: "GitHub", action: "github", icon: Github },
  ]

  const knowledgeBase: Record<string, { response: string; quickReplies: string[]; action?: string }> = {
    sobre: {
      response: `👋 **Olá! Eu sou o Henrique Monteiro Cardoso**

🚀 **Desenvolvedor Full Stack** especializado em:
• **Frontend**: React, Next.js, TypeScript, Tailwind CSS
• **Backend**: Java, Spring Boot, Node.js
• **Database**: PostgreSQL, MongoDB, MySQL
• **Cloud**: AWS, Docker, Kubernetes

💡 **Experiência**: 3+ anos desenvolvendo soluções web modernas
🎯 **Foco**: Performance, UX/UI e arquitetura escalável
🌟 **Paixão**: Criar experiências digitais inovadoras`,
      quickReplies: ["projetos", "skills", "contato"],
    },
    projetos: {
      response: `🚀 **Meus Principais Projetos**

**1. Sistema de Gestão Empresarial**
• Stack: React + Spring Boot + PostgreSQL
• Features: Dashboard analytics, relatórios em tempo real
• Deploy: AWS com CI/CD automatizado

**2. E-commerce Platform**
• Stack: Next.js + Node.js + MongoDB
• Features: Pagamentos integrados, admin panel
• Performance: 95+ no Lighthouse

**3. Portfolio Futurista**
• Stack: Next.js + TypeScript + Framer Motion
• Features: Animações 3D, PWA, chatbot AI
• Design: Interface cyber com efeitos holográficos

🔗 **Todos os projetos estão no meu GitHub!**`,
      quickReplies: ["github", "skills", "contato"],
    },
    skills: {
      response: `⚡ **Stack Tecnológico**

**Frontend (90%)**
\`\`\`
React • Next.js • TypeScript • Tailwind CSS
Framer Motion • Three.js • PWA
\`\`\`

**Backend (85%)**
\`\`\`
Java • Spring Boot • Node.js • Express
REST APIs • GraphQL • Microservices
\`\`\`

**Database (80%)**
\`\`\`
PostgreSQL • MongoDB • MySQL • Redis
\`\`\`

**DevOps (75%)**
\`\`\`
Docker • Kubernetes • AWS • CI/CD
GitHub Actions • Vercel • Netlify
\`\`\`

**Soft Skills**
• Liderança técnica • Metodologias ágeis • Mentoria`,
      quickReplies: ["projetos", "contato", "cv"],
    },
    contato: {
      response: `📞 **Vamos Conversar!**

**Contatos Profissionais:**
• 📧 **Email**: henriquemon17@gmail.com
• 💼 **LinkedIn**: /in/henrique-monteiro-cardoso
• 🐙 **GitHub**: /HenriqueMC17

**Disponibilidade:**
• ✅ Projetos freelance
• ✅ Oportunidades full-time
• ✅ Consultoria técnica
• ✅ Mentoria em desenvolvimento

**Localização**: Brasil 🇧🇷
**Idiomas**: Português (nativo), Inglês (avançado)

💬 **Respondo em até 24h!**`,
      quickReplies: ["cv", "github", "sobre"],
    },
    cv: {
      response: `📄 **Curriculum Vitae**

**Download disponível em formato PDF:**
• Experiência profissional completa
• Projetos detalhados com tecnologias
• Certificações e cursos
• Referências profissionais

🔽 **Clique no botão abaixo para download**

*Arquivo atualizado em ${new Date().toLocaleDateString("pt-BR")}*`,
      quickReplies: ["contato", "projetos", "sobre"],
      action: "download_cv",
    },
    github: {
      response: `🐙 **GitHub Profile**

**Estatísticas:**
• 📊 **50+** repositórios públicos
• ⭐ **100+** stars recebidas
• 🔄 **200+** contribuições este ano
• 🏆 **15+** projetos em produção

**Repositórios em Destaque:**
• **portfolio-futurista** - Este site que você está vendo!
• **ecommerce-platform** - Plataforma completa de e-commerce
• **task-manager-api** - API REST com Spring Boot
• **react-components-lib** - Biblioteca de componentes

🔗 **GitHub**: github.com/HenriqueMC17`,
      quickReplies: ["projetos", "skills", "contato"],
      action: "open_github",
    },
    default: {
      response: `🤖 **Assistente Virtual do Henrique**

Olá! Eu posso te ajudar com informações sobre:

• 👨‍💻 **Perfil profissional** e experiência
• 🚀 **Projetos** e portfolio
• ⚡ **Habilidades** técnicas
• 📞 **Contato** e disponibilidade
• 📄 **Download do CV**
• 🐙 **Repositórios GitHub**

**Como posso te ajudar hoje?**`,
      quickReplies: ["sobre", "projetos", "skills", "contato"],
    },
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: "bot",
        content: knowledgeBase.default.response,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen])

  const handleSend = async (message?: string) => {
    const messageText = message || input.trim()
    if (!messageText) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const response = getBotResponse(messageText.toLowerCase())
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: response.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)

      // Handle special actions
      if (response.action === "download_cv") {
        setTimeout(() => {
          const link = document.createElement("a")
          link.href = "/cv-henrique-monteiro-cardoso.pdf"
          link.download = "CV-Henrique-Monteiro-Cardoso.pdf"
          link.click()
        }, 1000)
      } else if (response.action === "open_github") {
        setTimeout(() => {
          window.open("https://github.com/HenriqueMC17", "_blank")
        }, 1000)
      }
    }, 1500)
  }

  const getBotResponse = (input: string) => {
    const keywords = {
      sobre: ["sobre", "perfil", "quem", "você", "henrique"],
      projetos: ["projeto", "portfolio", "trabalho", "desenvolvimento"],
      skills: ["skill", "habilidade", "tecnologia", "stack", "linguagem"],
      contato: ["contato", "email", "telefone", "linkedin", "falar"],
      cv: ["cv", "curriculo", "download", "pdf"],
      github: ["github", "repositorio", "codigo", "git"],
    }

    for (const [key, words] of Object.entries(keywords)) {
      if (words.some((word) => input.includes(word))) {
        const knowledge = knowledgeBase[key as keyof typeof knowledgeBase]
        return {
          content: knowledge.response,
          action: knowledge.action,
        }
      }
    }

    return {
      content: knowledgeBase.default.response,
      action: undefined,
    }
  }

  const handleQuickAction = (action: string) => {
    handleSend(action)
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-border/50 p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-orbitron font-semibold text-sm">AI Henrique Bot</h3>
                  <p className="text-xs text-muted-foreground">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                    Online
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === "user"
                          ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                          : "bg-muted/50 text-foreground"
                      }`}
                    >
                      <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-muted/50 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Actions */}
            <div className="p-4 border-t border-border/50">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickActions.slice(0, 4).map((action) => (
                  <Badge
                    key={action.action}
                    variant="secondary"
                    className="cursor-pointer hover:bg-cyan-500/20 transition-colors"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <action.icon className="h-3 w-3 mr-1" />
                    {action.label}
                  </Badge>
                ))}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-muted/50 border-border/50 focus:border-cyan-400"
                />
                <Button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
