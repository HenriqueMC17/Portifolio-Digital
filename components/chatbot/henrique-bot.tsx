"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Minimize2,
  Maximize2,
  Lightbulb,
  Code,
  Briefcase,
  GraduationCap,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "suggestion"
}

interface BotResponse {
  content: string
  suggestions?: string[]
}

// Base de conhecimento do bot
const knowledgeBase = {
  skills: {
    keywords: ["habilidades", "skills", "tecnologias", "linguagens", "programação"],
    response:
      "Minhas principais habilidades incluem:\n\n🔹 **Linguagens**: Java, JavaScript, TypeScript, Python, C++, C#\n🔹 **Frontend**: React, Next.js, HTML5, CSS3, Tailwind CSS\n🔹 **Backend**: Spring Boot, Node.js\n🔹 **Banco de Dados**: PostgreSQL, MySQL, MongoDB\n🔹 **Ferramentas**: Git, Docker, VS Code\n\nTenho 2+ anos de experiência em desenvolvimento e estou sempre aprendendo novas tecnologias!",
    suggestions: ["Ver projetos", "Experiência profissional", "Certificações"],
  },
  projects: {
    keywords: ["projetos", "portfolio", "trabalhos", "desenvolveu", "criou"],
    response:
      "Aqui estão meus principais projetos:\n\n🚀 **Safe Finance** - Sistema de gestão financeira com Java e Spring Boot\n💼 **Portfolio Website** - Site moderno com Next.js e animações avançadas\n📊 **Leand Peage** - Extensão do Safe Finance com recursos de investimento\n\nCada projeto resolve problemas reais e demonstra diferentes aspectos das minhas habilidades técnicas.",
    suggestions: ["Detalhes do Safe Finance", "Como foi feito o portfolio", "Ver código no GitHub"],
  },
  experience: {
    keywords: ["experiência", "trabalho", "emprego", "carreira", "profissional"],
    response:
      "Minha experiência profissional:\n\n🏢 **CCBEU Sorocaba** (2025-atual) - Auxiliar Comercial\n• Gestão de leads no Bitrix\n• Atendimento digital via WhatsApp\n• Melhorias no sistema DKSoft\n\n🏭 **ASSA ABLOY Group** (2024) - Aprendiz Administrativo\n• Suporte em SSMA\n• Gestão de EPIs e treinamentos\n• Reconhecimento por conscientização\n\nSempre focado em melhorar processos e agregar valor!",
    suggestions: ["Certificações", "Formação acadêmica", "Habilidades técnicas"],
  },
  education: {
    keywords: ["educação", "formação", "estudo", "faculdade", "curso"],
    response:
      "Minha formação acadêmica:\n\n🎓 **Centro Universitário Facens** (2025-2027)\n• Análise e Desenvolvimento de Sistemas\n• Foco em desenvolvimento de software\n\n📚 **Certificações Relevantes**:\n• Excel Profissionalizante (2024)\n• Analista em Suporte Técnico (2024)\n• Gestão de Pequenos Negócios (2022)\n• Múltiplas certificações em segurança e TI\n\nSempre investindo em aprendizado contínuo!",
    suggestions: ["Ver todas as certificações", "Projetos acadêmicos", "Habilidades técnicas"],
  },
  contact: {
    keywords: ["contato", "email", "linkedin", "github", "falar"],
    response:
      "Vamos conversar! Você pode me encontrar em:\n\n📧 **Email**: henrique.monteiro.cardoso@outlook.com\n💼 **LinkedIn**: linkedin.com/in/henrique-monteiro-cardoso\n🐙 **GitHub**: github.com/HenriqueMC17\n📱 **WhatsApp**: Disponível via formulário de contato\n\nEstou sempre aberto a novas oportunidades e conversas sobre tecnologia!",
    suggestions: ["Ver portfolio completo", "Projetos recentes", "Disponibilidade"],
  },
  default: {
    response:
      "Olá! 👋 Sou o HenriqueBot, assistente virtual do Henrique Monteiro Cardoso.\n\nPosso te ajudar com informações sobre:\n• Habilidades e tecnologias\n• Projetos e portfolio\n• Experiência profissional\n• Formação e certificações\n• Formas de contato\n\nO que você gostaria de saber?",
    suggestions: ["Minhas habilidades", "Ver projetos", "Experiência profissional", "Como entrar em contato"],
  },
}

export function HenriqueBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem de boas-vindas
      setTimeout(() => {
        addBotMessage(knowledgeBase.default.response, knowledgeBase.default.suggestions)
      }, 500)
    }
  }, [isOpen])

  const addBotMessage = (content: string, suggestions?: string[]) => {
    const botMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, botMessage])

    // Adicionar sugestões se fornecidas
    if (suggestions) {
      setTimeout(() => {
        suggestions.forEach((suggestion, index) => {
          setTimeout(() => {
            const suggestionMessage: Message = {
              id: `${Date.now()}-${index}`,
              content: suggestion,
              sender: "bot",
              timestamp: new Date(),
              type: "suggestion",
            }
            setMessages((prev) => [...prev, suggestionMessage])
          }, index * 200)
        })
      }, 1000)
    }
  }

  const findBestResponse = (input: string): BotResponse => {
    const lowerInput = input.toLowerCase()

    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (key === "default") continue

      const hasKeyword = data.keywords.some((keyword) => lowerInput.includes(keyword.toLowerCase()))

      if (hasKeyword) {
        return {
          content: data.response,
          suggestions: data.suggestions,
        }
      }
    }

    // Respostas específicas para perguntas comuns
    if (lowerInput.includes("quem") && (lowerInput.includes("você") || lowerInput.includes("é"))) {
      return {
        content:
          "Sou o HenriqueBot! 🤖 Sou um assistente virtual criado para representar o Henrique Monteiro Cardoso e ajudar você a conhecer melhor seu perfil profissional, projetos e habilidades.\n\nFui desenvolvido com JavaScript e integrado ao portfolio para oferecer uma experiência interativa única!",
        suggestions: ["Sobre o Henrique", "Ver projetos", "Habilidades técnicas"],
      }
    }

    if (lowerInput.includes("disponível") || lowerInput.includes("vaga") || lowerInput.includes("trabalho")) {
      return {
        content:
          "O Henrique está **DISPONÍVEL** para novas oportunidades! 🚀\n\n• Desenvolvedor Full Stack em formação\n• Experiência em Java, JavaScript, TypeScript\n• Interesse em projetos desafiadores\n• Disponível para trabalho remoto ou presencial em Sorocaba/SP\n\nVamos conversar sobre como ele pode contribuir com seu projeto!",
        suggestions: ["Ver experiência", "Entrar em contato", "Ver projetos"],
      }
    }

    return {
      content:
        "Interessante! 🤔 Não tenho informações específicas sobre isso, mas posso te ajudar com:\n\n• Habilidades e tecnologias do Henrique\n• Projetos e portfolio\n• Experiência profissional\n• Certificações e formação\n• Formas de contato\n\nO que você gostaria de saber?",
      suggestions: ["Minhas habilidades", "Ver projetos", "Experiência profissional"],
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simular delay de digitação
    setTimeout(
      () => {
        const response = findBestResponse(inputValue)
        setIsTyping(false)
        addBotMessage(response.content, response.suggestions)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    handleSendMessage()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            {/* Notification Badge */}
            <div className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "60px" : "500px",
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-96 bg-background border rounded-lg shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Bot className="h-6 w-6" />
                  <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h3 className="font-semibold">HenriqueBot</h3>
                  <p className="text-xs opacity-90">Assistente Virtual</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 p-4 h-80 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "bot" && (
                        <div className="flex items-start gap-2">
                          <Bot className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                          <div className="max-w-xs">
                            {message.type === "suggestion" ? (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSuggestionClick(message.content)}
                                className="text-left h-auto p-2 whitespace-normal"
                              >
                                <Lightbulb className="h-3 w-3 mr-1 flex-shrink-0" />
                                {message.content}
                              </Button>
                            ) : (
                              <div className="bg-muted p-3 rounded-lg">
                                <div className="text-sm whitespace-pre-line">{message.content}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {message.sender === "user" && (
                        <div className="flex items-start gap-2">
                          <div className="max-w-xs">
                            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                              <div className="text-sm">{message.content}</div>
                            </div>
                          </div>
                          <User className="h-6 w-6 text-muted-foreground mt-1 flex-shrink-0" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2">
                        <Bot className="h-6 w-6 text-primary mt-1" />
                        <div className="bg-muted p-3 rounded-lg">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua pergunta..."
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick("Minhas habilidades")}
                      className="text-xs h-6"
                    >
                      <Code className="h-3 w-3 mr-1" />
                      Habilidades
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick("Ver projetos")}
                      className="text-xs h-6"
                    >
                      <Briefcase className="h-3 w-3 mr-1" />
                      Projetos
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSuggestionClick("Experiência profissional")}
                      className="text-xs h-6"
                    >
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Experiência
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
