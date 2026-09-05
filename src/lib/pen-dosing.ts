/**
 * How the two formats are measured.
 *
 * Pens are click pens. From the dosing note packed with the Retatrutide 15 mg pen
 * (15 mg / 3 ml): 1 click = 0.0125 ml, 60 clicks = 0.75 ml = one full turn of the dial,
 * 240 clicks empties the 3 ml pen. The same pen hardware is assumed for the other pens.
 *
 * Vials are drawn with an insulin syringe: 1 unit = 0.01 ml.
 */

export const ML_PER_CLICK = 0.0125
export const CLICKS_PER_TURN = 60
export const ML_PER_SYRINGE_UNIT = 0.01

export type PenReading = {
  clicks: number
  turns: number
  remainder: number
  mgPerClick: number
  ml: number
}

export const mgPerClick = (strengthMg: number, fillMl: number) => (strengthMg / fillMl) * ML_PER_CLICK

/** Clicks on the pen dial for a dose, split into full turns and remaining clicks. */
export function penReading(doseMg: number, strengthMg: number, fillMl: number): PenReading {
  const perClick = mgPerClick(strengthMg, fillMl)
  const clicks = doseMg / perClick

  return {
    clicks,
    turns: Math.floor(Math.round(clicks) / CLICKS_PER_TURN),
    remainder: Math.round(clicks) % CLICKS_PER_TURN,
    mgPerClick: perClick,
    ml: doseMg / (strengthMg / fillMl)
  }
}

/** Insulin-syringe units for a dose from a vial reconstituted with `waterMl`. */
export function syringeUnits(doseMg: number, strengthMg: number, waterMl: number) {
  const mgPerMl = strengthMg / waterMl

  return { units: (doseMg / mgPerMl) / ML_PER_SYRINGE_UNIT, mgPerMl, ml: doseMg / mgPerMl }
}

/**
 * Upper bound for the per-use amount control, by compound. Keeps the slider from
 * suggesting amounts the shop does not stand behind. Retatrutide: 1.75 mg a week is the
 * most Deep Beauty Research recommends (client experience, 2026-09-05).
 */
export const MAX_PER_USE_MG: Record<string, number> = {
  Retatrutide: 2
}

export const maxPerUseMg = (compound: string, strengthMg: number) =>
  MAX_PER_USE_MG[compound] ?? Math.min(strengthMg, 10)
