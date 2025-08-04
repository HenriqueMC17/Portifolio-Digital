import { ModernHeader } from "@/components/modern-header"
import { ModernHero } from "@/components/modern-hero"
import { AboutSection } from "@/components/sections/about-section"
import { EnhancedSkillsSection } from "@/components/enhanced-skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { EnhancedProjectsSection } from "@/components/sections/enhanced-projects-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContributionsSection } from "@/components/sections/contributions-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ModernFooter } from "@/components/modern-footer"
import { AnimationProvider } from "@/components/animation-provider"
import { PerformanceProvider } from "@/components/performance-provider"
import { AnalyticsProvider } from "@/components/analytics-provider"
import { EasterEggProvider } from "@/components/easter-egg-provider"
import { AccessibilityImprovements } from "@/components/accessibility-improvements"
import { VisualEasterEggs } from "@/components/visual-easter-eggs"
import { PWAInstaller } from "@/components/pwa-installer"
import { AnalyticsConsent } from "@/components/analytics-consent"

export default function Home() {
  return (
    <PerformanceProvider>
      <AnalyticsProvider>
        <AnimationProvider>
          <EasterEggProvider>
            <div className="min-h-screen bg-background text-foreground">
              <ModernHeader />

              <main id="main-content" className="relative">
                <ModernHero />
                <AboutSection />
                <EnhancedSkillsSection />
                <ExperienceSection />
                <EnhancedProjectsSection />
                <TestimonialsSection />
                <ContributionsSection />
                <CertificationsSection />
                <ContactSection />
              </main>

              <ModernFooter />

              {/* Enhanced Features */}
              <AccessibilityImprovements />
              <VisualEasterEggs />
              <PWAInstaller />
              <AnalyticsConsent />
            </div>
          </EasterEggProvider>
        </AnimationProvider>
      </AnalyticsProvider>
    </PerformanceProvider>
  )
}
