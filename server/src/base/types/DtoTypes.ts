import * as CT from '@commonType'
import * as OT from '@objectTye'

export type DTO_CreateBatter = {
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterNum: number
  hasPressureSkill: boolean
  leagueNum: number
  name: string
  teamName: CT.Type_Team
}

export type DTO_CreateGameInfo = {
  enemyTeam: CT.Type_Team
  gameNum: number
  leagueNum: number
  SPName: string
}

export type DTO_CreateLeagueInfo = {
  description: string
  leagueNum: number
}

export type DTO_CreatePitcher = {
  leagueNum: number
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type DTO_CreateRecordArr = {
  gameNum: number
  leagueNum: number
  recordArr: OT.RecordElementType[]
}

export type DTO_CreateUltiBatterTable = {
  gameNum: number
  leagueNum: number
}

export type DTO_CreateUltiLeagueInfo = {
  description: string
  leagueNum: number
}

export type DTO_DeleteUltiLeague = {
  leagueNum: number
}

export type DTO_AddUltiPitcherRecord = {
  name: string
  tableOId: string
}

export type DTO_CreateUltiPitcherTable = {
  gameNum: number
  leagueNum: number
}

export type DTO_DeleteUltiPitcherTable = {
  tableOId: string
}

export type DTO_ReadUltiBatterTableArr = {
  leagueNum: number
}

export type DTO_ReadUltiPitcherTableArr = {
  leagueNum: number
}

export type DTO_UpdateUltiPitcherTable = {
  recordArr: OT.UltiPitcherRecordType[]
  tableOId: string
}

export type DTO_UpdateRecord = {
  gameNum: number
  leagueNum: number
  order: number
  record: OT.RecordElementType
  rotation: number
}

export type DTO_ReadBatterArr = {
  batterClass: CT.Type_BatterClass
  leagueNum: number
  teamName: CT.Type_Team
}

export type DTO_ReadBatter3DArrAll = {
  maxLeagueNum: number
}

export type DTO_ReadPitcherArr = {
  leagueNum: number
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type DTO_ReadPitcher3DArrAll = {
  maxLeagueNum: number
}

export type DTO_ReadRecordArr = {
  gameNum: number
  leagueNum: number
}

export type DTO_ReadGameInfoArr = {
  enemyTeam?: CT.Type_Team
  gameNum?: number
  leagueNum?: number
  SPName?: string
}

export type DTO_UpdateBatter = {
  batterHand: CT.Type_BatterHand
  batterOId: string
  hasPressureSkill: boolean
  name: string
}

export type DTO_UpdateBatterArr = {
  batterOIdArr: string[]
  batterClass: CT.Type_BatterClass
  teamName: CT.Type_Team
}

export type DTO_UpdateLeagueInfo = {
  leagueNum: number
  league: OT.LeagueInfoType
}

export type DTO_UpdatePitcher = {
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherOId: string
}

export type DTO_UpdatePitcherArr = {
  pitcherOIdArr: string[]
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type DTO_MoveBatterInArr = {
  batterClass: CT.Type_BatterClass
  batterOId: string
  leagueNum: number
  targetBatterClass: CT.Type_BatterClass
  targetIdx: number
  teamName: CT.Type_Team
}

export type DTO_MovePitcherInArr = {
  leagueNum: number
  pitcherOId: string
  pitcherType: CT.Type_Pitcher
  targetIdx: number
  targetPitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type DTO_UpdateBatterInRecordArr = {
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterName: string
  batterOId: string
  gameNumArr: number[]
  hasPressure: boolean
  leagueNum: number
  prevName: string
}
