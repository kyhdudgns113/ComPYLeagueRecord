import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as OT from '@objectType'

import './DeleteTableButton.scss'

type DeleteTableButtonProps = ButtonCommonProps & {
  batterTable: OT.UltiBatterTableType
}

export const DeleteTableButton: FC<DeleteTableButtonProps> = ({batterTable, ...props}) => {
  const {setBatterTableArr} = useUltimateActions()
  const {deleteBatterTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (batterTable: OT.UltiBatterTableType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!confirm(`경기수 ${batterTable.gameNum} 테이블을 삭제할까요?`)) {
        return
      }

      deleteBatterTable(batterTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {batterTableArr} = res
          setBatterTableArr(batterTableArr)
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
    <button className={`DeleteTableButton`} onClick={onClickButton(batterTable)} type="button" {...props}>
      테이블 삭제
    </button>
  )
}
