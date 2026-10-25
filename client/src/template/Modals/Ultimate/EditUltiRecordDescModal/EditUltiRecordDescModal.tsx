import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useModalActions, useModalStates, useUltimateActions, useUltimateBatterTableArr, useUltimatePitcherTableArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as LT from '@localType'
import * as OT from '@objectType'

import './EditUltiRecordDescModal.scss'

type EditUltiRecordDescModalProps = ModalCommonProps

export const EditUltiRecordDescModal: FC<EditUltiRecordDescModalProps> = ({...props}) => {
  const {editUltiRecordDesc} = useModalStates()
  const {closeModal} = useModalActions()
  const {setBatterTableArr, setPitcherTableArr} = useUltimateActions()
  const {updateBatterTable, updatePitcherTable} = useUltimateCallbacksContext()
  const batterTableArr = useUltimateBatterTableArr()
  const pitcherTableArr = useUltimatePitcherTableArr()

  const kind = editUltiRecordDesc?.kind || 'pitcher'
  const recordIdx = editUltiRecordDesc?.recordIdx ?? -1
  const tableOId = editUltiRecordDesc?.tableOId || ''

  const batterTable = batterTableArr.find(table => table.tableOId === tableOId) || null
  const pitcherTable = pitcherTableArr.find(table => table.tableOId === tableOId) || null
  const batterRecord = batterTable?.recordArr[recordIdx] || null
  const pitcherRecord = pitcherTable?.recordArr[recordIdx] || null
  const recordName = kind === 'batter' ? batterRecord?.name || '' : pitcherRecord?.name || ''
  const initialDesc = kind === 'batter' ? batterRecord?.desc || '' : pitcherRecord?.desc || ''

  const [desc, setDesc] = useState<string>(initialDesc)

  const _submit = useCallback(
    (
      batterTableArr: OT.UltiBatterTableType[],
      desc: string,
      kind: LT.EditUltiRecordDescPayload['kind'],
      pitcherTableArr: OT.UltiPitcherTableType[],
      recordIdx: number,
      tableOId: string
    ) => {
      if (!tableOId || recordIdx < 0) {
        alert(`[EditUltiRecordDescModal] 대상 선수를 찾지 못했습니다.`)
        return
      }

      if (kind === 'batter') {
        const table = batterTableArr.find(item => item.tableOId === tableOId)
        if (!table || !table.recordArr[recordIdx]) {
          alert(`[EditUltiRecordDescModal] 타자 기록을 찾지 못했습니다.`)
          return
        }

        const nextArr: OT.UltiBatterRecordType[] = table.recordArr.map((item, idx) => {
          if (idx !== recordIdx) {
            return item
          }
          return {...item, desc}
        })

        updateBatterTable(nextArr, tableOId).then(res => {
          if (res.isSuccess) {
            setBatterTableArr(res.batterTableArr)
            closeModal()
          } // ::
          else {
            if (res.errMsg) {
              alert(`[EditUltiRecordDescModal] ${res.errMsg}`)
            }
          }
        })
        return
      }

      const table = pitcherTableArr.find(item => item.tableOId === tableOId)
      if (!table || !table.recordArr[recordIdx]) {
        alert(`[EditUltiRecordDescModal] 투수 기록을 찾지 못했습니다.`)
        return
      }

      const nextArr: OT.UltiPitcherRecordType[] = table.recordArr.map((item, idx) => {
        if (idx !== recordIdx) {
          return item
        }
        return {...item, desc}
      })

      updatePitcherTable(nextArr, tableOId).then(res => {
        if (res.isSuccess) {
          setPitcherTableArr(res.pitcherTableArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[EditUltiRecordDescModal] ${res.errMsg}`)
          }
        }
      })
    },
    []
  )

  const onChangeDesc = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    setDesc(e.target.value)
  }, [])

  const onClickSubmit = useCallback(
    (
      batterTableArr: OT.UltiBatterTableType[],
      desc: string,
      kind: LT.EditUltiRecordDescPayload['kind'],
      pitcherTableArr: OT.UltiPitcherTableType[],
      recordIdx: number,
      tableOId: string
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        _submit(batterTableArr, desc, kind, pitcherTableArr, recordIdx, tableOId)
      },
    []
  )

  const onKeyDownModal = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Escape':
        e.stopPropagation()
        closeModal()
        break
    }
  }, [])

  return (
    <Modal className={`EditUltiRecordDescModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`${recordName || '선수'} 메모`}</p>

      {/* 2. 입력행: desc */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>desc</p>
        <textarea autoFocus={true} className={`Textarea_Modal`} onChange={onChangeDesc} tabIndex={0} value={desc} />
      </div>

      {/* 3. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(batterTableArr, desc, kind, pitcherTableArr, recordIdx, tableOId)} type="button">
          저장
        </button>
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          취소
        </button>
      </div>
    </Modal>
  )
}
