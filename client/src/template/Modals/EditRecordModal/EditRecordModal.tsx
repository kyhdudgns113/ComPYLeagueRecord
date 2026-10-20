import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useModalActions, useModalStates, useRecordStates, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

import './EditRecordModal.scss'

const PITCH_ARR: CT.Type_Pitch[] = ['직구', '컷터', '투심', '싱커', '스플리터', '커브', '포크', '슬라이더', '체인지업', '써클 체인지업']
const LOCATION_ARR: CT.Type_Location[] = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'HL',
  'H1',
  'H2',
  'H3',
  'HR',
  'L1',
  'L4',
  'L7',
  'R3',
  'R6',
  'R9',
  'BL',
  'B7',
  'B8',
  'B9',
  'BR',
]
const RESULT_ARR: CT.Type_Result[] = ['1루타', '2루타', '3루타', '홈런', '삼진', '뜬공', '땅볼', '직선타', '병살', '에러', '도루실패', null]

type EditRecordModalProps = ModalCommonProps

export const EditRecordModal: FC<EditRecordModalProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {gameArr, gameNum, leagueNum} = useRecordStates()

  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const record = editRecord?.record || null

  const [pitcherName, setPitcherName] = useState<string>(record?.pitcherName || game?.SPName || pitcherArr[0]?.name || '')
  const [pitchArr, setPitchArr] = useState<OT.PitchType[]>(record?.pitchArr?.length ? record.pitchArr : [{ball: '직구', location: '5'}])
  const [result, setResult] = useState<CT.Type_Result>(record?.result ?? null)

  const isModify = !!record
  const batterName = record?.batterName || editRecord?.batter.name || ''

  const onClickAddPitch = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    setPitchArr(prev => [...prev, {ball: '직구', location: '5'}])
  }, [])

  const onClickRemovePitch = useCallback(
    (pitchIdx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setPitchArr(prev => prev.filter((_, idx) => idx !== pitchIdx))
    },
    []
  )

  const onChangePitchBall = useCallback(
    (pitchIdx: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const ball = e.target.value as CT.Type_Pitch
      setPitchArr(prev => prev.map((pitch, idx) => (idx === pitchIdx ? {...pitch, ball} : pitch)))
    },
    []
  )

  const onChangePitchLocation = useCallback(
    (pitchIdx: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const location = e.target.value as CT.Type_Location
      setPitchArr(prev => prev.map((pitch, idx) => (idx === pitchIdx ? {...pitch, location} : pitch)))
    },
    []
  )

  const onClickSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      closeModal()
    },
    [closeModal]
  )

  const onKeyDownModal = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal]
  )

  useEffect(() => {
    if (!pitcherName && (game?.SPName || pitcherArr[0]?.name)) {
      setPitcherName(game?.SPName || pitcherArr[0]?.name || '')
    }
  }, [game?.SPName, pitcherArr, pitcherName])

  return (
    <Modal className={`EditRecordModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`${editRecord?.order || ''}번 ${batterName} ${editRecord?.rotation || ''}타석 ${isModify ? '수정' : '추가'}`}</p>

      {/* 2. 입력행: 투수 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>투수</p>
        <select className={`Select_Modal`} onChange={e => setPitcherName(e.target.value)} value={pitcherName}>
          {pitcherArr.map(pitcher => (
            <option key={pitcher.pitcherOId} value={pitcher.name}>
              {pitcher.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. 입력행: 투구 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>투구</p>
        {pitchArr.map((pitch, pitchIdx) => (
          <div className={`Pitch_Row_Modal`} key={pitchIdx}>
            <select className={`Select_Modal`} onChange={onChangePitchBall(pitchIdx)} value={pitch.ball}>
              {PITCH_ARR.map(ball => (
                <option key={ball} value={ball}>
                  {ball}
                </option>
              ))}
            </select>
            <select className={`Select_Modal`} onChange={onChangePitchLocation(pitchIdx)} value={pitch.location}>
              {LOCATION_ARR.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
            <button className={`RemovePitch_Modal`} onClick={onClickRemovePitch(pitchIdx)} type="button">
              -
            </button>
          </div>
        ))}
        <button className={`AddPitch_Modal`} onClick={onClickAddPitch} type="button">
          투구 추가
        </button>
      </div>

      {/* 4. 입력행: 결과 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>결과</p>
        <select className={`Select_Modal`} onChange={e => setResult((e.target.value || null) as CT.Type_Result)} value={result || ''}>
          {RESULT_ARR.map(item => (
            <option key={item || 'empty'} value={item || ''}>
              {item || '없음'}
            </option>
          ))}
        </select>
      </div>

      {/* 5. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit}>
          {isModify ? '수정' : '추가'}
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
