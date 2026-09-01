import type { LucideIcon } from 'lucide-react'

export type HelpTopic = {
  icon: LucideIcon
  title: string
  description: string
  href: string
}

export type HelpFaqItem = {
  question: string
  answer: string
}
