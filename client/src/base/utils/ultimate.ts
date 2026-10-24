import * as OT from '@objectType'

export const roundTo = (value: number, digits: number) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

export const calcPer9 = (count: number, inning: number) => {
  if (inning <= 0) {
    return 0
  }

  return roundTo((count * 9) / inning, 3)
}

export const withUltiPitcherCalcRates = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...record,
    homeRunPer9: calcPer9(record.homeRun, record.inning),
    kPer9: calcPer9(record.strikeOut, record.inning),
  }
}

export const withUltiPitcherFixedStats = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...withUltiPitcherCalcRates(record),
    era: roundTo(Number(record.era) || 0, 2),
    whip: roundTo(Number(record.whip) || 0, 3),
  }
}

export const formatCellValue = (value: string | number, digits?: number, hideZero?: boolean) => {
  if (hideZero && typeof value === 'number' && value === 0) {
    return ''
  }

  if (digits === undefined || typeof value !== 'number') {
    return value
  }

  return value.toFixed(digits)
}
