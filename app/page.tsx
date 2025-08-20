import { ModernHeader } from "@/components/modern-header"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ContributionsSection } from "@/components/sections/contributions-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { EnhancedProjectsSection } from "@/components/sections/enhanced-projects-section"
import { ModernFooter } from "@/components/modern-footer"
import { AnimationProvider } from "@/components/animation-provider"
import { AIHenriqueBot } from "@/components/chatbot/ai-henrique-bot"

export default function Home() {
  return (
    <AnimationProvider>
      <div className="min-h-screen bg-transparent">
        <ModernHeader />

        <main className="relative z-10">
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ExperienceSection />
          <EnhancedProjectsSection />
          <ContributionsSection />
          <CertificationsSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

        <ModernFooter />
        <AIHenriqueBot />
      </div>
    </AnimationProvider>
  )
}
