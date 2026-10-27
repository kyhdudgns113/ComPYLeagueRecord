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

const isSamePitchTypeArr = (a: CT.Type_Pitch[], b: CT.Type_Pitch[]) => {
  if (a.length !== b.length) {
    return false
  }

  const bSet = new Set(b)
  return a.every(item => bSet.has(item))
}

type ModifyPitcherModalProps = ModalCommonProps

export const ModifyPitcherModal: FC<ModifyPitcherModalProps> = ({...props}) => {
  const {modifyPitcher} = useModalStates()
  const {closeModal} = useModalActions()
  const {setTeamCPArr, setTeamRPArr, setTeamSPArr} = usePitcherActions()
  const {modifyPitcher: modifyPitcherApi} = useSettingCallbacksContext()

  const [name, setName] = useState<string>(modifyPitcher?.name || '')
  const [pitcherHand, setPitcherHand] = useState<CT.Type_PitcherHand>(modifyPitcher?.pitcherHand || '우완')
  const [pitchTypeArr, setPitchTypeArr] = useState<CT.Type_Pitch[]>(modifyPitcher?.pitchTypeArr || [])

  const _submit = useCallback((pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand, pitchTypeArr: CT.Type_Pitch[]) => {
    if (!pitcher) {
      alert(`[ModifyPitcherModal] pitcher is null`)
      return
    }

    if (name === pitcher.name && pitcherHand === pitcher.pitcherHand && isSamePitchTypeArr(pitchTypeArr, pitcher.pitchTypeArr || [])) {
      closeModal()
      return
    }

    const teamIdx = V.TEAM_IDX_MAP[pitcher.teamName]

    modifyPitcherApi({
      name,
      pitcherHand,
      pitcherOId: pitcher.pitcherOId,
      pitchTypeArr,
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

  const onClickPitchType = useCallback((ball: CT.Type_Pitch) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setPitchTypeArr(prev => (prev.includes(ball) ? prev.filter(item => item !== ball) : [...prev, ball]))
  }, [])

  const onClickSubmit = useCallback(
    (pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand, pitchTypeArr: CT.Type_Pitch[]) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        _submit(pitcher, name, pitcherHand, pitchTypeArr)
      },
    []
  )

  const onKeyDownModal = useCallback(
    (pitcher: OT.PitcherType | null, name: string, pitcherHand: CT.Type_PitcherHand, pitchTypeArr: CT.Type_Pitch[]) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'Enter':
            if ((e.target as HTMLElement).classList.contains('PitchType_Modal')) {
              return
            }
            _submit(pitcher, name, pitcherHand, pitchTypeArr)
            break
          case 'Escape':
            closeModal()
            break
        }
      },
    []
  )

  return (
    <Modal className={`ModifyPitcherModal`} onClose={closeModal} onKeyDown={onKeyDownModal(modifyPitcher, name, pitcherHand, pitchTypeArr)} {...props}>
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

      {/* 4. 입력행: 구종 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>구종</p>
        <div className={`PitchType_Grid_Modal`}>
          {V.PITCH_BTN_ARR.map(item => (
            <button
              className={`PitchType_Modal ${pitchTypeArr.includes(item.ball) ? 'selected' : ''}`}
              key={item.ball}
              onClick={onClickPitchType(item.ball)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 5. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(modifyPitcher, name, pitcherHand, pitchTypeArr)}>
          수정
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
