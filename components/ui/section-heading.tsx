"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

interface SectionHeadingProps {
  title: string
  subtitle: string
  centered?: boolean
}

export function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <div ref={ref} className={`space-y-2 ${centered ? "text-center" : ""}`}>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-muted-foreground"
      >
        {subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={inView ? { opacity: 1, width: centered ? "80px" : "60px" } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`h-1 bg-primary ${centered ? "mx-auto" : ""}`}
      />
    </div>
  )
}
