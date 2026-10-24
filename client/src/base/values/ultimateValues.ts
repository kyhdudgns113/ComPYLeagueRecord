import * as OT from '@objectType'

export const ULTI_BATTER_RECORD_CELLS: {
  className: string
  digits?: number
  key: keyof OT.UltiBatterRecordType
  inputType: 'number' | 'text'
  showZeroWhenPlayed?: boolean
}[] = [
  {className: 'td-gameNum', key: 'name', inputType: 'text'},
  {className: 'td-playNum', key: 'playNum', inputType: 'number'},
  {className: 'td-atBat', key: 'atBat', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-avg', digits: 3, key: 'avg', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-hit1', key: 'hit1', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-hit2', key: 'hit2', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-hit3', key: 'hit3', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-hit4', key: 'hit4', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-steal', key: 'steal', inputType: 'number'},
  {className: 'td-slg', digits: 3, key: 'slg', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-ops', digits: 3, key: 'ops', inputType: 'number', showZeroWhenPlayed: true},
]

export const ULTI_PITCHER_RECORD_CELLS: {
  className: string
  digits?: number
  isCalc?: boolean
  key: keyof OT.UltiPitcherRecordType
  inputType: 'number' | 'text'
  showZeroWhenPlayed?: boolean
}[] = [
  {className: 'td-name', key: 'name', inputType: 'text'},
  {className: 'td-playNum', key: 'playNum', inputType: 'number'},
  {className: 'td-innings', key: 'inning', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-era', digits: 2, key: 'era', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-win', key: 'win', inputType: 'number'},
  {className: 'td-loss', key: 'lose', inputType: 'number'},
  {className: 'td-save', key: 'save', inputType: 'number'},
  {className: 'td-hold', key: 'hold', inputType: 'number'},
  {className: 'td-blown', key: 'blown', inputType: 'number'},
  {className: 'td-complete', key: 'wanBong', inputType: 'number'},
  {className: 'td-perfect', key: 'wanTo', inputType: 'number'},
  {className: 'td-strikeout', key: 'strikeOut', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-whip', digits: 3, key: 'whip', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-homeRun', key: 'homeRun', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-earnedRun', key: 'ownLoseScore', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-k9', digits: 3, isCalc: true, key: 'kPer9', inputType: 'number', showZeroWhenPlayed: true},
  {className: 'td-hr9', digits: 3, isCalc: true, key: 'homeRunPer9', inputType: 'number', showZeroWhenPlayed: true},
]
