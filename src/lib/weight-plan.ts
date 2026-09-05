/**
 * Weight plan estimate for Retatrutide.
 *
 * Turns a start weight and a goal weight into weeks, total milligrams and how many
 * pens or vials that is. The only two assumptions are named here and shown on the card:
 *
 * 1. Rate of loss: mean body-weight change at 48 weeks by maintenance dose from the
 *    Phase 2 trial (Jastreboff et al., NEJM 2023), spread evenly over the 48 weeks.
 * 2. Schedule: the trial's escalation, 4 weeks each at 2 mg then 4 mg then 8 mg
 *    until the maintenance dose is reached, then maintenance weekly.
 *
 * Estimates from trial averages. Individual results vary.
 */

export const MAINTENANCE_DOSES_MG = [4, 8, 12] as const

export type MaintenanceDoseMg = (typeof MAINTENANCE_DOSES_MG)[number]

/** Mean percent body-weight loss at 48 weeks, by weekly maintenance dose. */
const TRIAL_LOSS_PCT_48W: Record<MaintenanceDoseMg, number> = { 4: 17.5, 8: 22.8, 12: 24.2 }
const TRIAL_WEEKS = 48
const ESCALATION_MG = [2, 4, 8]
const ESCALATION_STEP_WEEKS = 4

export const MIN_WEIGHT_KG = 30
export const MAX_WEIGHT_KG = 300

export type PlanStep = { mg: number; weeks: number }

export type WeightPlan = {
  lossKg: number
  lossPct: number
  weeklyLossPct: number
  weeks: number
  totalMg: number
  schedule: PlanStep[]
}

export const weeklyLossPct = (maintenanceMg: MaintenanceDoseMg) => TRIAL_LOSS_PCT_48W[maintenanceMg] / TRIAL_WEEKS

export const isValidWeights = (currentKg: number, goalKg: number) =>
  Number.isFinite(currentKg) &&
  Number.isFinite(goalKg) &&
  currentKg >= MIN_WEIGHT_KG &&
  currentKg <= MAX_WEIGHT_KG &&
  goalKg >= MIN_WEIGHT_KG &&
  goalKg < currentKg

export function buildWeightPlan(currentKg: number, goalKg: number, maintenanceMg: MaintenanceDoseMg): WeightPlan | null {
  if (!isValidWeights(currentKg, goalKg)) return null

  const lossKg = currentKg - goalKg
  const lossPct = (lossKg / currentKg) * 100
  const rate = weeklyLossPct(maintenanceMg)
  const weeks = Math.max(1, Math.ceil(lossPct / rate))

  const schedule: PlanStep[] = []
  let placed = 0
  let totalMg = 0

  for (const mg of ESCALATION_MG) {
    if (mg >= maintenanceMg || placed >= weeks) break

    const stepWeeks = Math.min(ESCALATION_STEP_WEEKS, weeks - placed)

    schedule.push({ mg, weeks: stepWeeks })
    totalMg += mg * stepWeeks
    placed += stepWeeks
  }

  if (placed < weeks) {
    const rest = weeks - placed

    schedule.push({ mg: maintenanceMg, weeks: rest })
    totalMg += maintenanceMg * rest
  }

  return { lossKg, lossPct, weeklyLossPct: rate, weeks, totalMg, schedule }
}

/** Whole pens or vials needed to cover the plan. */
export const unitsForPlan = (totalMg: number, strengthMg: number) => Math.ceil(totalMg / strengthMg)
