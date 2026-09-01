export type FaqItem = {
  question: string
  answer: string
}

export type FaqCategory = {
  value: string
  label: string
  icon: string
  heading: string
  items: FaqItem[]
}
