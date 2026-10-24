import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

import './ModifyButton.scss'

type ModifyButtonProps = ButtonCommonProps & {
  draftArr: OT.UltiPitcherRecordType[]
  isEdit: boolean
  pitcherTable: OT.UltiPitcherTableType
  setDraftArr: Setter<OT.UltiPitcherRecordType[]>
  setIsEdit: Setter<boolean>
}

export const ModifyButton: FC<ModifyButtonProps> = ({draftArr, isEdit, pitcherTable, setDraftArr, setIsEdit, ...props}) => {
  const {setPitcherTableArr} = useUltimateActions()
  const {updatePitcherTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (isEdit: boolean, draftArr: OT.UltiPitcherRecordType[], pitcherTable: OT.UltiPitcherTableType) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!isEdit) {
          setDraftArr(pitcherTable.recordArr.map(record => U.withUltiPitcherCalcRates({...record})))
          setIsEdit(true)
          return
        }

        const nextArr = draftArr.map(record => U.withUltiPitcherFixedStats(record))

        updatePitcherTable(nextArr, pitcherTable.tableOId).then(res => {
          if (res.isSuccess) {
            const {pitcherTableArr} = res
            setPitcherTableArr(pitcherTableArr)
            setIsEdit(false)
          } // ::
          else {
            if (res.errMsg) {
              alert(`[ModifyButton] ${res.errMsg}`)
            }
          }
        })
      },
    []
  )

  return (
    <button className={`ModifyButton ${isEdit ? '_editing' : ''}`} onClick={onClickButton(isEdit, draftArr, pitcherTable)} type="button" {...props}>
      {isEdit ? '완료' : '수정'}
    </button>
  )
}
