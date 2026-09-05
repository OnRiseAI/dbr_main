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

/**
 * Loss curve on the protocol: percent of start weight lost by week. Client figure at 24
 * weeks, the trial's 24-to-48 ratio for the second half, then the same slope carried on.
 */
const LOSS_CURVE: Array<[number, number]> = [
  [0, 0],
  [OUTLOOK_WEEKS, CLIENT_LOSS_PCT_24W],
  [EXTENDED_WEEKS, CLIENT_LOSS_PCT_48W]
]

/** Longest plan the card will quote. */
export const MAX_PLAN_WEEKS = 104

/** Weeks needed to lose `pct` of start weight, or null if it is beyond MAX_PLAN_WEEKS. */
export function weeksToLosePct(pct: number): number | null {
  if (!(pct > 0)) return null

  for (let i = 1; i < LOSS_CURVE.length; i++) {
    const [w0, p0] = LOSS_CURVE[i - 1]
    const [w1, p1] = LOSS_CURVE[i]

    if (pct <= p1) return Math.ceil(w0 + ((pct - p0) / (p1 - p0)) * (w1 - w0))
  }

  const [w0, p0] = LOSS_CURVE[LOSS_CURVE.length - 2]
  const [w1, p1] = LOSS_CURVE[LOSS_CURVE.length - 1]
  const weeks = Math.ceil(w1 + ((pct - p1) / (p1 - p0)) * (w1 - w0))

  return weeks <= MAX_PLAN_WEEKS ? weeks : null
}

export type GoalPlan = {
  startKg: number
  goalKg: number
  lossKg: number
  lossPct: number

  /** Weeks to reach the goal on the protocol, null when beyond MAX_PLAN_WEEKS. */
  weeks: number | null

  /** Total milligrams over those weeks (0 when weeks is null). */
  totalMg: number

  /** Expected weight after 24 weeks, for reference. */
  at24Kg: number
  stableFromWeek: number
}

export const isValidGoal = (startKg: number, goalKg: number) =>
  isValidWeight(startKg) && Number.isFinite(goalKg) && goalKg >= MIN_WEIGHT_KG && goalKg < startKg

export function buildGoalPlan(startKg: number, goalKg: number): GoalPlan | null {
  if (!isValidGoal(startKg, goalKg)) return null

  const lossKg = startKg - goalKg
  const lossPct = (lossKg / startKg) * 100
  const weeks = weeksToLosePct(lossPct)

  return {
    startKg,
    goalKg,
    lossKg,
    lossPct,
    weeks,
    totalMg: weeks ? protocolTotalMg(weeks) : 0,
    at24Kg: startKg - (startKg * CLIENT_LOSS_PCT_24W) / 100,
    stableFromWeek: stableFromWeek()
  }
}

/** Whole pens or vials needed to cover a total. */
export const unitsForPlan = (totalMg: number, strengthMg: number) => Math.ceil(totalMg / strengthMg)
