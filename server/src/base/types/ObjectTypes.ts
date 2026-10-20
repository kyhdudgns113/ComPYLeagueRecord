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
  leagueNum: number
  order: number // 1번~9번

  pitchArr: PitchType[]
  pitcherName: string
  result: CT.Type_Result
  rotation: number // 몇번째 타석인지. 대타가 나와도 1로 초기화 되지 않는다.
}
