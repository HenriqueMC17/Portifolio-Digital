"use client"

import Head from "next/head"
import { usePathname } from "next/navigation"

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  type?: string
  noindex?: boolean
}

export function SEOHead({
  title = "Henrique Monteiro Cardoso - Desenvolvedor Full Stack",
  description = "Desenvolvedor Full Stack especializado em Java, JavaScript, TypeScript, Python. Criando soluções inovadoras e funcionais com foco em performance e experiência do usuário.",
  image = "/og-image.png",
  type = "website",
  noindex = false,
}: SEOHeadProps) {
  const pathname = usePathname()
  const url = `https://henriquemc.dev${pathname}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Henrique Monteiro Cardoso",
    jobTitle: "Desenvolvedor Full Stack",
    description,
    url: "https://henriquemc.dev",
    image: `https://henriquemc.dev${image}`,
    sameAs: ["https://github.com/HenriqueMC17", "https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/"],
    knowsAbout: ["JavaScript", "TypeScript", "Java", "Python", "React", "Node.js", "Next.js", "Full Stack Development"],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Centro Universitário Facens",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sorocaba",
      addressRegion: "São Paulo",
      addressCountry: "BR",
    },
    email: "henriquemon17@gmail.com",
    telephone: "+5515988027261",
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="theme-color" content="#10b981" />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://henriquemc.dev${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Henrique MC Portfolio" />
      <meta property="og:locale" content="pt_BR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://henriquemc.dev${image}`} />

      {/* Additional Meta Tags */}
      <meta name="author" content="Henrique Monteiro Cardoso" />
      <meta name="creator" content="Henrique Monteiro Cardoso" />
      <meta name="publisher" content="Henrique Monteiro Cardoso" />
      <meta name="language" content="pt-BR" />
      <meta name="geo.region" content="BR-SP" />
      <meta name="geo.placename" content="Sorocaba" />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.github.com" />

      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//api.github.com" />

      {/* Preload Critical Resources */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  )
}
