import type React from "react"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ScrollToTop } from "@/components/scroll-to-top"
import { GitHubStats } from "@/components/github-stats"

const SkillTagComponent = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-2 py-1 bg-zinc-800 rounded-full text-xs font-medium text-zinc-400">{children}</div>
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <GitHubStats />
      <ExperienceSection />
      <CertificationsSection />
      <ContactSection />
      <ScrollToTop />
    </>
  )
}
