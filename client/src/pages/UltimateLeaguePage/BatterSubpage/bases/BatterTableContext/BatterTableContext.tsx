import {createContext, useContext, useState} from 'react'

import type {FC, PropsWithChildren} from 'react'
import type {Setter, UltiBatterDraftType} from '@localType'

import * as OT from '@objectType'

const EMPTY_BATTER_TABLE: OT.UltiBatterTableType = {
  createdAtNum: 0,
  desc: '',
  gameNum: 0,
  leagueNum: 0,
  recordArr: [],
  tableOId: '',
}

// prettier-ignore
type ContextType = {
  batterTable: OT.UltiBatterTableType
  desc: string
  draftArr: UltiBatterDraftType[]
  draftDesc: string
  dragIdx: number | null
  isCompare: boolean
  isEdit: boolean
  prevTable: OT.UltiBatterTableType | null
  recordArr: (OT.UltiBatterRecordType | UltiBatterDraftType)[]
  setDraftArr: Setter<UltiBatterDraftType[]>
  setDraftDesc: Setter<string>
  setDragIdx: Setter<number | null>
  setIsCompare: Setter<boolean>
  setIsEdit: Setter<boolean>
  showCompare: boolean
}

// prettier-ignore
export const BatterTableContext = createContext<ContextType>({
  batterTable: EMPTY_BATTER_TABLE,
  desc: '',
  draftArr: [],
  draftDesc: '',
  dragIdx: null,
  isCompare: false,
  isEdit: false,
  prevTable: null,
  recordArr: [],
  setDraftArr: () => {},
  setDraftDesc: () => {},
  setDragIdx: () => {},
  setIsCompare: () => {},
  setIsEdit: () => {},
  showCompare: false,
})

export const useBatterTableContext = () => useContext(BatterTableContext)

type BatterTableProviderProps = PropsWithChildren & {
  batterTable: OT.UltiBatterTableType
  prevTable: OT.UltiBatterTableType | null
}

export const BatterTableProvider: FC<BatterTableProviderProps> = ({batterTable, children, prevTable}) => {
  const [isCompare, setIsCompare] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<UltiBatterDraftType[]>([])
  const [draftDesc, setDraftDesc] = useState<string>(batterTable.desc || '')
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : batterTable.recordArr
  const desc = isEdit ? draftDesc : batterTable.desc || ''
  const showCompare = isCompare && !isEdit

  // prettier-ignore
  const value: ContextType = {
    batterTable,
    desc,
    draftArr,
    draftDesc,
    dragIdx,
    isCompare,
    isEdit,
    prevTable,
    recordArr,
    setDraftArr,
    setDraftDesc,
    setDragIdx,
    setIsCompare,
    setIsEdit,
    showCompare,
  }

  return <BatterTableContext.Provider value={value}>{children}</BatterTableContext.Provider>
}
