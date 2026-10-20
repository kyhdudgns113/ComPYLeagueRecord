import * as CT from '@commonType'

import type {Dispatch, SetStateAction} from 'react'

export type APIReturnType = {
  isSuccess: boolean
  [key: string]: any
}

export type GameNumType = number | null
export type LeagueNumType = number | null
export type LefterTabType = 'PitchRecord' | 'Setting' | null
export type ModalBatterTeamIdxType = number | null
export type ModalBatterClassType = CT.Type_BatterClass | null
export type ModalType = 'AddBatter' | 'AddGame' | 'AddLeague' | 'AddPitcher' | 'ModifyBatter' | 'ModifyPitcher' | null
export type ModalPitcherType = CT.Type_Pitcher | null

export type PageTeamType = CT.Type_Team | ''

export type Setter<T> = Dispatch<SetStateAction<T>>
