"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, X, Bot, User, Lightbulb, Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  suggestions?: string[]
}

interface KnowledgeBase {
  [key: string]: {
    response: string
    suggestions?: string[]
    links?: { text: string; url: string }[]
  }
}

const knowledgeBase: KnowledgeBase = {
  // Saudações
  "olá|oi|hello|hi": {
    response:
      "Olá! 👋 Eu sou o HenriqueBot, assistente virtual do Henrique Monteiro Cardoso. Estou aqui para responder suas dúvidas sobre experiência, projetos, habilidades e muito mais!",
    suggestions: ["Quais são suas habilidades?", "Conte sobre seus projetos", "Como posso entrar em contato?"],
  },

  // Habilidades
  "habilidades|skills|tecnologias|stack": {
    response:
      "🚀 Henrique é especializado em:\n\n**Frontend:** React, Next.js, TypeScript, Tailwind CSS, Framer Motion\n**Backend:** Java, Spring Boot, Node.js, Express\n**Banco de Dados:** PostgreSQL, MongoDB\n**Ferramentas:** Git, Docker, VS Code\n\nEle está sempre aprendendo novas tecnologias e se mantém atualizado com as tendências do mercado!",
    suggestions: ["Projetos com Java", "Experiência com React", "Certificações"],
  },

  // Projetos
  "projetos|projects|portfolio": {
    response:
      "💼 Principais projetos do Henrique:\n\n**Safe Finance** - Sistema de gestão financeira com Java e Spring Boot\n• Redução de 70% no tempo de controle financeiro\n• Interface intuitiva e relatórios detalhados\n\n**Portfolio Website** - Site moderno com Next.js\n• Lighthouse Score 98/100\n• Animações avançadas e Easter Eggs\n• PWA com service workers\n\n**Task Manager API** - API RESTful completa\n• Autenticação JWT\n• 92% de cobertura de testes\n• Documentação Swagger",
    suggestions: ["Detalhes do Safe Finance", "Como foi feito o portfolio", "Ver projetos no GitHub"],
    links: [
      { text: "GitHub", url: "https://github.com/HenriqueMC17" },
      { text: "Portfolio Live", url: "https://henriquemc.dev" },
    ],
  },

  // Experiência
  "experiência|experience|trabalho|carreira": {
    response:
      "💼 Experiência profissional do Henrique:\n\n**Auxiliar Comercial - CCBEU Sorocaba** (Fev 2025 - Presente)\n• Gestão de leads no Bitrix CRM\n• Atendimento digital e suporte\n• Melhorias no sistema DKSoft\n\n**Aprendiz Administrativo - ASSA ABLOY** (Jun - Dez 2024)\n• Reconhecimento por conscientização em SSMA\n• Gestão de EPIs e segurança\n• Suporte administrativo\n\nSempre focado em aprendizado contínuo e crescimento profissional!",
    suggestions: ["Certificações", "Formação acadêmica", "Próximos passos na carreira"],
  },

  // Formação
  "formação|educação|faculdade|curso": {
    response:
      "🎓 Formação do Henrique:\n\n**Análise e Desenvolvimento de Sistemas**\nCentro Universitário Facens (2025-2027)\n\n**Certificações (18+):**\n• Excel Profissionalizante\n• Analista Suporte Técnico\n• Gestão de Negócios\n• Desenvolvimento Web\n• E muito mais!\n\nSempre investindo em conhecimento e especialização!",
    suggestions: ["Ver todas as certificações", "Projetos acadêmicos", "Planos de estudo"],
  },

  // Contato
  "contato|contact|email|linkedin": {
    response:
      "📞 Entre em contato com Henrique:\n\n**Email:** henrique.monteiro.cardoso@outlook.com\n**LinkedIn:** henrique-monteiro-cardoso\n**GitHub:** HenriqueMC17\n**Localização:** Sorocaba/SP (Disponível para remoto)\n\nEle está sempre aberto a novas oportunidades e colaborações!",
    suggestions: ["Agendar uma conversa", "Ver portfolio completo", "Projetos em colaboração"],
    links: [
      { text: "LinkedIn", url: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/" },
      { text: "GitHub", url: "https://github.com/HenriqueMC17" },
      { text: "Email", url: "mailto:henrique.monteiro.cardoso@outlook.com" },
    ],
  },

  // Java
  "java|spring|spring boot": {
    response:
      "☕ Henrique tem sólida experiência com Java:\n\n**Safe Finance** - Sistema completo com Spring Boot\n• Arquitetura MVC bem estruturada\n• JPA para persistência de dados\n• Thymeleaf para templates\n• Validação robusta de dados\n\n**Conhecimentos:**\n• Spring Framework (Boot, Security, Data)\n• Hibernate/JPA\n• Maven/Gradle\n• Testes unitários com JUnit\n• API REST com Spring Boot",
    suggestions: ["Ver código no GitHub", "Outros projetos Java", "Certificações Java"],
  },

  // JavaScript/React
  "javascript|react|next|typescript": {
    response:
      "⚛️ Henrique domina o ecossistema JavaScript moderno:\n\n**Frontend Skills:**\n• React com hooks e context\n• Next.js 14 com App Router\n• TypeScript para type safety\n• Tailwind CSS para styling\n• Framer Motion para animações\n\n**Projetos Destacados:**\n• Portfolio com Next.js (98/100 Lighthouse)\n• Componentes reutilizáveis\n• PWA com service workers\n• Integração com APIs",
    suggestions: ["Ver portfolio live", "Projetos React", "Aprender TypeScript"],
  },

  // Oportunidades
  "vaga|oportunidade|trabalho|emprego|hiring": {
    response:
      "🎯 Henrique está aberto a novas oportunidades!\n\n**Procurando por:**\n• Desenvolvedor Full Stack\n• Desenvolvedor Java\n• Desenvolvedor Frontend React\n• Estágio ou Junior\n\n**Modalidade:** Presencial (Sorocaba/SP) ou Remoto\n**Disponibilidade:** Imediata\n**Diferencial:** Proativo, aprende rápido, trabalha bem em equipe\n\nVamos conversar sobre como ele pode contribuir com sua equipe!",
    suggestions: ["Ver currículo completo", "Agendar entrevista", "Projetos relevantes"],
    links: [
      { text: "LinkedIn", url: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/" },
      { text: "Email", url: "mailto:henrique.monteiro.cardoso@outlook.com" },
    ],
  },

  // Default
  default: {
    response:
      "🤔 Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre:\n\n• Habilidades e tecnologias\n• Projetos e portfolio\n• Experiência profissional\n• Formação e certificações\n• Contato e oportunidades\n\nTente reformular sua pergunta ou escolha uma das sugestões!",
    suggestions: ["Quais são suas habilidades?", "Conte sobre seus projetos", "Como posso entrar em contato?"],
  },
}

export function HenriqueBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! 👋 Eu sou o HenriqueBot, assistente virtual do Henrique Monteiro Cardoso. Como posso ajudar você hoje?",
      sender: "bot",
      timestamp: new Date(),
      suggestions: ["Quais são suas habilidades?", "Conte sobre seus projetos", "Como posso entrar em contato?"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findResponse = (input: string): KnowledgeBase[string] => {
    const normalizedInput = input.toLowerCase().trim()

    for (const [keywords, response] of Object.entries(knowledgeBase)) {
      if (keywords === "default") continue

      const keywordList = keywords.split("|")
      if (keywordList.some((keyword) => normalizedInput.includes(keyword))) {
        return response
      }
    }

    return knowledgeBase.default
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular delay de digitação
    setTimeout(
      () => {
        const response = findResponse(content)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: response.response,
          sender: "bot",
          timestamp: new Date(),
          suggestions: response.suggestions,
        }

        setMessages((prev) => [...prev, botMessage])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(inputValue)
    }
  }

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 right-6 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>

        {/* Notification Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ delay: 3, duration: 0.5 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        >
          <Sparkles className="h-3 w-3 text-white" />
        </motion.div>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] z-50 shadow-2xl"
          >
            <Card className="h-full flex flex-col bg-white border-0 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">HenriqueBot</CardTitle>
                      <p className="text-white/80 text-sm">Assistente Virtual</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex items-start gap-2 max-w-[80%] ${
                            message.sender === "user" ? "flex-row-reverse" : "flex-row"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>

                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                            <div
                              className={`text-xs mt-1 ${
                                message.sender === "user" ? "text-blue-100" : "text-gray-500"
                              }`}
                            >
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Suggestions */}
                    {messages.length > 0 && messages[messages.length - 1].suggestions && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2"
                      >
                        {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs rounded-full"
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            {suggestion}
                          </Button>
                        ))}
                      </motion.div>
                    )}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-gray-600" />
                        </div>
                        <div className="bg-gray-100 rounded-2xl px-4 py-2">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua pergunta..."
                      className="flex-1"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isTyping}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-center mt-2">
                    <Badge variant="secondary" className="text-xs">
                      Powered by HenriqueBot AI
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
