import { type NextRequest, NextResponse } from "next/server"

// Base de conhecimento sobre Henrique
const knowledgeBase = {
  personal: {
    name: "Henrique Monteiro Cardoso",
    role: "Desenvolvedor Full Stack",
    location: "Sorocaba, São Paulo, Brasil",
    email: "henriquemon17@gmail.com",
    phone: "+55 15 98802-7261",
    linkedin: "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/",
    github: "https://github.com/HenriqueMC17",
  },

  },

  skills: {
    backend: ["Java", "Spring Boot", "Node.js", "Python", "PostgreSQL", "MySQL"],
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS"],
    tools: ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
    languages: ["Português (Nativo)", "Inglês (Avançado)", "Espanhol (Intermediário)"],
  },

  projects: {
    safeFinance: {
      name: "Safe Finance",
      description: "Sistema completo de gestão financeira pessoal com dashboard interativo",
      tech: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      features: ["Controle de gastos", "Relatórios", "Metas financeiras", "Dashboard responsivo"],
    },
    portfolio: {
      name: "Portfolio Interativo",
      description: "Portfolio pessoal com design moderno e funcionalidades avançadas",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      features: ["PWA", "Easter eggs", "Chatbot AI", "Modo apresentação"],
    },
    taskManager: {
      name: "Task Manager API",
      description: "API RESTful para gerenciamento de tarefas com autenticação JWT",
      tech: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
      features: ["CRUD completo", "Autenticação", "Documentação Swagger"],
    },
  },
}

// Sistema de respostas inteligentes
function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Saudações
  if (lowerMessage.includes("olá") || lowerMessage.includes("oi") || lowerMessage.includes("hello")) {
    return `Olá! 👋 Eu sou o assistente virtual do Henrique Monteiro Cardoso. Sou desenvolvedor Full Stack especializado em Java, React e tecnologias modernas. Como posso ajudá-lo hoje?`
  }

  // Sobre Henrique
  if (lowerMessage.includes("quem é") || lowerMessage.includes("sobre") || lowerMessage.includes("apresente")) {
    return `Sou Henrique Monteiro Cardoso, desenvolvedor Full Stack de 18 anos, atualmente trabalhando no CCBEU Sorocaba. Tenho experiência com Java Spring Boot, React, Next.js e PostgreSQL. Estou cursando Engenharia de Computação na Facens e sempre em busca de novos desafios tecnológicos! 🚀`
  }

  // Habilidades técnicas
  if (lowerMessage.includes("habilidade") || lowerMessage.includes("skill") || lowerMessage.includes("tecnologia")) {
    return `Minhas principais habilidades incluem:
    
🔧 **Backend:** Java, Spring Boot, Node.js, Python, PostgreSQL, MySQL
🎨 **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS
🛠️ **Ferramentas:** Git, Docker, AWS, Vercel, Figma
🌐 **Idiomas:** Português (nativo), Inglês (avançado), Espanhol (intermediário)

Estou sempre aprendendo novas tecnologias para me manter atualizado!`
  }

  // Experiência profissional
  if (lowerMessage.includes("experiência") || lowerMessage.includes("trabalho") || lowerMessage.includes("empresa")) {
    return `Minha experiência profissional:

🏢 **CCBEU Sorocaba** (2024 - Atual)
Desenvolvedor Full Stack - Desenvolvimento de sistemas web com Java Spring Boot, React e PostgreSQL

🏭 **ASSA ABLOY** (2023 - 2024)
Estagiário de TI - Suporte técnico, automações e manutenção de sistemas

Sempre focado em entregar soluções de qualidade e aprender com cada projeto!`
  }

  // Projetos
  if (lowerMessage.includes("projeto") || lowerMessage.includes("portfólio") || lowerMessage.includes("trabalhos")) {
    return `Alguns dos meus principais projetos:

💰 **Safe Finance**
Sistema completo de gestão financeira com React, Node.js e PostgreSQL. Dashboard interativo para controle de gastos e metas.

🌐 **Portfolio Interativo**
Este próprio site! Desenvolvido com Next.js, TypeScript e Tailwind CSS. Inclui PWA, easter eggs e chatbot AI.

📋 **Task Manager API**
API RESTful em Java Spring Boot com autenticação JWT e documentação Swagger completa.

Todos os projetos estão disponíveis no meu GitHub!`
  }

  // Contato
  if (lowerMessage.includes("contato") || lowerMessage.includes("email") || lowerMessage.includes("telefone")) {
    return `Você pode entrar em contato comigo através de:

📧 **Email:** henriquemon17@gmail.com
📱 **Telefone:** +55 15 98802-7261
💼 **LinkedIn:** linkedin.com/in/henrique-monteiro-cardoso-ba3716229/
🐙 **GitHub:** github.com/HenriqueMC17

Estou sempre aberto a novas oportunidades e colaborações!`
  }

  // Disponibilidade
  if (lowerMessage.includes("disponível") || lowerMessage.includes("vaga") || lowerMessage.includes("oportunidade")) {
    return `Sim, estou sempre aberto a novas oportunidades! 🚀

Atualmente trabalho no CCBEU Sorocaba, mas estou interessado em:
- Projetos desafiadores em desenvolvimento Full Stack
- Oportunidades de crescimento profissional
- Colaborações em projetos inovadores
- Freelances interessantes

Entre em contato para conversarmos sobre como posso contribuir com seu projeto!`
  }

  // Formação
  if (lowerMessage.includes("formação") || lowerMessage.includes("estudo") || lowerMessage.includes("faculdade")) {
    return `Minha formação acadêmica:

🎓 **Engenharia de Computação**
Centro Universitário Facens (2022 - 2026)
Atualmente no 6º semestre, com foco em desenvolvimento de software e tecnologias emergentes.

Sempre complementando os estudos com cursos online, certificações e projetos práticos para me manter atualizado com as últimas tendências do mercado!`
  }

  // Java específico
  if (lowerMessage.includes("java") || lowerMessage.includes("spring")) {
    return `Java é uma das minhas principais especialidades! ☕

Tenho experiência sólida com:
- **Java 11+** - Programação orientada a objetos
- **Spring Boot** - APIs RESTful, segurança, JPA
- **Spring Security** - Autenticação e autorização
- **JPA/Hibernate** - Mapeamento objeto-relacional
- **Maven/Gradle** - Gerenciamento de dependências

Uso Java principalmente para desenvolvimento de APIs robustas e sistemas backend escaláveis!`
  }

  // React/Frontend
  if (lowerMessage.includes("react") || lowerMessage.includes("frontend") || lowerMessage.includes("next")) {
    return `Sou apaixonado por desenvolvimento frontend! ⚛️

Minhas especialidades incluem:
- **React** - Hooks, Context API, componentes funcionais
- **Next.js** - SSR, SSG, App Router, otimizações
- **TypeScript** - Tipagem estática para maior robustez
- **Tailwind CSS** - Design system e responsividade
- **Framer Motion** - Animações fluidas e interativas

Foco sempre em criar interfaces modernas, acessíveis e com excelente UX!`
  }

  // Currículo
  if (lowerMessage.includes("currículo") || lowerMessage.includes("cv") || lowerMessage.includes("baixar")) {
    return `Você pode baixar meu currículo completo clicando no botão "Baixar CV" no header do site, ou através deste link direto:

📄 **Download do Currículo:** [Clique aqui para baixar](https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k&cid=DEFC6D6DB074BF52&id=DEFC6D6DB074BF52%21s06530a8fd7a1413f96aae8fc5308c101&parId=DEFC6D6DB074BF52%21sd11ecb22e073453eaa45bf1f2f3f921a&o=OneUp)

O currículo contém todas as informações detalhadas sobre minha experiência, projetos e habilidades técnicas!`
  }

  // Resposta padrão
  return `Interessante pergunta! 🤔 

Sou Henrique Monteiro Cardoso, desenvolvedor Full Stack especializado em Java e React. Posso falar sobre:

- 💼 Minha experiência profissional
- 🛠️ Habilidades técnicas (Java, React, Next.js, etc.)
- 🚀 Projetos desenvolvidos
- 📚 Formação acadêmica
- 📞 Informações de contato
- 💼 Disponibilidade para oportunidades

O que gostaria de saber especificamente? Estou aqui para ajudar!`
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Mensagem é obrigatória" }, { status: 400 })
    }

    // Simular delay de processamento para parecer mais natural
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000))

    const response = generateResponse(message)

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Erro no chat:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}
