import * as CT from '@commonType'

import type {Dispatch, SetStateAction} from 'react'

export type APIReturnType = {
  isSuccess: boolean
  [key: string]: any
}

export type GameNumType = number | null
export type LeagueNumType = number | null
export type LefterTabType = 'Setting' | 'PitchRecord' | null
export type ModalBatterTeamIdxType = number | null
export type ModalBatterClassType = CT.Type_BatterClass | null
export type ModalType = 'AddBatter' | 'AddPitcher' | 'AddGame' | 'AddLeague' | 'SetRecord' | null // 투수 관련 작업 안하는데 투수타입이 설정되는걸 방지
export type ModalPitcherType = CT.Type_Pitcher | null

export type PageTeamType = CT.Type_Team | ''

export type Setter<T> = Dispatch<SetStateAction<T>>
