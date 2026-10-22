import * as CT from '@commonType'
import * as OT from '@objectTye'

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

export type HTTP_AddUltiLeague = {
  description: string
  leagueNum: number
}

export type HTTP_ModifyBatter = {
  batterHand: CT.Type_BatterHand
  batterOId: string
  hasPressureSkill: boolean
  name: string
}

export type HTTP_ModifyPitcher = {
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherOId: string
}

export type HTTP_MoveBatterInArr = {
  batterClass: CT.Type_BatterClass
  batterOId: string
  leagueNum: number

  targetBatterClass: CT.Type_BatterClass
  targetIdx: number

  teamName: CT.Type_Team
}

export type HTTP_UpdateRecord = {
  gameNum: number
  leagueNum: number
  order: number
  record: OT.RecordElementType
  rotation: number
}

export type HTTP_MovePitcherInArr = {
  leagueNum: number
  pitcherOId: string
  pitcherType: CT.Type_Pitcher

  targetIdx: number
  targetPitcherType: CT.Type_Pitcher

  teamName: CT.Type_Team
}
