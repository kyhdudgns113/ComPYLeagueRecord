import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useModalActions, useUltimateActions, useUltimateLeagueNum} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddPitcherTableModal.scss'

type AddPitcherTableModalProps = ModalCommonProps

export const AddPitcherTableModal: FC<AddPitcherTableModalProps> = ({...props}) => {
  const leagueNum = useUltimateLeagueNum()
  const {closeModal} = useModalActions()
  const {setPitcherTableArr} = useUltimateActions()
  const {addPitcherTable} = useUltimateCallbacksContext()

  const [gameLen, setGameLen] = useState<string>('')

  const _submit = useCallback(
    (gameLen: string, leagueNum: number | null) => {
      if (leagueNum === null) {
        alert(`[AddPitcherTableModal] 리그를 먼저 선택하세요`)
        return
      }

      const gameNum = parseInt(gameLen)
      if (isNaN(gameNum) || gameNum < 1) {
        alert(`[AddPitcherTableModal] 경기수는 1 이상이어야 합니다`)
        return
      }

      addPitcherTable(gameNum, leagueNum).then(res => {
        if (res.isSuccess) {
          const {pitcherTableArr} = res
          setPitcherTableArr(pitcherTableArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddPitcherTableModal] ${res.errMsg}`)
          }
        }
      })
    },
    []
  )

  const onClickSubmit = useCallback(
    (gameLen: string, leagueNum: number | null) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(gameLen, leagueNum)
    },
    []
  )

  const onKeyDownModal = useCallback(
    (gameLen: string, leagueNum: number | null) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          e.stopPropagation()
          _submit(gameLen, leagueNum)
          break
        case 'Escape':
          e.stopPropagation()
          closeModal()
          break
      }
    },
    []
  )

  return (
    <Modal className={`AddPitcherTableModal`} onClose={closeModal} onKeyDown={onKeyDownModal(gameLen, leagueNum)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>투수 기록 테이블 추가</p>

      {/* 2. 입력행: 경기수 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>경기수</p>
        <input autoFocus={true} className={`Input_Modal`} onChange={e => setGameLen(e.target.value)} tabIndex={0} type="number" value={gameLen} />
      </div>

      {/* 3. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(gameLen, leagueNum)} type="button">
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          취소
        </button>
      </div>
    </Modal>
  )
}
