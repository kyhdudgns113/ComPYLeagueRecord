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
export type ModalType = 'AddBatter' | 'AddBatterTable' | 'AddGame' | 'AddLeague' | 'AddPitcher' | 'AddPitcherTable' | 'AddUltiBatter' | 'AddUltiLeague' | 'AddUltiPitcher' | 'EditRecord' | 'EditUltiRecordDesc' | 'ModifyBatter' | 'ModifyPitcher' | null
export type ModalPitcherType = CT.Type_Pitcher | null

export type EditRecordPayload = {
  batter: OT.BatterType
  order: number
  record: OT.RecordElementType | null
  rotation: number
}

export type EditUltiRecordDescPayload = {
  kind: 'batter' | 'pitcher'
  recordIdx: number
  tableOId: string
}

export type PageTeamType = CT.Type_Team | ''
export type ThemeModeType = 'dark' | 'light'

export type UltiBatterDraftType = {
  [K in keyof OT.UltiBatterRecordType]: OT.UltiBatterRecordType[K] extends number ? string : OT.UltiBatterRecordType[K]
}

export type UltiPitcherDraftType = {
  [K in keyof OT.UltiPitcherRecordType]: OT.UltiPitcherRecordType[K] extends number ? string : OT.UltiPitcherRecordType[K]
}

export type Setter<T> = Dispatch<SetStateAction<T>>
