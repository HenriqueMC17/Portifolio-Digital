import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

const requiredPaths = [
  "app/page.tsx",
  "app/layout.tsx",
  "components/modern-header.tsx",
  "components/modern-footer.tsx",
  "components/sections/hero-section.tsx",
  "components/sections/about-section.tsx",
  "components/sections/projects-section.tsx",
  "components/sections/contact-section.tsx",
  "README.md",
]

const missing = requiredPaths.filter((p) => !fs.existsSync(path.join(root, p)))
if (missing.length > 0) {
  console.error("Missing required paths:")
  missing.forEach((p) => console.error(`- ${p}`))
  process.exit(1)
}

const page = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8")
const modernFooterOccurrences = (page.match(/<ModernFooter\s*\/?\s*>/g) || []).length
if (modernFooterOccurrences !== 1) {
  console.error(`Expected exactly one <ModernFooter /> in app/page.tsx, found ${modernFooterOccurrences}`)
  process.exit(1)
}

const header = fs.readFileSync(path.join(root, "components/modern-header.tsx"), "utf8")
const footer = fs.readFileSync(path.join(root, "components/modern-footer.tsx"), "utf8")
const sectionIds = Array.from(page.matchAll(/<([A-Z][A-Za-z0-9]*)\s*\/>/g)).map((m) => m[1])

const requiredAnchors = ["#hero", "#about", "#services", "#projects", "#testimonials", "#blog", "#contact"]
const missingHeaderAnchors = requiredAnchors.filter((anchor) => !header.includes(`href: \"${anchor}\"`) && !header.includes(`href=\"${anchor}\"`))
if (missingHeaderAnchors.length > 0) {
  console.error("Missing navigation anchors in header:")
  missingHeaderAnchors.forEach((a) => console.error(`- ${a}`))
  process.exit(1)
}

const missingFooterAnchors = ["#hero", "#about", "#projects", "#blog", "#contact"].filter(
  (anchor) => !footer.includes(`href: \"${anchor}\"`) && !footer.includes(`href=\"${anchor}\"`),
)
if (missingFooterAnchors.length > 0) {
  console.error("Missing navigation anchors in footer:")
  missingFooterAnchors.forEach((a) => console.error(`- ${a}`))
  process.exit(1)
}

const sectionFiles = fs.readdirSync(path.join(root, "components/sections")).filter((f) => f.endsWith(".tsx"))
const duplicateNames = sectionFiles.filter((f, i) => sectionFiles.indexOf(f) !== i)
if (duplicateNames.length > 0) {
  console.error("Duplicate section filenames found:", duplicateNames)
  process.exit(1)
}

console.log("Portfolio audit passed")
console.log(`Sections referenced in app/page.tsx: ${sectionIds.join(", ")}`)
console.log("Modern footer rendered exactly once")
