import {useCallback, useEffect, useEffectEvent, useState} from 'react'

import {Modal} from '@component'
import {useRecordCallbacksContext} from '@context'
import {useModalActions, useModalStates, useRecordActions, useRecordStates, useTeamBatterArr, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'
import type {TabType} from './parts'

import * as CT from '@commonType'
import * as HTTP from '@httpType'
import * as OT from '@objectType'
import * as P from './parts'
import * as U from '@util'
import * as V from '@value'

import './EditRecordModal.scss'

type EditRecordModalProps = ModalCommonProps

export const EditRecordModal: FC<EditRecordModalProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const {updateRecord} = useRecordCallbacksContext()

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const enemyTeamIdx = game ? V.TEAM_IDX_MAP[game.enemyTeam] : -1
  const record = editRecord?.record || null
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]
  const mainBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '선발')
  const subBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '후보')
  const batterArr = [...mainBatterArr, ...subBatterArr]
  const fallbackPitcherName = record?.pitcherName || game?.SPName || pitcherArr[0]?.name || ''

  const [tab, setTab] = useState<TabType>('기록')
  const [pitchArr, setPitchArr] = useState<OT.PitchType[]>([])
  const [selectedBall, setSelectedBall] = useState<CT.Type_Pitch | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<CT.Type_Location | null>(null)
  const [pitcherName, setPitcherName] = useState<string>('')
  const [batterOId, setBatterOId] = useState<string>('')
  const [result, setResult] = useState<CT.Type_Result>(null)
  const [isStealFail, setIsStealFail] = useState<boolean>(false)

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
        isStealFail: U.canStealFail(nextResult) && isStealFail,
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

  const onChangePitcher = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPitcherName(e.target.value)
  }, [])

  const onChangeBatter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBatterOId(e.target.value)
  }, [])

  const onChangeResult = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextResult = (e.target.value || null) as CT.Type_Result
    setResult(nextResult)

    if (!U.canStealFail(nextResult)) {
      setIsStealFail(false)
    }
  }, [])

  const onClickStealFail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!U.canStealFail(result)) {
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

  const initForm = useEffectEvent(() => {
    const nextPitcherName = U.isRecordedAtBat(record)
      ? record?.pitcherName || fallbackPitcherName
      : U.getRecentPitcherName(recordArr, editRecord ? {order: editRecord.order, rotation: editRecord.rotation} : null, fallbackPitcherName)

    setTab('기록')
    setPitchArr(record?.pitchArr || [])
    setSelectedBall(null)
    setSelectedLocation(null)
    setPitcherName(nextPitcherName)
    setBatterOId(record?.batterOId || editRecord?.batter.batterOId || '')
    setResult(record?.result ?? null)
    setIsStealFail(!!record?.isStealFail && U.canStealFail(record?.result ?? null))
  })

  // 열린 타석 기준으로 폼 초기화
  useEffect(() => {
    initForm()
  }, [editRecord])

  return (
    <Modal className={`EditRecordModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 탭 행 */}
      <P.TabRowPart onClickTab={onClickTab} tab={tab} />

      {tab === '기록' && (
        <P.RecordTabPart
          onClickAddPitch={onClickAddPitch}
          onClickBall={onClickBall}
          onClickClose={closeModal}
          onClickLocation={onClickLocation}
          onClickRemoveLastPitch={onClickRemoveLastPitch}
          pitchArr={pitchArr}
          selectedBall={selectedBall}
          selectedLocation={selectedLocation}
        />
      )}

      {tab === '정보' && (
        <P.InfoTabPart
          batterOId={batterOId}
          isStealFail={isStealFail}
          mainBatterArr={mainBatterArr}
          onChangeBatter={onChangeBatter}
          onChangePitcher={onChangePitcher}
          onChangeResult={onChangeResult}
          onClickClose={closeModal}
          onClickSaveInfo={onClickSaveInfo}
          onClickStealFail={onClickStealFail}
          pitcherArr={pitcherArr}
          pitcherName={pitcherName}
          result={result}
          subBatterArr={subBatterArr}
        />
      )}
    </Modal>
  )
}
