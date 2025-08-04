import { ModernHeader } from "@/components/modern-header"
import { ModernHero } from "@/components/modern-hero"
import { AboutSection } from "@/components/sections/about-section"
import { EnhancedSkillsSection } from "@/components/enhanced-skills-section"
import { EnhancedProjectsSection } from "@/components/sections/enhanced-projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContributionsSection } from "@/components/sections/contributions-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ModernFooter } from "@/components/modern-footer"
import { AIHenriqueBot } from "@/components/chatbot/ai-henrique-bot"
import { ScrollRobot } from "@/components/visual-easter-eggs"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />

      <main className="relative">
        <ModernHero />
        <AboutSection />
        <EnhancedSkillsSection />
        <EnhancedProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
        <TestimonialsSection />
        <ContributionsSection />
        <ContactSection />
      </main>

      <ModernFooter />

      {/* Interactive Components */}
      <AIHenriqueBot />
      <ScrollRobot />
    </div>
  )
}
