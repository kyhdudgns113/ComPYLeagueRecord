import {useCallback, useEffect, useEffectEvent, useState} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useModalActions, useModalStates, useRecordActions, useRecordStates, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as O from '../../objects'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

type RecordTabPartProps = DivCommonProps

export const RecordTabPart: FC<RecordTabPartProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const {updateRecord} = useRecordCallbacksContext()

  const [pitchArr, setPitchArr] = useState<OT.PitchType[]>([])
  const [selectedBall, setSelectedBall] = useState<CT.Type_Pitch | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<CT.Type_Location | null>(null)

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const record = recordArr.find(item => item.order === editRecord?.order && item.rotation === editRecord?.rotation) || editRecord?.record || null
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]
  const fallbackPitcherName = record?.pitcherName || game?.SPName || pitcherArr[0]?.name || ''

  const _savePitchArr = useCallback(
    (
      nextPitchArr: OT.PitchType[],
      clearSelection: boolean,
      editRecord: LT.EditRecordPayload | null,
      fallbackPitcherName: string,
      gameNum: number | null,
      leagueNum: number | null,
      record: OT.RecordElementType | null,
      recordArr: OT.RecordElementType[]
    ) => {
      if (gameNum === null || leagueNum === null || !editRecord) {
        alert(`[RecordTabPart] gameNum or leagueNum is null`)
        return
      }

      const nextPitcherName = U.isRecordedAtBat(record)
        ? record?.pitcherName || fallbackPitcherName
        : U.getRecentPitcherName(recordArr, {order: editRecord.order, rotation: editRecord.rotation}, fallbackPitcherName)

      const nextRecord = U.buildRecordElement({
        batter: editRecord.batter,
        gameNum,
        isStealFail: !!record?.isStealFail,
        leagueNum,
        order: editRecord.order,
        pitchArr: nextPitchArr,
        pitcherName: nextPitcherName,
        record,
        result: record?.result ?? null,
        rotation: editRecord.rotation,
      })
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
        } // ::
        else {
          if (res.errMsg) {
            alert(`[RecordTabPart] ${res.errMsg}`)
          }
        }
      })
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
    (
      pitchArr: OT.PitchType[],
      selectedBall: CT.Type_Pitch | null,
      selectedLocation: CT.Type_Location | null,
      editRecord: LT.EditRecordPayload | null,
      fallbackPitcherName: string,
      gameNum: number | null,
      leagueNum: number | null,
      record: OT.RecordElementType | null,
      recordArr: OT.RecordElementType[]
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (!selectedBall || !selectedLocation) {
          alert(`[RecordTabPart] 구종과 위치를 선택하세요`)
          return
        }

        _savePitchArr(
          [...pitchArr, {ball: selectedBall, location: selectedLocation}],
          true,
          editRecord,
          fallbackPitcherName,
          gameNum,
          leagueNum,
          record,
          recordArr
        )
      },
    []
  )

  const onClickRemoveLastPitch = useCallback(
    (
      pitchArr: OT.PitchType[],
      editRecord: LT.EditRecordPayload | null,
      fallbackPitcherName: string,
      gameNum: number | null,
      leagueNum: number | null,
      record: OT.RecordElementType | null,
      recordArr: OT.RecordElementType[]
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (pitchArr.length === 0) {
          return
        }

        _savePitchArr(pitchArr.slice(0, -1), false, editRecord, fallbackPitcherName, gameNum, leagueNum, record, recordArr)
      },
    []
  )

  const initForm = useEffectEvent(() => {
    setPitchArr(record?.pitchArr || [])
    setSelectedBall(null)
    setSelectedLocation(null)
  })

  // 열린 타석 기준으로 투구 로그 초기화
  useEffect(() => {
    initForm()
  }, [editRecord])

  return (
    <div className={`RecordTab_Modal`} {...props}>
      {/* 2. 투구 로그 */}
      <O.PitchLogObject
        onClickRemoveLastPitch={onClickRemoveLastPitch(pitchArr, editRecord, fallbackPitcherName, gameNum, leagueNum, record, recordArr)}
        pitchArr={pitchArr}
      />

      {/* 3. 존 판 */}
      <O.ZoneGridObject onClickLocation={onClickLocation} selectedLocation={selectedLocation} />

      {/* 4. 구종 판 */}
      <O.PitchTypeGridObject onClickBall={onClickBall} selectedBall={selectedBall} />

      {/* 5. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button
          className={`Button_Modal`}
          onClick={onClickAddPitch(pitchArr, selectedBall, selectedLocation, editRecord, fallbackPitcherName, gameNum, leagueNum, record, recordArr)}
          type="button"
        >
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          닫기
        </button>
      </div>
    </div>
  )
}
