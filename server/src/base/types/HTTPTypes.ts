import * as CT from '@commonType'

export type HTTP_AddBatter = {
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterNum: number
  hasPressureSkill: boolean
  leagueNum: number
  name: string
  teamName: CT.Type_Team
}

export type HTTP_AddGame = {
  arrLen: number
  leagueNum: number
  SPName: string
  teamName: CT.Type_Team
}

export type HTTP_AddLeague = {
  description: string
  leagueNum: number
}

export type HTTP_AddPitcher = {
  leagueNum: number
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type HTTP_MovePitcherInArr = {
  leagueNum: number
  pitcherOId: string
  pitcherType: CT.Type_Pitcher

  targetIdx: number
  targetPitcherType: CT.Type_Pitcher

  teamName: CT.Type_Team
}
