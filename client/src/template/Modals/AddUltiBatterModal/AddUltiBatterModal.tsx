import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useModalActions, useModalStates, useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as E from './elements'
import * as P from './parts'

import './AddUltiBatterModal.scss'

type AddUltiBatterModalProps = ModalCommonProps

export const AddUltiBatterModal: FC<AddUltiBatterModalProps> = ({...props}) => {
  const {addUltiBatter_TableOId} = useModalStates()
  const {closeModal} = useModalActions()
  const {setBatterTableArr} = useUltimateActions()
  const {addBatterRecord} = useUltimateCallbacksContext()

  const [name, setName] = useState<string>('')

  const _submit = useCallback(
    (name: string, tableOId: string | null) => {
      if (!tableOId) {
        alert(`[AddUltiBatterModal] tableOId is null`)
        return
      }

      const nextName = name.trim()
      if (!nextName) {
        alert(`[AddUltiBatterModal] 이름을 입력하세요`)
        return
      }

      addBatterRecord(nextName, tableOId).then(res => {
        if (res.isSuccess) {
          const {batterTableArr} = res
          setBatterTableArr(batterTableArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddUltiBatterModal] ${res.errMsg}`)
          }
        }
      })
    },
    [addBatterRecord, closeModal, setBatterTableArr]
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
    <Modal className={`AddUltiBatterModal`} onClose={closeModal} onKeyDown={onKeyDownModal(name, addUltiBatter_TableOId)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>타자 추가</p>

      {/* 2. 입력행: 이름 */}
      <E.InputRow label="이름">
        <input autoFocus={true} className={`Input_Modal`} onChange={e => setName(e.target.value)} tabIndex={0} type="text" value={name} />
      </E.InputRow>

      {/* 3. 버튼 행 */}
      <P.ButtonRowPart onClickCancel={closeModal} onClickSubmit={onClickSubmit(name, addUltiBatter_TableOId)} submitText="추가" />
    </Modal>
  )
}
