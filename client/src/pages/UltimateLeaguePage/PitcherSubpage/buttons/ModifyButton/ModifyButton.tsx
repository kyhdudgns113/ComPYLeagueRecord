import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {UltiPitcherDraftType} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'
import * as OT from '@objectType'
import * as U from '@util'

import './ModifyButton.scss'

type ModifyButtonProps = ButtonCommonProps

export const ModifyButton: FC<ModifyButtonProps> = ({...props}) => {
  const {setPitcherTableArr} = useUltimateActions()
  const {updatePitcherTable} = useUltimateCallbacksContext()
  const {draftArr, draftDesc, isEdit, pitcherTable, setDraftArr, setDraftDesc, setIsEdit} = C.usePitcherTableContext()

  const onClickButton = useCallback(
    (isEdit: boolean, draftArr: UltiPitcherDraftType[], draftDesc: string, pitcherTable: OT.UltiPitcherTableType) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!isEdit) {
          setDraftArr(pitcherTable.recordArr.map(record => U.toUltiPitcherDraft(record)))
          setDraftDesc(pitcherTable.desc || '')
          setIsEdit(true)
          return
        }

        const nextArr = draftArr.map(record => U.withUltiPitcherFixedStats(U.fromUltiPitcherDraft(record)))

        updatePitcherTable(nextArr, pitcherTable.tableOId, draftDesc).then(res => {
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
    <button
      className={`ModifyButton ${isEdit ? '_editing' : ''}`}
      onClick={onClickButton(isEdit, draftArr, draftDesc, pitcherTable)}
      type="button"
      {...props}
    >
      {isEdit ? '완료' : '수정'}
    </button>
  )
}
