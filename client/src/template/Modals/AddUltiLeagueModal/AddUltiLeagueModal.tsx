import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useModalActions, useUltimateActions, useUltimateLeagueArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddUltiLeagueModal.scss'

type AddUltiLeagueModalProps = ModalCommonProps

export const AddUltiLeagueModal: FC<AddUltiLeagueModalProps> = ({...props}) => {
  const leagueArr = useUltimateLeagueArr()
  const {closeModal} = useModalActions()
  const {setLeagueArrUlti} = useUltimateActions()
  const {addLeague} = useUltimateCallbacksContext()

  const [description, setDescription] = useState<string>('')

  const newLeagueNum = Math.max(0, ...leagueArr.map(league => league.leagueNum)) + 1

  const _submit = useCallback(
    (description: string, newLeagueNum: number) => {
      addLeague(description, newLeagueNum).then(res => {
        if (res.isSuccess) {
          const {leagueArr} = res
          setLeagueArrUlti(leagueArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddUltiLeagueModal] ${res.errMsg}`)
          }
        }
      })
    },
    [addLeague, closeModal, setLeagueArrUlti]
  )

  const onClickSubmit = useCallback(
    (description: string, newLeagueNum: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(description, newLeagueNum)
    },
    [_submit]
  )

  const onKeyDownModal = useCallback(
    (description: string, newLeagueNum: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          _submit(description, newLeagueNum)
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    [_submit, closeModal]
  )

  return (
    <Modal className={`AddUltiLeagueModal`} onClose={closeModal} onKeyDown={onKeyDownModal(description, newLeagueNum)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`얼티리그 ${newLeagueNum} 추가`}</p>

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
        <button className={`Button_Modal`} onClick={onClickSubmit(description, newLeagueNum)} type="button">
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          취소
        </button>
      </div>
    </Modal>
  )
}
