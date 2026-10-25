import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {Setter, UltiPitcherDraftType} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

import './DeletePitcherButton.scss'

type DeletePitcherButtonProps = ButtonCommonProps & {
  name: string
  recordArr: (OT.UltiPitcherRecordType | UltiPitcherDraftType)[]
  recordIdx: number
  setDraftArr: Setter<UltiPitcherDraftType[]>
  tableOId: string
}

export const DeletePitcherButton: FC<DeletePitcherButtonProps> = ({name, recordArr, recordIdx, setDraftArr, tableOId, ...props}) => {
  const {setPitcherTableArr} = useUltimateActions()
  const {updatePitcherTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (name: string, recordArr: (OT.UltiPitcherRecordType | UltiPitcherDraftType)[], recordIdx: number, tableOId: string) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!confirm(`투수 "${name}" 을(를) 삭제할까요?`)) {
          return
        }

        const nextArr = recordArr.filter((_, idx) => idx !== recordIdx)
        const nextSaved = nextArr.map(record => U.fromUltiPitcherDraft(record))

        updatePitcherTable(nextSaved, tableOId).then(res => {
          if (res.isSuccess) {
            const {pitcherTableArr} = res
            setPitcherTableArr(pitcherTableArr)
            setDraftArr(nextSaved.map(record => U.toUltiPitcherDraft(record)))
          } // ::
          else {
            if (res.errMsg) {
              alert(`[DeletePitcherButton] ${res.errMsg}`)
            }
          }
        })
      },
    []
  )

  return (
    <button className={`DeletePitcherButton`} onClick={onClickButton(name, recordArr, recordIdx, tableOId)} type="button" {...props}>
      삭제
    </button>
  )
}
