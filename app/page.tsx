import { ModernHeader } from "@/components/modern-header"
import { EnhancedHero } from "@/components/enhanced-hero"
import { AboutSection } from "@/components/sections/about-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContributionsSection } from "@/components/sections/contributions-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ModernFooter } from "@/components/modern-footer"
import { AnalyticsConsent } from "@/components/analytics-consent"
import { Suspense } from "react"
import { AdvancedSkeleton } from "@/components/advanced-animations"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />
      <main>
        <EnhancedHero />
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={5} />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={8} />}>
          <ExperienceSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={6} />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={4} />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={10} />}>
          <CertificationsSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={7} />}>
          <ContributionsSection />
        </Suspense>
        <Suspense fallback={<AdvancedSkeleton className="p-8" lines={5} />}>
          <ContactSection />
        </Suspense>
      </main>
      <ModernFooter />
      <AnalyticsConsent />
    </div>
  )
}
