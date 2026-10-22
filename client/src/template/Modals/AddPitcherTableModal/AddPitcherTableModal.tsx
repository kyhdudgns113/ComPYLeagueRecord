import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddPitcherTableModal.scss'

type AddPitcherTableModalProps = ModalCommonProps

export const AddPitcherTableModal: FC<AddPitcherTableModalProps> = ({...props}) => {
  const {closeModal} = useModalActions()

  const [gameLen, setGameLen] = useState<string>('')

  const onClickSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      closeModal()
    },
    [closeModal]
  )

  const onKeyDownModal = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          closeModal()
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    [closeModal]
  )

  return (
    <Modal className={`AddPitcherTableModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>투수 기록 테이블 추가</p>

      {/* 2. 입력행: 경기수 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>경기수</p>
        <input
          autoFocus={true}
          className={`Input_Modal`}
          onChange={e => setGameLen(e.target.value)}
          tabIndex={0}
          type="number"
          value={gameLen}
        />
      </div>

      {/* 3. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit} type="button">
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          취소
        </button>
      </div>
    </Modal>
  )
}
