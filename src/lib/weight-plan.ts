/**
 * Deep Beauty Research Retatrutide plan.
 *
 * A fixed, staged protocol (Jon, 2026-09-05): start at 0.75 mg a week, step up every
 * four weeks through 1, 1.25 and 1.5 mg, reach 1.75 mg at week 17 and hold there.
 * 1.75 mg is the most the shop recommends; at that point the customer is stable.
 *
 * Expected loss: Deep Beauty Research client experience, about 17% of start weight
 * after 24 weeks. The 48-week figure keeps the published curve's ratio between 24 and
 * 48 weeks (trial 1 mg arm: 7.2% then 8.7%), scaled to the client figure.
 *
 * Change PROTOCOL or CLIENT_LOSS_PCT_24W to move every figure the card shows.
 */

export type ProtocolStep = { mg: number; weeks: number }

/** Escalation steps in order. The last entry is the maintenance dose, held indefinitely. */
export const PROTOCOL: ProtocolStep[] = [
  { mg: 0.75, weeks: 4 },
  { mg: 1, weeks: 4 },
  { mg: 1.25, weeks: 4 },
  { mg: 1.5, weeks: 4 },
  { mg: 1.75, weeks: Number.POSITIVE_INFINITY }
]

export const MAX_WEEKLY_DOSE_MG = 1.75
export const OUTLOOK_WEEKS = 24
export const EXTENDED_WEEKS = 48

/** Deep Beauty Research client experience: percent of start weight lost after 24 weeks on the protocol. */
export const CLIENT_LOSS_PCT_24W = 17

/** Trial 1 mg arm: 7.2% at 24 weeks, 8.7% at 48 weeks. Used only for the 24-to-48-week ratio. */
const TRIAL_RATIO_48_TO_24 = 8.7 / 7.2

export const CLIENT_LOSS_PCT_48W = CLIENT_LOSS_PCT_24W * TRIAL_RATIO_48_TO_24

export const MIN_WEIGHT_KG = 30
export const MAX_WEIGHT_KG = 300

export type WeightOutlook = {
  startKg: number
  weeks: number
  lossPct: number
  lossKg: number
  finishKg: number
  extendedWeeks: number
  extendedLossPct: number
  extendedFinishKg: number
  totalMg: number

  /** Week the maintenance dose is first taken. */
  stableFromWeek: number
}

/** Total milligrams taken over the first `weeks` weeks of the protocol. */
export function protocolTotalMg(weeks: number) {
  let remaining = weeks
  let total = 0

  for (const step of PROTOCOL) {
    if (remaining <= 0) break

    const taken = Math.min(step.weeks, remaining)

    total += taken * step.mg
    remaining -= taken
  }

  return total
}

/** Weekly dose at a given week (1-based). */
export function doseAtWeek(week: number) {
  let cursor = 0

  for (const step of PROTOCOL) {
    cursor += step.weeks

    if (week <= cursor) return step.mg
  }

  return PROTOCOL[PROTOCOL.length - 1].mg
}

export const stableFromWeek = () =>
  PROTOCOL.slice(0, -1).reduce((weeks, step) => weeks + step.weeks, 0) + 1

export const isValidWeight = (kg: number) => Number.isFinite(kg) && kg >= MIN_WEIGHT_KG && kg <= MAX_WEIGHT_KG

export function buildWeightOutlook(startKg: number): WeightOutlook | null {
  if (!isValidWeight(startKg)) return null

  const lossKg = (startKg * CLIENT_LOSS_PCT_24W) / 100

  return {
    startKg,
    weeks: OUTLOOK_WEEKS,
    lossPct: CLIENT_LOSS_PCT_24W,
    lossKg,
    finishKg: startKg - lossKg,
    extendedWeeks: EXTENDED_WEEKS,
    extendedLossPct: CLIENT_LOSS_PCT_48W,
    extendedFinishKg: startKg - (startKg * CLIENT_LOSS_PCT_48W) / 100,
    totalMg: protocolTotalMg(OUTLOOK_WEEKS),
    stableFromWeek: stableFromWeek()
  }
}

/** Whole pens or vials needed to cover a total. */
export const unitsForPlan = (totalMg: number, strengthMg: number) => Math.ceil(totalMg / strengthMg)
