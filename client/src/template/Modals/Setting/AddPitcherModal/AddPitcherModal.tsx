import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useSettingCallbacksContext} from '@context'
import {useLeagueNumSetting, useModalActions, useModalStates, usePitcherActions, useTeamIdxSetting} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as LT from '@localType'
import * as V from '@value'

import './AddPitcherModal.scss'

const PITCHER_HAND_ARR: CT.Type_PitcherHand[] = ['좌완', '우완', '좌사', '우사', '좌언', '우언']

type AddPitcherModalProps = ModalCommonProps

export const AddPitcherModal: FC<AddPitcherModalProps> = ({...props}) => {
  const {addPitcher_PitcherType} = useModalStates()
  const {closeModal} = useModalActions()
  const {setTeamCPArr, setTeamRPArr, setTeamSPArr} = usePitcherActions()
  const leagueNum = useLeagueNumSetting()
  const teamIdx = useTeamIdxSetting()
  const {addPitcher} = useSettingCallbacksContext()

  const [name, setName] = useState<string>('')
  const [pitcherHand, setPitcherHand] = useState<CT.Type_PitcherHand>('우완')

  const teamName = teamIdx === null ? '' : V.TEAM_NAME[teamIdx]

  const _submit = useCallback(
    (leagueNum: LT.LeagueNumType, teamIdx: number | null, name: string, pitcherHand: CT.Type_PitcherHand, pitcherType: CT.Type_Pitcher | null) => {
      if (pitcherType === null) {
        alert(`[AddPitcherModal] pitcherType is null`)
        return
      }

      if (teamIdx === null) {
        alert(`[AddPitcherModal] teamIdx is null`)
        return
      }

      if (leagueNum === null) {
        alert(`[AddPitcherModal] leagueNum is null`)
        return
      }

      const teamName = V.TEAM_NAME[teamIdx]

      addPitcher({
        leagueNum,
        name,
        pitcherHand,
        pitcherType,
        teamName,
      }).then(res => {
        if (res.isSuccess) {
          const {pitcherArr} = res

          switch (pitcherType) {
            case '선발':
              setTeamSPArr(leagueNum, teamIdx, pitcherArr)
              break
            case '중계':
              setTeamRPArr(leagueNum, teamIdx, pitcherArr)
              break
            case '마무리':
              setTeamCPArr(leagueNum, teamIdx, pitcherArr)
              break
          }

          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddPitcherModal] ${res.errMsg}`)
          }
        }
      })
    },
    []
  )

  const onClickSubmit = useCallback(
    (leagueNum: LT.LeagueNumType, teamIdx: number | null, name: string, pitcherHand: CT.Type_PitcherHand, pitcherType: CT.Type_Pitcher | null) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        _submit(leagueNum, teamIdx, name, pitcherHand, pitcherType)
      },
    []
  )

  const onKeyDownModal = useCallback(
    (leagueNum: LT.LeagueNumType, teamIdx: number | null, name: string, pitcherHand: CT.Type_PitcherHand, pitcherType: CT.Type_Pitcher | null) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'Enter':
            _submit(leagueNum, teamIdx, name, pitcherHand, pitcherType)
            break
          case 'Escape':
            closeModal()
            break
        }
      },
    []
  )

  return (
    <Modal
      className={`AddPitcherModal`}
      onClose={closeModal}
      onKeyDown={onKeyDownModal(leagueNum, teamIdx, name, pitcherHand, addPitcher_PitcherType)}
      {...props}
    >
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`[리그 ${leagueNum || ''} ${teamName || ''}] ${addPitcher_PitcherType || ''} 투수 추가`}</p>

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
        <button className={`Button_Modal`} onClick={onClickSubmit(leagueNum, teamIdx, name, pitcherHand, addPitcher_PitcherType)}>
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
