import type {Dispatch, SetStateAction} from 'react'

import * as CT from '@commonType'
import * as OT from '@objectType'

export type APIReturnType = {
  isSuccess: boolean
  [key: string]: any
}

export type GameNumType = number | null
export type LeagueNumType = number | null
export type LefterTabType = 'PitchRecord' | 'Setting' | 'UltimateLeague' | null
export type ModalBatterTeamIdxType = number | null
export type ModalBatterClassType = CT.Type_BatterClass | null
export type ModalType = 'AddBatter' | 'AddBatterTable' | 'AddGame' | 'AddLeague' | 'AddPitcher' | 'AddPitcherTable' | 'AddUltiBatter' | 'AddUltiLeague' | 'AddUltiPitcher' | 'EditRecord' | 'ModifyBatter' | 'ModifyPitcher' | null
export type ModalPitcherType = CT.Type_Pitcher | null

export type EditRecordPayload = {
  batter: OT.BatterType
  order: number
  record: OT.RecordElementType | null
  rotation: number
}

export type PageTeamType = CT.Type_Team | ''
export type ThemeModeType = 'dark' | 'light'

export type Setter<T> = Dispatch<SetStateAction<T>>
