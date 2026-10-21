import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useRecordCallbacksContext} from '@context'
import {useModalActions, useModalStates, useRecordActions, useRecordStates, useTeamBatterArr, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as HTTP from '@httpType'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

import './EditRecordModal.scss'

type TabType = '기록' | '정보'

const ZONE_GRID: CT.Type_Location[][] = [
  ['HL', 'H1', 'H2', 'H3', 'HR'],
  ['L1', '1', '2', '3', 'R3'],
  ['L4', '4', '5', '6', 'R6'],
  ['L7', '7', '8', '9', 'R9'],
  ['BL', 'B7', 'B8', 'B9', 'BR'],
]
const STRIKE_ZONE_SET = new Set<CT.Type_Location>(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
const PITCH_BTN_ARR: {ball: CT.Type_Pitch; label: string}[] = [
  {ball: '직구', label: '직구'},
  {ball: '컷터', label: '컷터'},
  {ball: '투심', label: '투심'},
  {ball: '싱커', label: '싱커'},
  {ball: '스플리터', label: '스플'},
  {ball: '슬라이더', label: '슬라'},
  {ball: '커브', label: '커브'},
  {ball: '포크', label: '포크'},
  {ball: '체인지업', label: '체인지'},
  {ball: '써클 체인지업', label: '써클'},
]
const RESULT_ARR: CT.Type_Result[] = ['1루타', '2루타', '3루타', '홈런', '볼넷', '삼진', '뜬공', '땅볼', '직선타', '병살', '에러', null]
const ON_BASE_RESULT_ARR: CT.Type_Result[] = ['1루타', '2루타', '3루타', '볼넷', '에러']

const canStealFail = (nextResult: CT.Type_Result) => ON_BASE_RESULT_ARR.includes(nextResult)
const ORDER_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const isRecordedAtBat = (record: OT.RecordElementType | null) => {
  if (!record) {
    return false
  }

  return record.pitchArr.length > 0 || record.result !== null || record.isStealFail
}

const getRecentPitcherName = (
  recordArr: OT.RecordElementType[],
  current: {order: number; rotation: number} | null,
  fallback: string
) => {
  if (!current) {
    return fallback
  }

  let recentPitcherName = fallback
  const maxRotation = Math.max(current.rotation, ...recordArr.map(record => record.rotation || 0))

  for (let rotation = 1; rotation <= maxRotation; rotation++) {
    for (const order of ORDER_ARR) {
      if (rotation === current.rotation && order === current.order) {
        return recentPitcherName
      }

      const item = recordArr.find(record => record.order === order && record.rotation === rotation) || null
      if (isRecordedAtBat(item) && item?.pitcherName) {
        recentPitcherName = item.pitcherName
      }
    }
  }

  return recentPitcherName
}

type EditRecordModalProps = ModalCommonProps

export const EditRecordModal: FC<EditRecordModalProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const {updateRecord} = useRecordCallbacksContext()

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const enemyTeamIdx = game ? V.TEAM_IDX_MAP[game.enemyTeam] : -1
  const record = editRecord?.record || null

  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]

  const mainBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '선발')
  const subBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '후보')
  const batterArr = [...mainBatterArr, ...subBatterArr]

  const [tab, setTab] = useState<TabType>('기록')
  const [pitchArr, setPitchArr] = useState<OT.PitchType[]>(record?.pitchArr || [])
  const [selectedBall, setSelectedBall] = useState<CT.Type_Pitch | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<CT.Type_Location | null>(null)
  const fallbackPitcherName = record?.pitcherName || game?.SPName || pitcherArr[0]?.name || ''
  const [pitcherName, setPitcherName] = useState<string>(
    isRecordedAtBat(record)
      ? record?.pitcherName || fallbackPitcherName
      : getRecentPitcherName(
          recordArr,
          editRecord ? {order: editRecord.order, rotation: editRecord.rotation} : null,
          fallbackPitcherName
        )
  )
  const [batterOId, setBatterOId] = useState<string>(record?.batterOId || editRecord?.batter.batterOId || '')
  const [result, setResult] = useState<CT.Type_Result>(record?.result ?? null)
  const [isStealFail, setIsStealFail] = useState<boolean>(!!record?.isStealFail && canStealFail(record?.result ?? null))

  const selectedBatter =
    batterArr.find(batter => batter.batterOId === batterOId) ||
    (editRecord?.batter.batterOId === batterOId ? editRecord.batter : null) ||
    editRecord?.batter ||
    null

  const _buildRecord = useCallback(
    (nextPitchArr: OT.PitchType[], nextPitcherName: string, nextResult: CT.Type_Result, batter: OT.BatterType | null) => {
      const nextRecord: OT.RecordElementType = {
        batterClass: batter?.batterClass || record?.batterClass || '선발',
        batterHand: batter?.batterHand || record?.batterHand || '우타',
        batterName: batter?.name || record?.batterName || '',
        batterOId: batter?.batterOId || record?.batterOId || '',
        gameNum: gameNum || 0,
        hasPressure: batter?.hasPressureSkill ?? record?.hasPressure ?? false,
        isStealFail: canStealFail(nextResult) && isStealFail,
        leagueNum: leagueNum || 0,
        order: editRecord?.order || 0,
        pitchArr: nextPitchArr,
        pitcherName: nextPitcherName,
        result: nextResult,
        rotation: editRecord?.rotation || 0,
      }
      return nextRecord
    },
    [editRecord?.order, editRecord?.rotation, gameNum, isStealFail, leagueNum, record]
  )

  const _saveRecord = useCallback(
    (
      nextPitchArr: OT.PitchType[],
      nextPitcherName: string,
      nextResult: CT.Type_Result,
      batter: OT.BatterType | null,
      closeAfter: boolean,
      clearSelection: boolean
    ) => {
      if (gameNum === null || leagueNum === null || !editRecord) {
        alert(`[EditRecordModal] gameNum or leagueNum is null`)
        return
      }

      const nextRecord = _buildRecord(nextPitchArr, nextPitcherName, nextResult, batter)
      const data: HTTP.HTTP_UpdateRecord = {
        gameNum,
        leagueNum,
        order: editRecord.order,
        record: nextRecord,
        rotation: editRecord.rotation,
      }

      updateRecord(data).then(res => {
        if (res.isSuccess) {
          const {recordArr} = res
          setRecordArr(recordArr)
          setPitchArr(nextPitchArr)

          if (clearSelection) {
            setSelectedBall(null)
            setSelectedLocation(null)
          }

          if (closeAfter) {
            closeModal()
          }
        } // ::
        else {
          if (res.errMsg) {
            alert(`[EditRecordModal] ${res.errMsg}`)
          }
        }
      })
    },
    [_buildRecord, closeModal, editRecord, gameNum, leagueNum, setRecordArr, updateRecord]
  )

  const onClickTab = useCallback(
    (nextTab: TabType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setTab(nextTab)
    },
    []
  )

  const onClickLocation = useCallback(
    (location: CT.Type_Location) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setSelectedLocation(prev => (prev === location ? null : location))
    },
    []
  )

  const onClickBall = useCallback(
    (ball: CT.Type_Pitch) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setSelectedBall(prev => (prev === ball ? null : ball))
    },
    []
  )

  const onClickAddPitch = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!selectedBall || !selectedLocation) {
        alert(`[EditRecordModal] 구종과 위치를 선택하세요`)
        return
      }

      _saveRecord([...pitchArr, {ball: selectedBall, location: selectedLocation}], pitcherName, result, selectedBatter, false, true)
    },
    [_saveRecord, pitchArr, pitcherName, result, selectedBall, selectedBatter, selectedLocation]
  )

  const onClickRemoveLastPitch = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (pitchArr.length === 0) {
        return
      }

      _saveRecord(pitchArr.slice(0, -1), pitcherName, result, selectedBatter, false, false)
    },
    [_saveRecord, pitchArr, pitcherName, result, selectedBatter]
  )

  const onClickSaveInfo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _saveRecord(pitchArr, pitcherName, result, selectedBatter, true, false)
    },
    [_saveRecord, pitchArr, pitcherName, result, selectedBatter]
  )

  const onChangeBatter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBatterOId(e.target.value)
  }, [])

  const onChangeResult = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextResult = (e.target.value || null) as CT.Type_Result
    setResult(nextResult)

    if (!canStealFail(nextResult)) {
      setIsStealFail(false)
    }
  }, [])

  const onClickStealFail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!canStealFail(result)) {
        return
      }

      setIsStealFail(prev => !prev)
    },
    [result]
  )

  const onKeyDownModal = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal]
  )

  return (
    <Modal className={`EditRecordModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 탭 행 */}
      <div className={`Tab_Row_Modal`}>
        <button className={`Tab_Modal ${tab === '기록' ? 'selected' : ''}`} onClick={onClickTab('기록')} type="button">
          기록
        </button>
        <button className={`Tab_Modal ${tab === '정보' ? 'selected' : ''}`} onClick={onClickTab('정보')} type="button">
          정보
        </button>
      </div>

      {tab === '기록' && (
        <div className={`RecordTab_Modal`}>
          {/* 2. 투구 로그 */}
          <div className={`PitchLog_Row_Modal`}>
            <p className={`PitchLog_Modal`}>{pitchArr.map(pitch => U.convertPitchLog(pitch)).join(', ') || ' '}</p>
            <button className={`RemoveLast_Modal`} disabled={pitchArr.length === 0} onClick={onClickRemoveLastPitch} type="button">
              삭제
            </button>
          </div>

          {/* 3. 존 판 */}
          <div className={`Zone_Grid_Modal`}>
            {ZONE_GRID.map((row, rowIdx) => (
              <div className={`Zone_Row_Modal`} key={rowIdx}>
                {row.map(location => (
                  <button
                    className={`Zone_Cell_Modal ${STRIKE_ZONE_SET.has(location) ? 'strike' : 'ball'} ${
                      selectedLocation === location ? 'selected' : ''
                    }`}
                    key={location}
                    onClick={onClickLocation(location)}
                    type="button"
                  >
                    {location}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* 4. 구종 판 */}
          <div className={`PitchType_Grid_Modal`}>
            {PITCH_BTN_ARR.map(item => (
              <button
                className={`PitchType_Modal ${selectedBall === item.ball ? 'selected' : ''}`}
                key={item.ball}
                onClick={onClickBall(item.ball)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* 5. 버튼 행 */}
          <div className={`Button_Row_Modal`}>
            <button className={`Button_Modal`} onClick={onClickAddPitch} type="button">
              추가
            </button>
            <button className={`Button_Modal`} onClick={closeModal} type="button">
              닫기
            </button>
          </div>
        </div>
      )}

      {tab === '정보' && (
        <div className={`InfoTab_Modal`}>
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

          {/* 3. 입력행: 타자 */}
          <div className={`Input_Row_Modal`}>
            <p className={`Input_Label_Modal`}>타자</p>
            <select className={`Select_Modal`} onChange={onChangeBatter} value={batterOId}>
              <optgroup label="선발">
                {mainBatterArr.map(batter => (
                  <option key={batter.batterOId} value={batter.batterOId}>
                    {batter.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="후보">
                {subBatterArr.map(batter => (
                  <option key={batter.batterOId} value={batter.batterOId}>
                    {batter.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* 4. 입력행: 결과 */}
          <div className={`Input_Row_Modal`}>
            <p className={`Input_Label_Modal`}>결과</p>
            <select className={`Select_Modal`} onChange={onChangeResult} value={result || ''}>
              {RESULT_ARR.map(item => (
                <option key={item || 'empty'} value={item || ''}>
                  {item || '없음'}
                </option>
              ))}
            </select>
          </div>

          {/* 5. 입력행: 도루실패 */}
          <div className={`Input_Row_Modal`}>
            <p className={`Input_Label_Modal`}>도루실패</p>
            <button
              className={`StealFailToggle_Modal ${isStealFail ? '_on' : ''}`}
              disabled={!canStealFail(result)}
              onClick={onClickStealFail}
              type="button"
            >
              {isStealFail ? '실패' : '없음'}
            </button>
          </div>

          {/* 6. 버튼 행 */}
          <div className={`Button_Row_Modal`}>
            <button className={`Button_Modal`} onClick={onClickSaveInfo} type="button">
              추가
            </button>
            <button className={`Button_Modal`} onClick={closeModal} type="button">
              닫기
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}
