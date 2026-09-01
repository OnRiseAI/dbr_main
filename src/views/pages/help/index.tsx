// Type Imports
import type { HelpTopic, HelpFaqItem } from '@/types/help'

// Component Imports
import HelpHero from './help-hero'
import HelpTopics from './help-topics'
import HelpFaq from './help-faq'
import HelpCta from './help-cta'

type HelpViewProps = {
  helpTopics: HelpTopic[]
  helpFaqs: HelpFaqItem[]
}

const HelpView = ({ helpTopics, helpFaqs }: HelpViewProps) => {
  return (
    <>
      <HelpHero />
      <HelpTopics helpTopics={helpTopics} />
      <HelpCta />
      <HelpFaq helpFaqs={helpFaqs} />
    </>
  )
}

export { HelpView }
export default HelpView
