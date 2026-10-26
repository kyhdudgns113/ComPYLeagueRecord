import {createContext, useContext, useState} from 'react'

import type {FC, PropsWithChildren} from 'react'
import type {Setter, UltiPitcherDraftType} from '@localType'

import * as OT from '@objectType'

const EMPTY_PITCHER_TABLE: OT.UltiPitcherTableType = {
  createdAtNum: 0,
  desc: '',
  gameNum: 0,
  leagueNum: 0,
  recordArr: [],
  tableOId: '',
}

// prettier-ignore
type ContextType = {
  desc: string
  draftArr: UltiPitcherDraftType[]
  draftDesc: string
  dragIdx: number | null
  isCompare: boolean
  isEdit: boolean
  pitcherTable: OT.UltiPitcherTableType
  prevTable: OT.UltiPitcherTableType | null
  recordArr: (OT.UltiPitcherRecordType | UltiPitcherDraftType)[]
  setDraftArr: Setter<UltiPitcherDraftType[]>
  setDraftDesc: Setter<string>
  setDragIdx: Setter<number | null>
  setIsCompare: Setter<boolean>
  setIsEdit: Setter<boolean>
  showCompare: boolean
}

// prettier-ignore
export const PitcherTableContext = createContext<ContextType>({
  desc: '',
  draftArr: [],
  draftDesc: '',
  dragIdx: null,
  isCompare: false,
  isEdit: false,
  pitcherTable: EMPTY_PITCHER_TABLE,
  prevTable: null,
  recordArr: [],
  setDraftArr: () => {},
  setDraftDesc: () => {},
  setDragIdx: () => {},
  setIsCompare: () => {},
  setIsEdit: () => {},
  showCompare: false,
})

export const usePitcherTableContext = () => useContext(PitcherTableContext)

type PitcherTableProviderProps = PropsWithChildren & {
  pitcherTable: OT.UltiPitcherTableType
  prevTable: OT.UltiPitcherTableType | null
}

export const PitcherTableProvider: FC<PitcherTableProviderProps> = ({children, pitcherTable, prevTable}) => {
  const [isCompare, setIsCompare] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<UltiPitcherDraftType[]>([])
  const [draftDesc, setDraftDesc] = useState<string>(pitcherTable.desc || '')
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : pitcherTable.recordArr
  const desc = isEdit ? draftDesc : pitcherTable.desc || ''
  const showCompare = isCompare && !isEdit

  // prettier-ignore
  const value: ContextType = {
    desc,
    draftArr,
    draftDesc,
    dragIdx,
    isCompare,
    isEdit,
    pitcherTable,
    prevTable,
    recordArr,
    setDraftArr,
    setDraftDesc,
    setDragIdx,
    setIsCompare,
    setIsEdit,
    showCompare,
  }

  return <PitcherTableContext.Provider value={value}>{children}</PitcherTableContext.Provider>
}
