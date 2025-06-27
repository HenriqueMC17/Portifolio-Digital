"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, MapPin, Calendar, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/components/language-provider"
import { usePerformance } from "@/components/performance-provider"
import { GitHubStats } from "@/components/github-stats"
import {
  TypewriterText,
  FloatingParticles,
  MagneticHover,
  AnimatedGradientText,
  MorphingShape,
} from "@/components/advanced-animations"

const techStack = ["Java", "JavaScript", "TypeScript", "Python", "React", "Node.js", "Spring Boot", "PostgreSQL"]

export function EnhancedHero() {
  const { t } = useLanguage()
  const { enableAnimations } = usePerformance()
  const [mounted, setMounted] = useState(false)
  const { scrollY } = useScroll()

  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-1/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />

      {/* Floating Particles - Responsive count */}
      {enableAnimations && <FloatingParticles count={Math.max(5, Math.min(15, Math.floor(window.innerWidth / 100)))} />}

      {/* Morphing Shape - Hide on mobile */}
      {enableAnimations && (
        <motion.div style={{ y: y1 }} className="absolute top-20 right-20 opacity-10 hidden md:block">
          <MorphingShape />
        </motion.div>
      )}

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 md:space-y-8 max-w-4xl mx-auto"
        >
          {/* Status Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <MagneticHover strength={0.2}>
              <Badge
                variant="outline"
                className="glass px-3 py-2 md:px-4 text-xs md:text-sm font-medium hover:scale-105 transition-transform"
              >
                <motion.div
                  className="w-2 h-2 bg-green-500 rounded-full mr-2"
                  animate={enableAnimations ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                {t("hero.availability")}
              </Badge>
            </MagneticHover>
          </motion.div>

          {/* Main Title with Responsive Classes */}
          <motion.div variants={itemVariants} className="space-y-2 md:space-y-4">
            <h1 className="hero-title text-responsive-4xl md:text-responsive-5xl lg:text-responsive-6xl font-bold tracking-tight">
              <motion.span
                className="block"
                whileHover={enableAnimations ? { scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {enableAnimations ? <TypewriterText text="Henrique" delay={500} speed={100} /> : "Henrique"}
              </motion.span>
              <motion.span
                className="block"
                whileHover={enableAnimations ? { scale: 1.05 } : {}}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AnimatedGradientText>Monteiro Cardoso</AnimatedGradientText>
              </motion.span>
            </h1>
            <motion.p
              className="hero-subtitle text-responsive-lg md:text-responsive-xl lg:text-responsive-2xl text-primary font-semibold"
              whileHover={enableAnimations ? { scale: 1.02 } : {}}
            >
              {enableAnimations ? <TypewriterText text={t("hero.title")} delay={2000} speed={80} /> : t("hero.title")}
            </motion.p>
          </motion.div>

          {/* Subtitle - Responsive */}
          <motion.p
            variants={itemVariants}
            className="text-responsive-base md:text-responsive-lg lg:text-responsive-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4"
          >
            {t("hero.subtitle")}
          </motion.p>

          {/* Location & Experience - Stack on mobile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground"
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={enableAnimations ? { scale: 1.05, color: "hsl(var(--primary))" } : {}}
            >
              <MapPin className="h-4 w-4" />
              {t("hero.location")}
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={enableAnimations ? { scale: 1.05, color: "hsl(var(--primary))" } : {}}
            >
              <Calendar className="h-4 w-4" />
              3+ anos de experiência
            </motion.div>
          </motion.div>

          {/* Tech Stack - Responsive grid */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto px-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  delay: 3 + index * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={
                  enableAnimations
                    ? {
                        scale: 1.1,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.3 },
                      }
                    : {}
                }
              >
                <MagneticHover strength={0.1}>
                  <Badge variant="secondary" className="text-xs font-mono cursor-pointer">
                    {tech}
                  </Badge>
                </MagneticHover>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons - Stack on mobile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <MagneticHover strength={0.2}>
              <Button size="lg" className="group relative overflow-hidden w-full sm:w-auto" asChild>
                <motion.a
                  href="#contact"
                  whileHover={enableAnimations ? { scale: 1.05 } : {}}
                  whileTap={enableAnimations ? { scale: 0.95 } : {}}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-chart-1/20"
                    initial={{ x: "-100%" }}
                    whileHover={enableAnimations ? { x: "100%" } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  {t("hero.cta.contact")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
              </Button>
            </MagneticHover>

            <MagneticHover strength={0.2}>
              <Button
                size="lg"
                variant="outline"
                className="group relative overflow-hidden w-full sm:w-auto bg-transparent"
                asChild
              >
                <motion.a
                  href="#projects"
                  whileHover={enableAnimations ? { scale: 1.05 } : {}}
                  whileTap={enableAnimations ? { scale: 0.95 } : {}}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-muted/20 to-muted/40"
                    initial={{ x: "-100%" }}
                    whileHover={enableAnimations ? { x: "100%" } : {}}
                    transition={{ duration: 0.6 }}
                  />
                  {t("hero.cta.projects")}
                  <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </motion.a>
              </Button>
            </MagneticHover>
          </motion.div>

          {/* GitHub Stats Preview - Responsive */}
          <motion.div
            variants={itemVariants}
            className="pt-6 md:pt-8 max-w-md mx-auto px-4"
            whileHover={enableAnimations ? { scale: 1.02 } : {}}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <GitHubStats />
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator - Hide on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={enableAnimations ? { y: [0, 10, 0] } : {}}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center cursor-pointer"
            whileHover={enableAnimations ? { scale: 1.1 } : {}}
            onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
          >
            <motion.div
              animate={enableAnimations ? { y: [0, 12, 0] } : {}}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
