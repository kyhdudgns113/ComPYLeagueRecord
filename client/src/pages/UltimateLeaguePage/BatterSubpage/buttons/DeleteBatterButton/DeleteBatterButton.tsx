import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {Setter, UltiBatterDraftType} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

import './DeleteBatterButton.scss'

type DeleteBatterButtonProps = ButtonCommonProps & {
  name: string
  recordArr: (OT.UltiBatterRecordType | UltiBatterDraftType)[]
  recordIdx: number
  setDraftArr: Setter<UltiBatterDraftType[]>
  tableOId: string
}

export const DeleteBatterButton: FC<DeleteBatterButtonProps> = ({name, recordArr, recordIdx, setDraftArr, tableOId, ...props}) => {
  const {setBatterTableArr} = useUltimateActions()
  const {updateBatterTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (name: string, recordArr: (OT.UltiBatterRecordType | UltiBatterDraftType)[], recordIdx: number, tableOId: string) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!confirm(`타자 "${name}" 을(를) 삭제할까요?`)) {
          return
        }

        const nextArr = recordArr.filter((_, idx) => idx !== recordIdx)
        const nextSaved = nextArr.map(record => U.fromUltiBatterDraft(record))

        updateBatterTable(nextSaved, tableOId).then(res => {
          if (res.isSuccess) {
            const {batterTableArr} = res
            setBatterTableArr(batterTableArr)
            setDraftArr(nextSaved.map(record => U.toUltiBatterDraft(record)))
          } // ::
          else {
            if (res.errMsg) {
              alert(`[DeleteBatterButton] ${res.errMsg}`)
            }
          }
        })
      },
    []
  )

  return (
    <button className={`DeleteBatterButton`} onClick={onClickButton(name, recordArr, recordIdx, tableOId)} type="button" {...props}>
      삭제
    </button>
  )
}
