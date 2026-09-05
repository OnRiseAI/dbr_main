# Company pages spec: About, FAQ, Contact, Distributors

Storefront: `D:\Projects\onrise-web` (Next.js 16 App Router, Tailwind v4, shadcn primitives). Brand: Deep Beauty Research. Never mention Norex, NorexBio, pep_dash or dtspharmacy anywhere.

## Routes

Dedicated routes under `src/app/(marketing)/`:

| Page | Route | View file |
|---|---|---|
| About | `/about` | `src/views/pages/about/index.tsx` |
| FAQ | `/faq` | `src/views/pages/faq/index.tsx` |
| Contact | `/contact` | `src/views/pages/contact/index.tsx` |
| Distributors | `/distributors` | `src/views/pages/distributors/index.tsx` |

Each `page.tsx` exports `metadata` via `generateMetadata` from `@/lib/seo` (`{ title, description, url }`) and renders the view. Views are server components unless they need state. Wrap content in `ContentLayout` from `@/components/layout/content-layout`.

## Visual system (locked, do not drift)

Same system as the grid calculator (`src/components/blocks/product-grid-calculator.tsx`) and shop filters (`src/views/pages/shop/shop-filters.tsx`):

- White canvas. Section bands: `bg-muted` for a secondary band, `bg-neutral-950 text-white` for one statement band per page at most. No gradients, glows, shadows, cream or olive canvases, no icon pills, no emojis.
- Structure with 1px rules: `border-foreground` for a primary rule, `border-foreground/15` hairlines.
- Eyebrow labels: `font-mono text-[10px] tracking-[0.12em] uppercase text-muted-foreground`.
- Headlines: Geist Sans, `font-bold tracking-tight`, `text-balance`. H1 `text-4xl sm:text-5xl`, no orphan words (`text-balance` handles it).
- Big facts: one oversized light numeral per block (`text-5xl font-light tracking-tight tabular-nums`) with a mono unit/label beside it.
- Data lists: `<dl>` rows, label left in `text-muted-foreground`, value right in `font-mono tabular-nums`, hairline rule under each row.
- Buttons: existing `Button` from `@/components/ui/button`; primary = `variant='outline' size='lg'` with `hover:bg-foreground hover:text-background`, matching the homepage CTAs. Link text style: `underline underline-offset-4`.
- Accent colour: pen teal `#0592b3` only as a tiny dot marker or one emphasised value. Copper `#b87333` is GHK-Cu's tint only.
- Images: real renders only, from `public/images/products/` (pens: `dbr-reta-pen-15mg.png`, `-upright.png`, `-dial.png`; vials `dbr-reta-vial-10mg.png`; stacked cartridge shots `dbr-*-stacked.jpg`; chamber diagram `dbr-dual-chamber.jpg`). No stock photos, no generated people.
- Copy voice: direct, second person ("your pen", "your order"), short sentences, British spelling. No em dashes anywhere. No exclamation marks. No "we're passionate", no "cutting-edge", no "elevate".

## Approved facts (use only these)

Company
- Deep Beauty Research. Based in Germany. Seven years in the peptide business. One of Europe's largest peptide wholesalers, now selling direct as well as to trade.
- Range: pre-filled peptide pens and lyophilised vials. Retatrutide (pens 15 mg / 40 mg, vials 10 mg / 20 mg), GHK-Cu (pen 100 mg, Skin Glow pen 70 mg, vial 100 mg), MOTS-c pen 20 mg, Melanotan I and II vials 10 mg, Selank vial 10 mg.
- Positioning: premium wellness peptides, not medicines. We do not give medical advice. Products are labelled research purposes only.

Quality
- Every lot is tested twice: during manufacture, and independently by an ISO 17025 accredited third-party laboratory.
- Certificate of Analysis (CoA) ships with every order and is available on request before ordering.
- Release floor: greater than 99% purity by HPLC on every active. Identity confirmed by mass spectrometry.
- Six-step QC. A lot that fails any stage is destroyed, never reworked or discounted.
- Lot ID printed on the pen and the outer box. Full lot record kept ten years.
- Batch documentation is in the box with every order.

Shipping and ordering
- Dispatched tracked from German stock. Discreet packaging.
- Orders dispatch within 2 business days of payment. EU delivery typically 2 to 3 business days.
- Damaged in transit: replaced. Photograph the parcel and contents and write to orders@ within 48 hours of arrival.
- Outside the EU: case by case, ask before ordering.
- Payment: card (Visa, Mastercard), SEPA bank transfer, crypto (BTC, ETH, USDT).
- No minimum order. Single pen or vial is fine.
- Card checkout at quantity one charges the shop price shown.
- Pens: ready to use straight from the fridge, no reconstitution, click dial (1 click = 0.0125 ml, 60 clicks per turn). Vials: lyophilised, reconstitute with bacteriostatic water, draw with an insulin syringe (1 unit = 0.01 ml). Store pens and vials refrigerated at 2 to 8 C.
- DO NOT claim cold-chain shipping, temperature monitoring or refrigerated transit. (Live site still does; client rule says stop.)

Contact
- contact@deepbeautyresearch.com: general.
- orders@deepbeautyresearch.com: existing orders, shipping, damaged arrivals.
- partners@deepbeautyresearch.com: distributors, wholesale, quotes, referral partners.
- research@deepbeautyresearch.com: documentation, CoA and lot records, how a product works.
- Hours Mon to Fri 09:00 to 17:00 CET, closed on German public holidays. Reply within one business day.
- Fulfilment address is shared with verified trade accounts on request, not published.
- WhatsApp: +49 163 6444056 (https://wa.me/491636444056), given by the client 2026-09-05. Show it on Contact and in the footer. No landline; do not invent one.
- Contact forms: there is no mail backend in this repo. Use `mailto:` links with a prefilled subject per channel. Do not build a form that posts nowhere.

Trade (Distributors page)
- Two ways to work with us:
  1. Wholesale / distribution: clinics, shops, resellers, regional distributors. Volume pricing, recurring supply, CoA and lot records routed with every shipment, one named contact, tracked dispatch from Germany. Terms discussed by email (partners@) with quantity, region and cadence. Account verification before first shipment (company email domain or a short note on the business).
  2. Referral partner programme: flat 15% commission on every order from referred customers, first order and every reorder, 30-day tracking window, monthly payouts by bank (SEPA) or crypto, EUR 1 minimum payout, applications reviewed within two weeks, unique link and partner dashboard. Apply at `https://app.deepbeautyresearch.com/partners/apply`.
- Do not offer white label / own brand. Not confirmed.

## Page briefs

About `/about`
- H1 on the seven years and Germany. One paragraph on what we are (wholesaler for seven years, now direct), one on how the range is made (twice tested, CoA, release-or-destroy), one on how we ship.
- A facts block: 7 years, Germany, >99% purity floor, 2 tests per lot, 10-year lot records. Big light numerals with mono labels.
- A "How a pen is made" or "Inside the pen" strip may reuse the stacked cartridge photos. No fabricated team, names, photos or founder story.
- Closing rule of links: Quality standards (link to the live quality page `https://www.deepbeautyresearch.com/en/quality`), FAQ, Contact.

FAQ `/faq`
- Grouped: Ordering and payment; Shipping and delivery; Pens and vials; Quality and documentation; Trade. 4 to 6 questions each, answers 2 to 4 sentences, facts above only.
- Left column: sticky group index (text links, active dot, same as shop filters). Right: groups with an eyebrow and `FaqList` from `@/components/blocks/faq-list`.
- Render JSON-LD FAQPage schema (`generateWebPageSchema` exists in `@/lib/seo`; add a small FAQPage schema inline).

Contact `/contact`
- H1: talk to the people who make it. Four channel cards as ruled rows (not boxes): who it's for, one line, mailto with subject. Hours and reply time as a facts block. A short "before you write" list of three FAQ links.
- The "not medicines, no medical advice" note as a hairline callout.

Distributors `/distributors`
- H1 on wholesale from one of Europe's largest peptide wholesalers, based in Germany, seven years.
- Two-column comparison of the two routes (Wholesale vs Referral partner) as ruled dl blocks, each with its CTA: wholesale = mailto partners@ with subject "Wholesale enquiry"; referral = external link to the dashboard apply page.
- A "What every trade order includes" list (CoA per lot, lot records on request, tracked German dispatch, replacement if damaged, one named contact).
- Referral numbers block: 15%, 30 days, monthly, EUR 1 minimum.

## Wiring

- Footer (`src/components/layout/footer.tsx`), About mega menu (`src/components/layout/about-megamenu.tsx`) and the top bar link to Contact must point at the new routes.
- Remove the dtspharmacy entries from `src/fake-db/dts-pages.json` (all five; MSSPT is not ours). Keep the `/pages/[slug]` route working with an empty list.
- Add the four routes to the sitemap if `src/app/sitemap.ts` lists static routes.
- `pnpm exec tsc --noEmit -p tsconfig.json` and `pnpm exec eslint --fix <files>` must pass. Dev server runs on http://localhost:3050; probe with curl, do not open a browser.
