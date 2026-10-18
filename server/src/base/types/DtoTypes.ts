import * as CT from './CommonTypes'

export type DTO_CreateBatter = {
  batterClass: CT.Type_BatterClass
  batterHand: CT.Type_BatterHand
  batterNum: number
  hasPressureSkill: boolean
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
  name: string
  pitcherHand: CT.Type_PitcherHand
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}

export type DTO_ReadGameInfoArr = {
  enemyTeam?: CT.Type_Team
  gameNum?: number
  leagueNum?: number
  SPName?: string
}

export type DTO_UpdatebatterArr = {
  batterOIdArr: string[]
  batterClass: CT.Type_BatterClass
  teamName: CT.Type_Team
}

export type DTO_UpdatePitcherArr = {
  pitcherOIdArr: string[]
  pitcherType: CT.Type_Pitcher
  teamName: CT.Type_Team
}
