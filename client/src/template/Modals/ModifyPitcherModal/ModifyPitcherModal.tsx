import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useSettingCallbacksContext} from '@context'
import {useModalActions, useModalStates, usePitcherActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

import './ModifyPitcherModal.scss'

const PITCHER_HAND_ARR: CT.Type_PitcherHand[] = ['좌완', '우완', '좌사', '우사', '좌언', '우언']

type ModifyPitcherModalProps = ModalCommonProps

export const ModifyPitcherModal: FC<ModifyPitcherModalProps> = ({...props}) => {
  const {modifyPitcher} = useModalStates()
  const {closeModal} = useModalActions()
  const {setTeamCPArr, setTeamRPArr, setTeamSPArr} = usePitcherActions()
  const {modifyPitcher: modifyPitcherApi} = useSettingCallbacksContext()

  const [name, setName] = useState<string>(modifyPitcher?.name || '')
  const [pitcherHand, setPitcherHand] = useState<CT.Type_PitcherHand>(modifyPitcher?.pitcherHand || '우완')

  const _submit = useCallback((pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand) => {
    if (!pitcher) {
      alert(`[ModifyPitcherModal] pitcher is null`)
      return
    }

    if (name === pitcher.name && pitcherHand === pitcher.pitcherHand) {
      closeModal()
      return
    }

    const teamIdx = V.TEAM_IDX_MAP[pitcher.teamName]

    modifyPitcherApi({
      name,
      pitcherHand,
      pitcherOId: pitcher.pitcherOId,
    }).then(res => {
      if (res.isSuccess) {
        const {pitcherArr} = res

        switch (pitcher.pitcherType) {
          case '선발':
            setTeamSPArr(pitcher.leagueNum, teamIdx, pitcherArr)
            break
          case '중계':
            setTeamRPArr(pitcher.leagueNum, teamIdx, pitcherArr)
            break
          case '마무리':
            setTeamCPArr(pitcher.leagueNum, teamIdx, pitcherArr)
            break
        }

        closeModal()
      } // ::
      else {
        if (res.errMsg) {
          alert(`[ModifyPitcherModal] ${res.errMsg}`)
        }
      }
    })
  }, [])

  const onClickSubmit = useCallback(
    (pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(pitcher, name, pitcherHand)
    },
    []
  )

  const onKeyDownModal = useCallback(
    (pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          _submit(pitcher, name, pitcherHand)
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    []
  )

  return (
    <Modal className={`ModifyPitcherModal`} onClose={closeModal} onKeyDown={onKeyDownModal(modifyPitcher, name, pitcherHand)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`[리그 ${modifyPitcher?.leagueNum || ''} ${modifyPitcher?.teamName || ''}] ${
        modifyPitcher?.name || ''
      } 정보 수정`}</p>

      {/* 2. 입력행: 이름 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>이름</p>
        <input autoFocus={true} className={`Input_Modal`} onChange={e => setName(e.target.value)} tabIndex={0} type="text" value={name} />
      </div>

      {/* 3. 입력행: 투구 유형 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>유형</p>
        <select className={`Select_Modal`} onChange={e => setPitcherHand(e.target.value as CT.Type_PitcherHand)} value={pitcherHand}>
          {PITCHER_HAND_ARR.map(hand => (
            <option key={hand} value={hand}>
              {hand}
            </option>
          ))}
        </select>
      </div>

      {/* 4. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(modifyPitcher, name, pitcherHand)}>
          수정
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
