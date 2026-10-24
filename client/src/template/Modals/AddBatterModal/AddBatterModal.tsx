import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useSettingCallbacksContext} from '@context'
import {useBatterActions, useLeagueNumSetting, useModalActions, useModalStates, useTeamIdxSetting} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as E from './elements'
import * as LT from '@localType'
import * as P from './parts'
import * as V from '@value'

import './AddBatterModal.scss'

const BATTER_HAND_ARR: CT.Type_BatterHand[] = ['좌타', '우타', '양타']

type AddBatterModalProps = ModalCommonProps

export const AddBatterModal: FC<AddBatterModalProps> = ({...props}) => {
  const {addBatter_BatterClass} = useModalStates()
  const {closeModal} = useModalActions()
  const {setTeamMainBatterArr, setTeamSubBatterArr} = useBatterActions()
  const leagueNum = useLeagueNumSetting()
  const teamIdx = useTeamIdxSetting()
  const {addBatter} = useSettingCallbacksContext()

  const [name, setName] = useState<string>('')
  const [batterHand, setBatterHand] = useState<CT.Type_BatterHand>('우타')
  const [hasPressureSkill, setHasPressureSkill] = useState<boolean>(false)

  const teamName = teamIdx === null ? '' : V.TEAM_NAME[teamIdx]

  const _submit = useCallback(
    (
      leagueNum: LT.LeagueNumType,
      teamIdx: number | null,
      name: string,
      batterHand: CT.Type_BatterHand,
      hasPressureSkill: boolean,
      batterClass: CT.Type_BatterClass | null
    ) => {
      if (batterClass === null) {
        alert(`[AddBatterModal] batterClass is null`)
        return
      }

      if (teamIdx === null) {
        alert(`[AddBatterModal] teamIdx is null`)
        return
      }

      if (leagueNum === null) {
        alert(`[AddBatterModal] leagueNum is null`)
        return
      }

      const teamName = V.TEAM_NAME[teamIdx]

      addBatter({
        batterClass,
        batterHand,
        batterNum: 0,
        hasPressureSkill,
        leagueNum,
        name,
        teamName,
      }).then(res => {
        if (res.isSuccess) {
          const {batterArr} = res

          switch (batterClass) {
            case '선발':
              setTeamMainBatterArr(leagueNum, teamIdx, batterArr)
              break
            case '후보':
              setTeamSubBatterArr(leagueNum, teamIdx, batterArr)
              break
          }

          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddBatterModal] ${res.errMsg}`)
          }
        }
      })
    },
    []
  )

  const onClickSubmit = useCallback(
    (
      leagueNum: LT.LeagueNumType,
      teamIdx: number | null,
      name: string,
      batterHand: CT.Type_BatterHand,
      hasPressureSkill: boolean,
      batterClass: CT.Type_BatterClass | null
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        _submit(leagueNum, teamIdx, name, batterHand, hasPressureSkill, batterClass)
      },
    []
  )

  const onKeyDownModal = useCallback(
    (
      leagueNum: LT.LeagueNumType,
      teamIdx: number | null,
      name: string,
      batterHand: CT.Type_BatterHand,
      hasPressureSkill: boolean,
      batterClass: CT.Type_BatterClass | null
    ) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'Enter':
            _submit(leagueNum, teamIdx, name, batterHand, hasPressureSkill, batterClass)
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
      className={`AddBatterModal`}
      onClose={closeModal}
      onKeyDown={onKeyDownModal(leagueNum, teamIdx, name, batterHand, hasPressureSkill, addBatter_BatterClass)}
      {...props}
    >
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`[리그 ${leagueNum || ''} ${teamName || ''}] ${addBatter_BatterClass || ''} 타자 추가`}</p>

      {/* 2. 입력행: 이름 */}
      <E.InputRow label="이름">
        <input autoFocus={true} className={`Input_Modal`} onChange={e => setName(e.target.value)} tabIndex={0} type="text" value={name} />
      </E.InputRow>

      {/* 3. 입력행: 타격 유형 */}
      <E.InputRow label="유형">
        <select className={`Select_Modal`} onChange={e => setBatterHand(e.target.value as CT.Type_BatterHand)} value={batterHand}>
          {BATTER_HAND_ARR.map(hand => (
            <option key={hand} value={hand}>
              {hand}
            </option>
          ))}
        </select>
      </E.InputRow>

      {/* 4. 입력행: 위압감 */}
      <E.InputRow label="위압감">
        <div
          className={`PressureToggle_Modal ${hasPressureSkill ? '_on' : ''}`}
          onClick={e => {
            e.stopPropagation()
            setHasPressureSkill(prev => !prev)
          }}
        >
          {hasPressureSkill ? '있음' : '없음'}
        </div>
      </E.InputRow>

      {/* 5. 버튼 행 */}
      <P.ButtonRowPart
        onClickCancel={closeModal}
        onClickSubmit={onClickSubmit(leagueNum, teamIdx, name, batterHand, hasPressureSkill, addBatter_BatterClass)}
        submitText="추가"
      />
    </Modal>
  )
}
