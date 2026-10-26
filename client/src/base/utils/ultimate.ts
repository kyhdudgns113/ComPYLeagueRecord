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

export const toInningOuts = (inning: number) => {
  const scaled = Math.round(inning * 10)
  const outs = scaled % 10
  const whole = (scaled - outs) / 10

  return whole * 3 + outs
}

export const fromInningOuts = (outs: number) => {
  const sign = outs < 0 ? -1 : 1
  const abs = Math.abs(outs)
  const whole = Math.floor(abs / 3)
  const rem = abs % 3

  return sign * (whole + rem / 10)
}

export const diffInning = (current: number, prev: number) => {
  return fromInningOuts(toInningOuts(current) - toInningOuts(prev))
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

const EMPTY_ULTI_PITCHER_RECORD: OT.UltiPitcherRecordType = {
  name: '',
  gameNum: 0,
  playNum: 0,
  inning: 0,
  era: 0,
  win: 0,
  lose: 0,
  save: 0,
  hold: 0,
  blown: 0,
  wanBong: 0,
  wanTo: 0,
  strikeOut: 0,
  whip: 0,
  homeRun: 0,
  ownLoseScore: 0,
  kPer9: 0,
  homeRunPer9: 0,
  desc: '',
}

export const diffUltiPitcherRecord = (current: OT.UltiPitcherRecordType, prev: OT.UltiPitcherRecordType | null): OT.UltiPitcherRecordType => {
  const a = withUltiPitcherCalcRates(current)
  const b = withUltiPitcherCalcRates(prev || EMPTY_ULTI_PITCHER_RECORD)

  return {
    ...a,
    playNum: a.playNum - b.playNum,
    inning: diffInning(a.inning, b.inning),
    era: a.era - b.era,
    win: a.win - b.win,
    lose: a.lose - b.lose,
    save: a.save - b.save,
    hold: a.hold - b.hold,
    blown: a.blown - b.blown,
    wanBong: a.wanBong - b.wanBong,
    wanTo: a.wanTo - b.wanTo,
    strikeOut: a.strikeOut - b.strikeOut,
    whip: a.whip - b.whip,
    homeRun: a.homeRun - b.homeRun,
    ownLoseScore: a.ownLoseScore - b.ownLoseScore,
    kPer9: a.kPer9 - b.kPer9,
    homeRunPer9: a.homeRunPer9 - b.homeRunPer9,
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

const EMPTY_ULTI_BATTER_RECORD: OT.UltiBatterRecordType = {
  name: '',
  gameNum: 0,
  playNum: 0,
  atBat: 0,
  avg: 0,
  hit1: 0,
  hit2: 0,
  hit3: 0,
  hit4: 0,
  steal: 0,
  slg: 0,
  ops: 0,
  desc: '',
}

export const diffUltiBatterRecord = (current: OT.UltiBatterRecordType, prev: OT.UltiBatterRecordType | null): OT.UltiBatterRecordType => {
  const a = withUltiBatterCalcRates(current)
  const b = withUltiBatterCalcRates(prev || EMPTY_ULTI_BATTER_RECORD)

  return {
    ...a,
    playNum: a.playNum - b.playNum,
    atBat: a.atBat - b.atBat,
    avg: a.avg - b.avg,
    hit1: a.hit1 - b.hit1,
    hit2: a.hit2 - b.hit2,
    hit3: a.hit3 - b.hit3,
    hit4: a.hit4 - b.hit4,
    steal: a.steal - b.steal,
    slg: a.slg - b.slg,
    ops: a.ops - b.ops,
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
