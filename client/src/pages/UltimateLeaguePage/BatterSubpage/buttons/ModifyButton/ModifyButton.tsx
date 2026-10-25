import {useCallback} from 'react'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as OT from '@objectType'

import './ModifyButton.scss'

const roundTo = (value: number, digits: number) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

const withFixedRates = (record: OT.UltiBatterRecordType): OT.UltiBatterRecordType => {
  return {
    ...record,
    avg: roundTo(Number(record.avg) || 0, 3),
    ops: roundTo(Number(record.ops) || 0, 3),
    slg: roundTo(Number(record.slg) || 0, 3),
  }
}

type ModifyButtonProps = ButtonCommonProps & {
  batterTable: OT.UltiBatterTableType
  draftArr: OT.UltiBatterRecordType[]
  draftDesc: string
  isEdit: boolean
  setDraftArr: Setter<OT.UltiBatterRecordType[]>
  setDraftDesc: Setter<string>
  setIsEdit: Setter<boolean>
}

export const ModifyButton: FC<ModifyButtonProps> = ({
  batterTable,
  draftArr,
  draftDesc,
  isEdit,
  setDraftArr,
  setDraftDesc,
  setIsEdit,
  ...props
}) => {
  const {setBatterTableArr} = useUltimateActions()
  const {updateBatterTable} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (isEdit: boolean, draftArr: OT.UltiBatterRecordType[], draftDesc: string, batterTable: OT.UltiBatterTableType) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!isEdit) {
          setDraftArr(batterTable.recordArr.map(record => ({...record})))
          setDraftDesc(batterTable.desc || '')
          setIsEdit(true)
          return
        }

        const nextArr = draftArr.map(record => withFixedRates(record))

        updateBatterTable(nextArr, batterTable.tableOId, draftDesc).then(res => {
          if (res.isSuccess) {
            const {batterTableArr} = res
            setBatterTableArr(batterTableArr)
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
      onClick={onClickButton(isEdit, draftArr, draftDesc, batterTable)}
      type="button"
      {...props}
    >
      {isEdit ? '완료' : '수정'}
    </button>
  )
}
