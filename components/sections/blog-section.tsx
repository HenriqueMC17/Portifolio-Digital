"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export function BlogSection() {
  const { language } = useLanguage()

  const content = {
    pt: {
      title: "Blog",
      subtitle: "Compartilhando conhecimento e experiências",
      posts: [
        {
          title: "Como implementar IA em aplicações web",
          description: "Um guia completo para integrar inteligência artificial em seus projetos",
          date: "15 Jan 2024",
          readTime: "5 min",
          tags: ["IA", "Web Development"],
        },
        {
          title: "Next.js 14: O que há de novo",
          description: "Explorando as novidades e melhorias da versão mais recente do Next.js",
          date: "10 Jan 2024",
          readTime: "8 min",
          tags: ["Next.js", "React"],
        },
        {
          title: "Performance em aplicações React",
          description: "Técnicas avançadas para otimizar suas aplicações React",
          date: "5 Jan 2024",
          readTime: "10 min",
          tags: ["React", "Performance"],
        },
      ],
      readMore: "Ler mais",
    },
    en: {
      title: "Blog",
      subtitle: "Sharing knowledge and experiences",
      posts: [
        {
          title: "How to implement AI in web applications",
          description: "A complete guide to integrate artificial intelligence in your projects",
          date: "Jan 15, 2024",
          readTime: "5 min",
          tags: ["AI", "Web Development"],
        },
        {
          title: "Next.js 14: What's new",
          description: "Exploring the news and improvements of the latest Next.js version",
          date: "Jan 10, 2024",
          readTime: "8 min",
          tags: ["Next.js", "React"],
        },
        {
          title: "Performance in React applications",
          description: "Advanced techniques to optimize your React applications",
          date: "Jan 5, 2024",
          readTime: "10 min",
          tags: ["React", "Performance"],
        },
      ],
      readMore: "Read more",
    },
  }

  const t = content[language]

  return (
    <section id="blog" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text mb-4">{t.title}</h2>
          <p className="text-center text-muted-foreground mb-12">{t.subtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.posts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    {t.readMore}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
