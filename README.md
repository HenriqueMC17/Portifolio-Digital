# 🚀 Portfólio - Henrique Monteiro Cardoso

![Status do Projeto](https://img.shields.io/badge/status-online-brightgreen)
![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

Um portfólio profissional moderno e responsivo desenvolvido com Next.js, React e Tailwind CSS, apresentando minhas habilidades, experiências e projetos como Desenvolvedor Full Stack.

![Preview do Portfólio](https://placeholder.svg?height=300&width=600)

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Tecnologias](#-tecnologias)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar](#-como-executar)
- [Deploy](#-deploy)
- [Capturas de Tela](#-capturas-de-tela)
- [Contato](#-contato)
- [Licença](#-licença)

## 🌟 Visão Geral

Este portfólio foi desenvolvido para apresentar minha jornada profissional, habilidades técnicas e projetos de forma interativa e visualmente atraente. O site é totalmente responsivo, oferece suporte a múltiplos idiomas (Português e Inglês) e inclui animações suaves para melhorar a experiência do usuário.

## 💻 Tecnologias

### Frontend
- **Next.js 14** - Framework React com renderização do lado do servidor
- **React 19** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações para React
- **TypeScript** - Superset tipado de JavaScript
- **Shadcn/UI** - Componentes de UI reutilizáveis

### Ferramentas e Bibliotecas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Lucide React** - Ícones modernos
- **Next Themes** - Suporte a temas claro/escuro
- **React Intersection Observer** - Detecção de elementos visíveis

## ✨ Funcionalidades

- **Design Responsivo** - Experiência perfeita em dispositivos móveis, tablets e desktops
- **Tema Claro/Escuro** - Alternância entre temas para melhor experiência visual
- **Multilíngue** - Suporte completo para Português e Inglês
- **Animações** - Animações suaves e interativas em toda a interface
- **Formulário de Contato** - Formulário funcional para mensagens diretas
- **Seções Detalhadas**:
  - Hero Section com apresentação pessoal
  - Sobre mim com informações detalhadas
  - Projetos com filtros por categoria
  - Habilidades técnicas organizadas por área
  - Experiência profissional em formato de timeline
  - Certificações e qualificações
  - Estatísticas do GitHub
  - Formulário de contato

## 📁 Estrutura do Projeto

\`\`\`
portfolio-website/
├── app/                  # Rotas e páginas da aplicação
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial
│   ├── globals.css       # Estilos globais
│   └── not-found.tsx     # Página 404
├── components/           # Componentes reutilizáveis
│   ├── sections/         # Seções principais da página
│   ├── ui/               # Componentes de UI (shadcn)
│   └── ...               # Outros componentes
├── contexts/             # Contextos React
│   ├── animation-context.tsx
│   └── language-context.tsx
├── hooks/                # Hooks personalizados
├── lib/                  # Utilitários e funções
├── locales/              # Arquivos de tradução
│   ├── pt-br.ts
│   └── en-us.ts
├── public/               # Arquivos estáticos
└── ...                   # Arquivos de configuração
\`\`\`

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18.x ou superior
- npm ou yarn ou pnpm

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/HenriqueMC17/portfolio-website.git
cd portfolio-website
