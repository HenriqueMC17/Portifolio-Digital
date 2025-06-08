"use client"

import { createContext, useContext, type ReactNode } from "react"

interface AnimationContextType {
  pageVariants: any
  containerVariants: any
  itemVariants: any
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
}

const AnimationContext = createContext<AnimationContextType>({
  pageVariants,
  containerVariants,
  itemVariants,
})

export function AnimationProvider({ children }: { children: ReactNode }) {
  return (
    <AnimationContext.Provider value={{ pageVariants, containerVariants, itemVariants }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  return useContext(AnimationContext)
}
