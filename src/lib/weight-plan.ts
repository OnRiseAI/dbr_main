/**
 * 24-week outlook for Retatrutide.
 *
 * Start weight and weekly dose in, expected finish weight after 24 weeks out, plus the
 * pens or vials that many doses needs.
 *
 * Dose: Deep Beauty Research recommends at most 1.75 mg a week (client experience,
 * 2026-09-05). The chooser runs 0.5 to 1.75 mg and never higher. Most customers use 1 mg.
 *
 * Rate of loss: Deep Beauty Research client experience (Jon, 2026-09-05): about 17% of
 * start weight after 24 weeks at 1 mg. The shape of the curve (how the other doses and
 * the 48-week point relate to that) is taken from the Phase 2 trial arms (Jastreboff et
 * al., NEJM 2023) and scaled so that 1 mg at 24 weeks equals CLIENT_LOSS_PCT_1MG_24W.
 * For reference the unscaled trial means were 24 weeks: placebo 1.6%, 1 mg 7.2%,
 * 4 mg 12.9%; 48 weeks: placebo 2.1%, 1 mg 8.7%, 4 mg 17.1%.
 *
 * Change CLIENT_LOSS_PCT_1MG_24W to move every figure the card shows.
 */

export const WEEKLY_DOSES_MG = [0.5, 0.75, 1, 1.25, 1.5, 1.75] as const
export const MAX_WEEKLY_DOSE_MG = 1.75
export const OUTLOOK_WEEKS = 24
export const EXTENDED_WEEKS = 48

export type WeeklyDoseMg = (typeof WEEKLY_DOSES_MG)[number]

/** Deep Beauty Research client experience: percent of start weight lost at 1 mg a week after 24 weeks. */
export const CLIENT_LOSS_PCT_1MG_24W = 17

/** [weekly mg, mean % body-weight loss] from the trial arms. Shape only; scaled below. */
const TRIAL_LOSS_PCT_24W: Array<[number, number]> = [
  [0, 1.6],
  [1, 7.2],
  [4, 12.9]
]

const TRIAL_LOSS_PCT_48W: Array<[number, number]> = [
  [0, 2.1],
  [1, 8.7],
  [4, 17.1]
]

const SCALE = CLIENT_LOSS_PCT_1MG_24W / TRIAL_LOSS_PCT_24W[1][1]

const scaled = (points: Array<[number, number]>): Array<[number, number]> => points.map(([mg, pct]) => [mg, pct * SCALE])

const LOSS_PCT_24W = scaled(TRIAL_LOSS_PCT_24W)
const LOSS_PCT_48W = scaled(TRIAL_LOSS_PCT_48W)

export const MIN_WEIGHT_KG = 30
export const MAX_WEIGHT_KG = 300

export type WeightOutlook = {
  startKg: number
  weeklyMg: number
  weeks: number
  lossPct: number
  lossKg: number
  finishKg: number
  extendedWeeks: number
  extendedLossPct: number
  extendedFinishKg: number
  totalMg: number
}

const interpolate = (points: Array<[number, number]>, mg: number) => {
  const x = Math.min(Math.max(mg, points[0][0]), points[points.length - 1][0])

  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1]
    const [x1, y1] = points[i]

    if (x <= x1) return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0)
  }

  return points[points.length - 1][1]
}

/** Expected percent of start weight lost at a weekly dose, at 24 or 48 weeks. */
export const expectedLossPct = (weeklyMg: number, weeks: 24 | 48) =>
  interpolate(weeks === 24 ? LOSS_PCT_24W : LOSS_PCT_48W, weeklyMg)

export const isValidWeight = (kg: number) => Number.isFinite(kg) && kg >= MIN_WEIGHT_KG && kg <= MAX_WEIGHT_KG

export function buildWeightOutlook(startKg: number, weeklyMg: number): WeightOutlook | null {
  if (!isValidWeight(startKg)) return null
  if (!(weeklyMg > 0) || weeklyMg > MAX_WEEKLY_DOSE_MG) return null

  const lossPct = expectedLossPct(weeklyMg, 24)
  const extendedLossPct = expectedLossPct(weeklyMg, 48)
  const lossKg = (startKg * lossPct) / 100

  return {
    startKg,
    weeklyMg,
    weeks: OUTLOOK_WEEKS,
    lossPct,
    lossKg,
    finishKg: startKg - lossKg,
    extendedWeeks: EXTENDED_WEEKS,
    extendedLossPct,
    extendedFinishKg: startKg - (startKg * extendedLossPct) / 100,
    totalMg: OUTLOOK_WEEKS * weeklyMg
  }
}

/** Whole pens or vials needed to cover a total. */
export const unitsForPlan = (totalMg: number, strengthMg: number) => Math.ceil(totalMg / strengthMg)
