import * as CT from '@commonType'

export type BatterType = {
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterOId: string // uniqueId, ObjectId

  hasPressureSkill: boolean // 위압감 여부

  leagueNum: number
  name: string

  teamName: CT.Type_Team
}

export type GameInfoType = {
  enemyTeam: CT.Type_Team
  gameNum: number
  leagueNum: number
  SPName: string
}

export type LeagueInfoType = {
  createdAtNum: number // 서버가 전해줄때는 Date 가 아닌 number 로 전해준다
  description: string
  leagueNum: number
}

export type PitchType = {
  ball: CT.Type_Pitch
  location: CT.Type_Location
}

export type PitcherType = {
  leagueNum: number
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherOId: string // uniqueId, ObjectId
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type RecordElementType = {
  /**
   * 해당 타순에 타자가 바뀔 수 있다
   * 어차피 바뀌는거 검색 용이하게 더 넣는다
   */
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterName: string
  batterOId: string

  gameNum: number
  hasPressure: boolean
  isStealFail: boolean // 도루실패 여부
  leagueNum: number
  order: number // 1번~9번

  pitchArr: PitchType[]
  pitcherName: string
  result: CT.Type_Result
  rotation: number // 몇번째 타석인지. 대타가 나와도 1로 초기화 되지 않는다.
}

/**
 * 얼티밋 리그 통산기록 체크하는 용도이다.
 * - 알파벳순이 아닌, 테이블의 열 순으로 적는다
 */
export type UltiBatterRecordType = {
  name: string
  gameNum: number // 진행된 리그경기
  playNum: number // 출전수
  atBat: number
  avg: number
  hit1: number
  hit2: number
  hit3: number
  hit4: number

  steal: number // 도루

  slg: number
  ops: number

  desc: string
}

export type UltiBatterTableType = {
  createdAtNum: number // 서버가 전해줄때는 Date 가 아닌 number 로 전해준다
  desc: string
  gameNum: number
  leagueNum: number
  recordArr: UltiBatterRecordType[]
  tableOId: string
}

/**
 * 얼티밋 리그 통산기록 체크하는 용도이다.
 * - 알파벳순이 아닌, 테이블의 열 순으로 적는다
 */
export type UltiPitcherRecordType = {
  name: string
  gameNum: number // 진행된 리그경기
  playNum: number // 출전수
  inning: number
  era: number
  win: number
  lose: number
  save: number
  hold: number
  blown: number

  wanBong: number
  wanTo: number
  strikeOut: number
  whip: number
  homeRun: number
  ownLoseScore: number

  kPer9: number
  homeRunPer9: number

  desc: string
}

export type UltiPitcherTableType = {
  createdAtNum: number // 서버가 전해줄때는 Date 가 아닌 number 로 전해준다
  desc: string
  gameNum: number
  leagueNum: number
  recordArr: UltiPitcherRecordType[]
  tableOId: string
}

export type UltiLeagueInfoType = {
  createdAtNum: number // 서버가 전해줄때는 Date 가 아닌 number 로 전해준다. Date 는 Redux 에 저장이 안됨.
  description: string
  leagueNum: number
}
