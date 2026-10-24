import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useModalActions, useModalStates, useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as E from './elements'
import * as P from './parts'

import './AddUltiPitcherModal.scss'

type AddUltiPitcherModalProps = ModalCommonProps

export const AddUltiPitcherModal: FC<AddUltiPitcherModalProps> = ({...props}) => {
  const {addUltiPitcher_TableOId} = useModalStates()
  const {closeModal} = useModalActions()
  const {setPitcherTableArr} = useUltimateActions()
  const {addPitcherRecord} = useUltimateCallbacksContext()

  const [name, setName] = useState<string>('')

  const _submit = useCallback(
    (name: string, tableOId: string | null) => {
      if (!tableOId) {
        alert(`[AddUltiPitcherModal] tableOId is null`)
        return
      }

      const nextName = name.trim()
      if (!nextName) {
        alert(`[AddUltiPitcherModal] 이름을 입력하세요`)
        return
      }

      addPitcherRecord(nextName, tableOId).then(res => {
        if (res.isSuccess) {
          const {pitcherTableArr} = res
          setPitcherTableArr(pitcherTableArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddUltiPitcherModal] ${res.errMsg}`)
          }
        }
      })
    },
    [addPitcherRecord, closeModal, setPitcherTableArr]
  )

  const onClickSubmit = useCallback(
    (name: string, tableOId: string | null) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(name, tableOId)
    },
    [_submit]
  )

  const onKeyDownModal = useCallback(
    (name: string, tableOId: string | null) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          e.stopPropagation()
          _submit(name, tableOId)
          break
        case 'Escape':
          e.stopPropagation()
          closeModal()
          break
      }
    },
    [_submit, closeModal]
  )

  return (
    <Modal className={`AddUltiPitcherModal`} onClose={closeModal} onKeyDown={onKeyDownModal(name, addUltiPitcher_TableOId)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>투수 추가</p>

      {/* 2. 입력행: 이름 */}
      <E.InputRow label="이름">
        <input autoFocus={true} className={`Input_Modal`} onChange={e => setName(e.target.value)} tabIndex={0} type="text" value={name} />
      </E.InputRow>

      {/* 3. 버튼 행 */}
      <P.ButtonRowPart onClickCancel={closeModal} onClickSubmit={onClickSubmit(name, addUltiPitcher_TableOId)} submitText="추가" />
    </Modal>
  )
}
