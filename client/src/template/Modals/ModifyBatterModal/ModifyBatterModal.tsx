import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useSettingCallbacksContext} from '@context'
import {useBatterActions, useModalActions, useModalStates, useRecordActions, useRecordStates} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as E from './elements'
import * as OT from '@objectType'
import * as P from './parts'
import * as V from '@value'

import './ModifyBatterModal.scss'

const BATTER_HAND_ARR: CT.Type_BatterHand[] = ['좌타', '우타', '양타']

type ModifyBatterModalProps = ModalCommonProps

export const ModifyBatterModal: FC<ModifyBatterModalProps> = ({...props}) => {
  const {modifyBatter} = useModalStates()
  const {closeModal} = useModalActions()
  const {setTeamMainBatterArr, setTeamSubBatterArr} = useBatterActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, recordArr} = useRecordStates()
  const {modifyBatter: modifyBatterApi} = useSettingCallbacksContext()

  const [name, setName] = useState<string>(modifyBatter?.name || '')
  const [batterHand, setBatterHand] = useState<CT.Type_BatterHand>(modifyBatter?.batterHand || '우타')
  const [hasPressureSkill, setHasPressureSkill] = useState<boolean>(modifyBatter?.hasPressureSkill || false)

  const _submit = useCallback(
    (batter: OT.BatterType | null, name: string, batterHand: CT.Type_BatterHand, hasPressureSkill: boolean) => {
      if (!batter) {
        alert(`[ModifyBatterModal] batter is null`)
        return
      }

      if (name === batter.name && batterHand === batter.batterHand && hasPressureSkill === batter.hasPressureSkill) {
        closeModal()
        return
      }

      const teamIdx = V.TEAM_IDX_MAP[batter.teamName]

      modifyBatterApi({
        batterHand,
        batterOId: batter.batterOId,
        hasPressureSkill,
        name,
      }).then(res => {
        if (res.isSuccess) {
          const {batterArr} = res

          switch (batter.batterClass) {
            case '선발':
              setTeamMainBatterArr(batter.leagueNum, teamIdx, batterArr)
              break
            case '후보':
              setTeamSubBatterArr(batter.leagueNum, teamIdx, batterArr)
              break
          }

          const game = gameArr.find(item => item.gameNum === gameNum) || null
          if (game && game.enemyTeam === batter.teamName) {
            setRecordArr(
              recordArr.map(record => {
                if (record.batterOId === batter.batterOId || (!record.batterOId && record.batterName === batter.name)) {
                  return {
                    ...record,
                    batterClass: batter.batterClass,
                    batterHand,
                    batterName: name,
                    batterOId: batter.batterOId,
                    hasPressure: hasPressureSkill,
                  }
                }
                return record
              })
            )
          }

          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[ModifyBatterModal] ${res.errMsg}`)
          }
        }
      })
    },
    [closeModal, gameArr, gameNum, modifyBatterApi, recordArr, setRecordArr, setTeamMainBatterArr, setTeamSubBatterArr]
  )

  const onClickSubmit = useCallback(
    (batter: OT.BatterType | null, name: string, batterHand: CT.Type_BatterHand, hasPressureSkill: boolean) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        _submit(batter, name, batterHand, hasPressureSkill)
      },
    []
  )

  const onKeyDownModal = useCallback(
    (batter: OT.BatterType | null, name: string, batterHand: CT.Type_BatterHand, hasPressureSkill: boolean) =>
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.key) {
          case 'Enter':
            _submit(batter, name, batterHand, hasPressureSkill)
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
      className={`ModifyBatterModal`}
      onClose={closeModal}
      onKeyDown={onKeyDownModal(modifyBatter, name, batterHand, hasPressureSkill)}
      {...props}
    >
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`[리그 ${modifyBatter?.leagueNum || ''} ${modifyBatter?.teamName || ''}] ${
        modifyBatter?.name || ''
      } 정보 수정`}</p>

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
      <P.ButtonRowPart onClickCancel={closeModal} onClickSubmit={onClickSubmit(modifyBatter, name, batterHand, hasPressureSkill)} submitText="수정" />
    </Modal>
  )
}
