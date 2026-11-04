// Engineering calculations use consistent SI units internally.
// These are geometry/volume calculations, not substitutes for API design checks.

export const INCH_TO_M = 0.0254
export const M3_TO_BBL = 6.28981077
export const M3_TO_LITRE = 1000

export function pipeCapacityBblPerM(idIn: number): number {
  const idM = idIn * INCH_TO_M
  return (Math.PI * idM * idM / 4) * M3_TO_BBL
}

export function annularCapacityBblPerM(holeIn: number, pipeOdIn: number): number {
  const holeM = holeIn * INCH_TO_M
  const pipeM = pipeOdIn * INCH_TO_M
  if (holeM <= pipeM) throw new Error('Hole diameter must be greater than pipe OD.')
  return (Math.PI * (holeM * holeM - pipeM * pipeM) / 4) * M3_TO_BBL
}

export function volumeBbl(capacityBblPerM: number, lengthM: number): number {
  return capacityBblPerM * lengthM
}

export function steelDisplacementBblPerM(odIn: number, idIn: number): number {
  if (idIn >= odIn) throw new Error('Pipe ID must be smaller than pipe OD.')
  const odM = odIn * INCH_TO_M
  const idM = idIn * INCH_TO_M
  return (Math.PI * (odM * odM - idM * idM) / 4) * M3_TO_BBL
}

export function round(value: number, digits = 4): string {
  if (!Number.isFinite(value)) return '—'
  return value.toFixed(digits)
}