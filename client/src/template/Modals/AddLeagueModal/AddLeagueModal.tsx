import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useLeagueArr, useModalActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddLeagueModal.scss'

type AddLeagueModalProps = ModalCommonProps

export const AddLeagueModal: FC<AddLeagueModalProps> = ({...props}) => {
  const leagueArr = useLeagueArr()
  const {closeModal} = useModalActions()

  const [description, setDescription] = useState<string>('')

  const newLeagueNum = leagueArr.length + 1

  const _submit = useCallback((newLeagueNum: number) => {
    //
  }, [])

  const onClickSubmit = useCallback(
    (newLeagueNum: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(newLeagueNum)
    },
    [_submit]
  )

  const onKeyDownModal = useCallback(
    (newLeagueNum: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          _submit(newLeagueNum)
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    [_submit]
  )

  return (
    <Modal className={`AddLeagueModal`} onClose={closeModal} onKeyDown={onKeyDownModal(newLeagueNum)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`리그 ${leagueArr.length + 1} 추가`}</p>

      {/* 2. 입력행: 설명 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>설명</p>
        <input
          autoFocus={true}
          className={`Input_Modal`}
          onChange={e => setDescription(e.target.value)}
          tabIndex={0}
          type="text"
          value={description}
        />
      </div>

      {/* 3. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(newLeagueNum)}>
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
