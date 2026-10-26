import type * as LT from '@localType'

import * as OT from '@objectType'
import * as V from '@value'

export const roundTo = (value: number, digits: number) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

export const toRealInnings = (inning: number) => {
  if (inning <= 0) {
    return 0
  }

  const scaled = Math.round(inning * 10)
  const outs = scaled % 10
  const whole = (scaled - outs) / 10

  return whole + outs / 3
}

export const calcPer9 = (count: number, inning: number, digits = 3) => {
  const realInning = toRealInnings(inning)

  if (realInning <= 0) {
    return 0
  }

  return roundTo((count * 9) / realInning, digits)
}

export const withUltiPitcherCalcRates = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...record,
    era: calcPer9(record.ownLoseScore, record.inning, 2),
    homeRunPer9: calcPer9(record.homeRun, record.inning),
    kPer9: calcPer9(record.strikeOut, record.inning),
  }
}

export const withUltiPitcherFixedStats = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...withUltiPitcherCalcRates(record),
    whip: roundTo(Number(record.whip) || 0, 3),
  }
}

export const calcAvg = (hit: number, atBat: number) => {
  if (atBat <= 0) {
    return 0
  }

  return roundTo(hit / atBat, 3)
}

export const calcSlg = (hit: number, hit2: number, hit3: number, hit4: number, atBat: number) => {
  if (atBat <= 0) {
    return 0
  }

  const totalBase = hit + hit2 + 2 * hit3 + 3 * hit4
  return roundTo(totalBase / atBat, 3)
}

export const withUltiBatterCalcRates = (record: OT.UltiBatterRecordType): OT.UltiBatterRecordType => {
  return {
    ...record,
    avg: calcAvg(record.hit1, record.atBat),
    slg: calcSlg(record.hit1, record.hit2, record.hit3, record.hit4, record.atBat),
  }
}

export const withUltiBatterFixedRates = (record: OT.UltiBatterRecordType): OT.UltiBatterRecordType => {
  return {
    ...withUltiBatterCalcRates(record),
    ops: roundTo(Number(record.ops) || 0, 3),
  }
}

export const toUltiNum = (value: string | number) => {
  if (value === '' || value === '-') {
    return 0
  }

  const nextNum = Number(value)
  return Number.isNaN(nextNum) ? 0 : nextNum
}

const toDraftValue = (value: number, hideZero: boolean) => {
  if (hideZero && value === 0) {
    return ''
  }

  return String(value)
}

export const toUltiBatterDraft = (record: OT.UltiBatterRecordType): LT.UltiBatterDraftType => {
  const played = record.atBat !== 0
  const draft = {...record} as unknown as LT.UltiBatterDraftType

  V.ULTI_BATTER_RECORD_CELLS.forEach(cell => {
    if (cell.inputType !== 'number') {
      return
    }

    const value = record[cell.key]
    if (typeof value !== 'number') {
      return
    }

    const hideZero = !(cell.showZeroWhenPlayed && played)
    draft[cell.key] = toDraftValue(value, hideZero) as never
  })

  draft.gameNum = String(record.gameNum)

  return draft
}

export const toUltiPitcherDraft = (record: OT.UltiPitcherRecordType): LT.UltiPitcherDraftType => {
  const played = record.playNum !== 0
  const draft = {...record} as unknown as LT.UltiPitcherDraftType

  V.ULTI_PITCHER_RECORD_CELLS.forEach(cell => {
    if (cell.inputType !== 'number') {
      return
    }

    const value = record[cell.key]
    if (typeof value !== 'number') {
      return
    }

    const hideZero = !(cell.showZeroWhenPlayed && played)
    draft[cell.key] = toDraftValue(value, hideZero) as never
  })

  draft.gameNum = String(record.gameNum)

  return draft
}

export const fromUltiBatterDraft = (record: OT.UltiBatterRecordType | LT.UltiBatterDraftType): OT.UltiBatterRecordType => {
  return {
    name: record.name,
    gameNum: toUltiNum(record.gameNum),
    playNum: toUltiNum(record.playNum),
    atBat: toUltiNum(record.atBat),
    avg: toUltiNum(record.avg),
    hit1: toUltiNum(record.hit1),
    hit2: toUltiNum(record.hit2),
    hit3: toUltiNum(record.hit3),
    hit4: toUltiNum(record.hit4),
    steal: toUltiNum(record.steal),
    slg: toUltiNum(record.slg),
    ops: toUltiNum(record.ops),
    desc: record.desc,
  }
}

export const fromUltiPitcherDraft = (record: OT.UltiPitcherRecordType | LT.UltiPitcherDraftType): OT.UltiPitcherRecordType => {
  return {
    name: record.name,
    gameNum: toUltiNum(record.gameNum),
    playNum: toUltiNum(record.playNum),
    inning: toUltiNum(record.inning),
    era: toUltiNum(record.era),
    win: toUltiNum(record.win),
    lose: toUltiNum(record.lose),
    save: toUltiNum(record.save),
    hold: toUltiNum(record.hold),
    blown: toUltiNum(record.blown),
    wanBong: toUltiNum(record.wanBong),
    wanTo: toUltiNum(record.wanTo),
    strikeOut: toUltiNum(record.strikeOut),
    whip: toUltiNum(record.whip),
    homeRun: toUltiNum(record.homeRun),
    ownLoseScore: toUltiNum(record.ownLoseScore),
    kPer9: toUltiNum(record.kPer9),
    homeRunPer9: toUltiNum(record.homeRunPer9),
    desc: record.desc,
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
