import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'
import * as OT from '@objectType'

import './DeleteTableButton.scss'

type DeleteTableButtonProps = ButtonCommonProps

export const DeleteTableButton: FC<DeleteTableButtonProps> = ({...props}) => {
  const {setPitcherTableArr} = useUltimateActions()
  const {deletePitcherTable} = useUltimateCallbacksContext()
  const {pitcherTable} = C.usePitcherTableContext()

  const onClickButton = useCallback(
    (pitcherTable: OT.UltiPitcherTableType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!confirm(`경기수 ${pitcherTable.gameNum} 테이블을 삭제할까요?`)) {
        return
      }

      deletePitcherTable(pitcherTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {pitcherTableArr} = res
          setPitcherTableArr(pitcherTableArr)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[DeleteTableButton] ${res.errMsg}`)
          }
        }
      })
    },
    []
  )

  return (
    <button className={`DeleteTableButton`} onClick={onClickButton(pitcherTable)} type="button" {...props}>
      테이블 삭제
    </button>
  )
}
