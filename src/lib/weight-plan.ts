/**
 * Weight plan estimate for Retatrutide.
 *
 * Turns a start weight and a goal weight into weeks, total milligrams and how many
 * pens or vials that is, at the weekly dose the shop actually recommends.
 *
 * Dose: Deep Beauty Research recommends at most 1.75 mg a week (client experience,
 * 2026-09-05). The chooser runs 0.5 to 1.75 mg and never higher. One steady weekly dose,
 * no escalation schedule, because the shop has not supplied one.
 *
 * Rate of loss: the only published data are the Phase 2 trial arms (Jastreboff et al.,
 * NEJM 2023, mean body-weight change at 48 weeks): placebo 2.1%, 1 mg 8.7%, 4 mg 17.5%.
 * Doses in between are interpolated linearly and spread evenly over the 48 weeks.
 * These are trial averages, not the shop's own client outcomes. Replace RATE_POINTS
 * with observed numbers when the shop has them.
 */

export const WEEKLY_DOSES_MG = [0.5, 0.75, 1, 1.25, 1.5, 1.75] as const
export const MAX_WEEKLY_DOSE_MG = 1.75

export type WeeklyDoseMg = (typeof WEEKLY_DOSES_MG)[number]

/** [weekly mg, mean % body-weight loss at 48 weeks] from the trial arms. */
const RATE_POINTS: Array<[number, number]> = [
  [0, 2.1],
  [1, 8.7],
  [4, 17.5]
]

const TRIAL_WEEKS = 48

export const MIN_WEIGHT_KG = 30
export const MAX_WEIGHT_KG = 300

export type WeightPlan = {
  lossKg: number
  lossPct: number
  weeklyLossPct: number
  weeks: number
  totalMg: number
}

/** Percent of start weight lost per week at a given weekly dose. */
export function weeklyLossPct(weeklyMg: number) {
  const mg = Math.min(Math.max(weeklyMg, RATE_POINTS[0][0]), RATE_POINTS[RATE_POINTS.length - 1][0])

  for (let i = 1; i < RATE_POINTS.length; i++) {
    const [x0, y0] = RATE_POINTS[i - 1]
    const [x1, y1] = RATE_POINTS[i]

    if (mg <= x1) {
      const pct48 = y0 + ((mg - x0) / (x1 - x0)) * (y1 - y0)

      return pct48 / TRIAL_WEEKS
    }
  }

  return RATE_POINTS[RATE_POINTS.length - 1][1] / TRIAL_WEEKS
}

export const isValidWeights = (currentKg: number, goalKg: number) =>
  Number.isFinite(currentKg) &&
  Number.isFinite(goalKg) &&
  currentKg >= MIN_WEIGHT_KG &&
  currentKg <= MAX_WEIGHT_KG &&
  goalKg >= MIN_WEIGHT_KG &&
  goalKg < currentKg

export function buildWeightPlan(currentKg: number, goalKg: number, weeklyMg: number): WeightPlan | null {
  if (!isValidWeights(currentKg, goalKg)) return null
  if (!(weeklyMg > 0) || weeklyMg > MAX_WEEKLY_DOSE_MG) return null

  const lossKg = currentKg - goalKg
  const lossPct = (lossKg / currentKg) * 100
  const rate = weeklyLossPct(weeklyMg)
  const weeks = Math.max(1, Math.ceil(lossPct / rate))

  return { lossKg, lossPct, weeklyLossPct: rate, weeks, totalMg: weeks * weeklyMg }
}

/** Whole pens or vials needed to cover the plan. */
export const unitsForPlan = (totalMg: number, strengthMg: number) => Math.ceil(totalMg / strengthMg)
