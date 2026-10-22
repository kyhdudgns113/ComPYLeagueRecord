import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './DeleteTableButton.scss'

type DeleteTableButtonProps = ButtonCommonProps & {
  gameNum: number
  tableOId: string
}

export const DeleteTableButton: FC<DeleteTableButtonProps> = ({gameNum, tableOId, ...props}) => {
  const {setBatterTableArr} = useUltimateActions()
  const {deleteBatterTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!confirm(`경기수 ${gameNum} 테이블을 삭제할까요?`)) {
        return
      }

      deleteBatterTable(tableOId).then(res => {
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
    [deleteBatterTable, gameNum, setBatterTableArr, tableOId]
  )

  return (
    <button className={`DeleteTableButton`} onClick={onClickButton} type="button" {...props}>
      테이블 삭제
    </button>
  )
}
