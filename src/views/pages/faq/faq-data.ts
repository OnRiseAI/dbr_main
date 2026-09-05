// Type Imports
import type { FaqItem } from '@/components/blocks/faq-list'

export type FaqGroup = {

  /** Anchor id used by the sticky index and the in-page links. */
  id: string
  label: string
  items: FaqItem[]
}

/**
 * FAQ content, grouped. Every answer is drawn from the approved company facts:
 * German dispatch, twice-tested lots, CoA in the box, pen and syringe readings,
 * and the two trade routes. Nothing here is invented, and nothing claims
 * temperature-controlled transit.
 */
export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: 'ordering',
    label: 'Ordering and payment',
    items: [
      {
        q: 'Is there a minimum order?',
        a: 'No. There is no minimum order, so a single pen or a single vial is fine. Card checkout at quantity one charges the shop price shown.'
      },
      {
        q: 'How can I pay?',
        a: 'Card (Visa and Mastercard), SEPA bank transfer, or crypto (BTC, ETH and USDT). Pick the method that suits you at checkout. Whichever you use, the order dispatches within 2 business days of payment.'
      },
      {
        q: 'Can I see the Certificate of Analysis before I order?',
        a: 'Yes. Write to research@deepbeautyresearch.com and ask for the CoA on the product you are considering. A CoA also ships with every order, so you get the paperwork either way.'
      },
      {
        q: 'Can I order from outside the EU?',
        a: 'That is handled case by case, so ask before you order. Write to contact@deepbeautyresearch.com with the products and the destination country and you will get a straight answer.'
      },
      {
        q: 'How quickly do you reply?',
        a: 'Within one business day. The office is open Monday to Friday, 09:00 to 17:00 CET, and closed on German public holidays.'
      },
      {
        q: 'Are these products medicines?',
        a: 'No. Deep Beauty Research supplies premium wellness peptides, not medicines, and everything is labelled for research purposes only. We do not give medical advice.'
      }
    ]
  },
  {
    id: 'shipping',
    label: 'Shipping and delivery',
    items: [
      {
        q: 'Where do orders ship from?',
        a: 'From German stock, tracked, in discreet packaging. Every order is dispatched from Germany, trade and direct alike.'
      },
      {
        q: 'How long does an order take?',
        a: 'Orders dispatch within 2 business days of payment. EU delivery is typically 2 to 3 business days after that, and your tracking number follows the dispatch.'
      },
      {
        q: 'My parcel arrived damaged. What happens now?',
        a: 'You get a replacement. Photograph the parcel and the contents as they arrived, then write to orders@deepbeautyresearch.com within 48 hours of delivery. The photographs are what let us replace the order without a back and forth.'
      },
      {
        q: 'Do you deliver outside the EU?',
        a: 'Case by case. Ask before ordering, with the destination country and the products you want, and you will be told whether it can be done.'
      },
      {
        q: 'What should I do with the order when it arrives?',
        a: 'Put it in the fridge. Pens and vials are both stored refrigerated at 2 to 8 C. Your batch documentation is in the box with the product.'
      },
      {
        q: 'Who do I write to about an order in progress?',
        a: 'orders@deepbeautyresearch.com covers existing orders, shipping questions and damaged arrivals. Quote your order number and you will get a reply within one business day.'
      }
    ]
  },
  {
    id: 'pens-and-vials',
    label: 'Pens and vials',
    items: [
      {
        q: 'Do the pens need mixing before use?',
        a: 'No. Pens are ready to use straight from the fridge, with no reconstitution. Take the pen out, attach a needle and dial your amount.'
      },
      {
        q: 'How does the pen dial work?',
        a: 'The dial moves in clicks. One click is 0.0125 ml, and a full turn of the dial is 60 clicks. Count the clicks, or count the turns and the remainder, whichever you find easier.'
      },
      {
        q: 'How do I prepare a vial?',
        a: 'Vials are supplied lyophilised. Add bacteriostatic water, swirl gently until the solution is clear, then draw each amount with an insulin syringe. On that syringe, 1 unit is 0.01 ml.'
      },
      {
        q: 'Should I choose a pen or a vial?',
        a: 'A pen if you want no preparation and a dial that reads in clicks. A vial if you would rather reconstitute yourself with bacteriostatic water and measure in syringe units. The contents are held to the same release standard either way.'
      },
      {
        q: 'How do I store pens and vials?',
        a: 'Refrigerated, at 2 to 8 C. That applies to pens and vials alike, before and after first use.'
      },
      {
        q: 'What is in the range?',
        a: 'Retatrutide as pens (15 mg and 40 mg) and vials (10 mg and 20 mg), GHK-Cu as a 100 mg pen, a 70 mg Skin Glow pen and a 100 mg vial, a MOTS-c 20 mg pen, Melanotan I and II vials at 10 mg, and a Selank 10 mg vial.'
      }
    ]
  },
  {
    id: 'quality',
    label: 'Quality and documentation',
    items: [
      {
        q: 'How is each lot tested?',
        a: 'Twice. Once during manufacture, and then independently by an ISO 17025 accredited third-party laboratory. Release is on those results, and a lot that fails is destroyed.'
      },
      {
        q: 'What purity do you release at?',
        a: 'Greater than 99% by HPLC on every active. Identity is confirmed by mass spectrometry, so you know what is in the pen as well as how much.'
      },
      {
        q: 'Do I get a Certificate of Analysis?',
        a: 'Yes. A CoA ships with every order, and the batch documentation is in the box. You can also request the CoA before you buy, at research@deepbeautyresearch.com.'
      },
      {
        q: 'What happens if a lot fails a test?',
        a: 'It is destroyed. Quality control runs in six steps, and a lot that fails any one of them is never reworked, never discounted and never sold.'
      },
      {
        q: 'Can I trace my order back to its lot?',
        a: 'Yes. The lot ID is printed on the pen and on the outer box, and the full lot record is kept for ten years. Send the lot ID to research@deepbeautyresearch.com and the record can be pulled up.'
      }
    ]
  },
  {
    id: 'trade',
    label: 'Trade and partners',
    items: [
      {
        q: 'Do you supply wholesale?',
        a: 'Yes. Deep Beauty Research has been in the peptide business for seven years and is one of the largest peptide wholesalers in Europe, supplying clinics, shops, resellers and regional distributors. Write to partners@deepbeautyresearch.com with your quantity, region and how often you want to reorder.'
      },
      {
        q: 'What does a trade account need?',
        a: 'Verification before the first shipment. A company email domain is usually enough, or a short note on the business. Terms, volume pricing and recurring supply are settled by email.'
      },
      {
        q: 'What comes with a trade order?',
        a: 'A CoA and lot records routed with every shipment, one named contact rather than a general inbox, and tracked dispatch from Germany. Anything damaged in transit is replaced on the same terms.'
      },
      {
        q: 'How does the referral programme work?',
        a: 'You earn a flat 15% commission on every order from customers you refer, on the first order and on every reorder. The tracking window is 30 days, and you get a unique link and a partner dashboard to watch it.'
      },
      {
        q: 'When do referral partners get paid?',
        a: 'Monthly, by bank transfer (SEPA) or crypto. The minimum payout is EUR 1, so small balances still clear.'
      },
      {
        q: 'How do I apply to be a partner?',
        a: 'Apply at https://app.deepbeautyresearch.com/partners/apply. Applications are reviewed within two weeks, and questions before you apply go to partners@deepbeautyresearch.com.'
      }
    ]
  }
]
