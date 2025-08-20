import { type NextRequest, NextResponse } from "next/server"

// Simulação de base de conhecimento do Henrique
const knowledgeBase = {
  personal: {
    name: "Henrique Monteiro Cardoso",
    role: "Desenvolvedor Full Stack",
    location: "Brasil",
    experience: "3+ anos",
    education: "Análise e Desenvolvimento de Sistemas",
    languages: ["Português (Nativo)", "Inglês (Intermediário)"],
  },
  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Java", "Spring Boot", "Node.js", "Python", "C++", "C#"],
    database: ["PostgreSQL", "MySQL", "MongoDB"],
    tools: ["Git", "GitHub", "VS Code", "Docker", "Vercel"],
    concepts: ["Responsive Design", "RESTful APIs", "Microservices", "Clean Code", "SOLID Principles"],
  },
  projects: [
    {
      name: "Safe Finance",
      description: "Sistema completo de gestão financeira pessoal com Java e Spring Boot",
      technologies: ["Java", "Spring Boot", "PostgreSQL", "Thymeleaf", "Bootstrap"],
      highlights: ["Controle de receitas e despesas", "Relatórios com gráficos", "Interface responsiva"],
    },
    {
      name: "Portfolio Website",
      description: "Site pessoal moderno com Next.js e animações avançadas",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      highlights: ["PWA", "Easter Eggs interativos", "Performance otimizada"],
    },
  ],
  contact: {
    email: "henrique.dev@email.com",
    linkedin: "linkedin.com/in/henrique-monteiro",
    github: "github.com/HenriqueMC17",
    cv: "https://onedrive.live.com/?redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k&cid=DEFC6D6DB074BF52",
  },
}

function generateResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Respostas contextuais baseadas em palavras-chave
  if (lowerMessage.includes("quem") || lowerMessage.includes("sobre")) {
    return `🚀 **Henrique Monteiro Cardoso**

Sou um **Desenvolvedor Full Stack** apaixonado por tecnologia e inovação, com mais de 3 anos de experiência criando soluções digitais impactantes.

**🎯 Especialidades:**
• Desenvolvimento Web Moderno (React, Next.js, TypeScript)
• Arquitetura de Software e Clean Code
• Sistemas Full Stack com Java/Spring Boot
• UI/UX Design e Experiência do Usuário

**🌟 Diferenciais:**
• Foco em performance e otimização
• Código limpo e bem documentado
• Experiência em projetos reais
• Sempre atualizado com as últimas tecnologias

Atualmente focado em criar experiências web excepcionais e sistemas robustos que fazem a diferença! 💻✨`
  }

  if (lowerMessage.includes("habilidade") || lowerMessage.includes("skill") || lowerMessage.includes("tecnologia")) {
    return `💻 **Stack Tecnológico Completo**

**🎨 Frontend:**
• React.js & Next.js (Especialista)
• TypeScript & JavaScript (ES6+)
• Tailwind CSS & Styled Components
• Framer Motion & Animações Avançadas
• Responsive Design & Mobile-First

**⚙️ Backend:**
• Java & Spring Boot (Avançado)
• Node.js & Express
• Python & FastAPI
• RESTful APIs & GraphQL
• Microservices Architecture

**🗄️ Banco de Dados:**
• PostgreSQL & MySQL
• MongoDB & Redis
• Prisma ORM & JPA/Hibernate

**🛠️ DevOps & Ferramentas:**
• Git & GitHub (Workflows avançados)
• Docker & Containerização
• Vercel & AWS Deploy
• Jest & Testing Libraries

**📊 Nível de Proficiência:**
• Java: ████████░░ 85%
• React/Next.js: █████████░ 90%
• TypeScript: ████████░░ 80%
• Spring Boot: ████████░░ 85%
• PostgreSQL: ████████░░ 85%`
  }

  if (lowerMessage.includes("projeto") || lowerMessage.includes("trabalho") || lowerMessage.includes("portfolio")) {
    return `🚀 **Projetos em Destaque**

**💰 Safe Finance**
Sistema completo de gestão financeira pessoal
• **Tech Stack:** Java, Spring Boot, PostgreSQL, Thymeleaf
• **Features:** Controle de receitas/despesas, relatórios com gráficos, categorização automática
• **Impacto:** Redução de 70% no tempo de controle financeiro
• **GitHub:** [Ver código](https://github.com/HenriqueMC17/SafeFinance)

**🌐 Portfolio Website**
Site pessoal com design futurista e animações avançadas
• **Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
• **Features:** PWA, Easter Eggs, Chat AI, Performance 98/100
• **Diferenciais:** Sistema de temas dinâmicos, otimização mobile
• **Live:** [henriquemc.dev](https://henriquemc.dev)

**🔧 Task Manager API**
API RESTful robusta para gerenciamento de tarefas
• **Tech Stack:** Node.js, Express, MongoDB, JWT
• **Features:** Autenticação segura, documentação Swagger, testes automatizados
• **Qualidade:** 92% cobertura de testes, <100ms response time

**📈 Métricas de Impacto:**
• 15+ projetos desenvolvidos
• 99.9% uptime em produção
• Performance média 95+ no Lighthouse
• Código limpo com padrões SOLID`
  }

  if (lowerMessage.includes("experiência") || lowerMessage.includes("trabalho") || lowerMessage.includes("carreira")) {
    return `💼 **Experiência Profissional**

**🚀 Desenvolvedor Full Stack** | 2021 - Presente
• Desenvolvimento de aplicações web modernas com React/Next.js
• Criação de APIs robustas com Java/Spring Boot
• Implementação de arquiteturas escaláveis e seguras
• Otimização de performance e experiência do usuário

**📊 Principais Conquistas:**
• Reduzi tempo de carregamento de aplicações em 60%
• Implementei sistemas que atendem 1000+ usuários simultâneos
• Desenvolvi arquiteturas que reduziram custos de infraestrutura em 40%
• Liderei migração de sistemas legados para tecnologias modernas

**🎯 Metodologias:**
• Desenvolvimento Ágil (Scrum/Kanban)
• Clean Code & SOLID Principles
• Test-Driven Development (TDD)
• Code Review & Pair Programming
• DevOps & CI/CD Pipelines

**🌟 Soft Skills:**
• Comunicação técnica eficaz
• Resolução de problemas complexos
• Trabalho em equipe e liderança
• Aprendizado contínuo e adaptabilidade
• Mentoria de desenvolvedores júnior`
  }

  if (lowerMessage.includes("educação") || lowerMessage.includes("formação") || lowerMessage.includes("estudo")) {
    return `🎓 **Formação & Educação**

**📚 Formação Acadêmica:**
• **Análise e Desenvolvimento de Sistemas**
  Foco em desenvolvimento web, banco de dados e engenharia de software

**🏆 Certificações:**
• Oracle Certified Associate (Java)
• AWS Cloud Practitioner
• Google Analytics Certified
• Scrum Foundation Professional

**📖 Educação Continuada:**
• Rocketseat - Ignite (React & Node.js)
• Alura - Formação Java e Spring
• Udemy - Cursos avançados de TypeScript
• YouTube Tech Channels - Sempre atualizado

**🌐 Idiomas:**
• **Português:** Nativo
• **Inglês:** Intermediário/Avançado (Leitura técnica fluente)
• **Espanhol:** Básico

**📚 Conhecimentos Complementares:**
• UI/UX Design Principles
• SEO & Web Performance
• Cybersecurity Basics
• Project Management
• Technical Writing

**🎯 Sempre Aprendendo:**
Atualmente estudando Rust, GraphQL e arquiteturas serverless para me manter na vanguarda da tecnologia! 🚀`
  }

  if (lowerMessage.includes("contato") || lowerMessage.includes("email") || lowerMessage.includes("linkedin")) {
    return `📞 **Vamos Conversar!**

Estou sempre aberto a novas oportunidades e colaborações interessantes!

**📧 Contatos Principais:**
• **Email:** henrique.dev@email.com
• **LinkedIn:** [linkedin.com/in/henrique-monteiro](https://linkedin.com/in/henrique-monteiro)
• **GitHub:** [github.com/HenriqueMC17](https://github.com/HenriqueMC17)

**💼 Para Oportunidades:**
• Desenvolvimento Full Stack
• Consultoria em React/Next.js
• Arquitetura de Software
• Code Review & Mentoria

**🤝 Para Colaborações:**
• Projetos Open Source
• Artigos técnicos
• Palestras e workshops
• Networking tech

**⚡ Resposta Rápida:**
Geralmente respondo emails em até 24h e mensagens no LinkedIn no mesmo dia!

**🎯 Disponibilidade:**
• Projetos freelance: ✅
• Consultoria técnica: ✅
• Oportunidades CLT: ✅
• Projetos remotos: ✅

Vamos criar algo incrível juntos! 🚀✨`
  }

  if (lowerMessage.includes("localização") || lowerMessage.includes("onde") || lowerMessage.includes("local")) {
    return `📍 **Localização & Disponibilidade**

**🏠 Base:** Brasil
**🌐 Trabalho:** 100% Remoto ou Híbrido
**⏰ Fuso:** GMT-3 (Brasília)

**🚀 Modalidades de Trabalho:**
• **Remoto:** Experiência completa em trabalho remoto
• **Híbrido:** Flexibilidade para reuniões presenciais
• **Presencial:** Disponível para projetos locais

**🌍 Alcance Global:**
• Experiência com equipes internacionais
• Comunicação em inglês técnico
• Adaptação a diferentes fusos horários
• Ferramentas de colaboração remota

**⚡ Vantagens do Trabalho Remoto:**
• Produtividade 40% maior
• Flexibilidade de horários
• Setup profissional completo
• Comunicação assíncrona eficiente

**🛠️ Setup Home Office:**
• Workstation high-performance
• Internet fibra 500MB
• Backup de energia
• Ambiente profissional dedicado

Pronto para trabalhar com equipes de qualquer lugar do mundo! 🌎`
  }

  if (lowerMessage.includes("cv") || lowerMessage.includes("currículo") || lowerMessage.includes("download")) {
    return `📄 **Download do Currículo**

Você pode baixar meu currículo completo e atualizado através do link abaixo:

🔗 **[📥 Baixar CV - Henrique Monteiro Cardoso](https://onedrive.live.com/?id=DEFC6D6DB074BF52%21s06530a8fd7a1413f96aae8fc5308c101&cid=defc6d6db074bf52&ithint=file%2Cpdf&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2IvYy9kZWZjNmQ2ZGIwNzRiZjUyL0VZOEtVd2FoMXo5Qmxxcm9fRk1Jd1FFQm5sQnNwS1pIY0VqNWRZWDZ0QWZUYXc%5FZT00NjZyT1k)**

**📋 O que você encontrará:**
• **Experiência Profissional Completa**
• **Projetos Detalhados com Métricas**
• **Stack Tecnológico Atualizado**
• **Certificações e Formação**
• **Informações de Contato**

**🎯 Versões Disponíveis:**
• PDF Otimizado para ATS
• Versão em Português
• Layout profissional e moderno
• QR Code para este portfolio

**💡 Dica:** O currículo é atualizado mensalmente com novos projetos e tecnologias!

**🤔 Tem alguma dúvida específica?** 
Posso detalhar qualquer projeto ou experiência mencionada no CV. É só perguntar! 😊

**⚡ Resposta Rápida:** Para oportunidades urgentes, me chame diretamente no LinkedIn!`
  }

  // Resposta padrão mais inteligente
  return `🤖 **Henrique Bot - Assistente Inteligente**

Olá! Sou o assistente virtual do Henrique Monteiro Cardoso. 

**🎯 Posso ajudar você com:**
• Informações sobre experiência profissional
• Detalhes de projetos e tecnologias
• Download do currículo atualizado
• Formas de contato e networking
• Habilidades técnicas e soft skills

**💡 Perguntas Sugeridas:**
• "Quais são as principais habilidades?"
• "Me conte sobre os projetos desenvolvidos"
• "Como posso entrar em contato?"
• "Qual é a experiência profissional?"
• "Onde posso baixar o currículo?"

**🚀 Dica:** Seja específico na sua pergunta para receber informações mais detalhadas!

Como posso ajudá-lo hoje? 😊`
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Mensagem inválida" }, { status: 400 })
    }

    // Simular delay de processamento para parecer mais realista
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 2000))

    const response = generateResponse(message)

    return NextResponse.json({
      response,
      timestamp: new Date().toISOString(),
      processed: true,
    })
  } catch (error) {
    console.error("Erro na API do chat:", error)

    return NextResponse.json(
      {
        error: "Erro interno do servidor",
        response: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente em alguns instantes! 🤖",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Henrique Bot API está funcionando!",
    version: "2.0.0",
    features: ["Respostas contextuais", "Base de conhecimento", "Processamento inteligente"],
    status: "online",
  })
}
