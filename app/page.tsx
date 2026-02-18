import { DynamicBackground } from "@/components/dynamic-background"
import { ModernHeader } from "@/components/modern-header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ServicesSection } from "@/components/sections/services-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { MethodologySection } from "@/components/sections/methodology-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { BlogSection } from "@/components/sections/blog-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { NewsletterSection } from "@/components/sections/newsletter-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ModernFooter } from "@/components/modern-footer"
import { AIAssistant } from "@/components/ai-assistant"
import { ScrollProgress } from "@/components/scroll-progress"
import { EasterEggProvider } from "@/components/easter-egg-provider"

export default function Home() {
  return (
    <EasterEggProvider>
      <DynamicBackground />
      <ScrollProgress />
      <ModernHeader />

      <main id="main-content" className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <SkillsSection />
        <MethodologySection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
        <NewsletterSection />
        <ContactSection />
      </main>

      <ModernFooter />
      <AIAssistant />
    </EasterEggProvider>
  )
}
