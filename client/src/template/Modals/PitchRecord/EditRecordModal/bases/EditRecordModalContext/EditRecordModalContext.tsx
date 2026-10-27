import {createContext, useCallback, useContext, useEffect, useEffectEvent, useState} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useModalActions, useModalStates, useRecordActions, useRecordStates, useTeamBatterArr, useTeamPitcherArr} from '@redux'

import type {FC, PropsWithChildren} from 'react'
import type {Setter} from '@localType'

import * as CT from '@commonType'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// prettier-ignore
type ContextType = {
  batterOId: string
  isStealFail: boolean
  mainBatterArr: OT.BatterType[]
  pitchArr: OT.PitchType[]
  pitcherArr: OT.PitcherType[]
  pitcherName: string
  result: CT.Type_Result
  selectedBall: CT.Type_Pitch | null
  selectedLocation: CT.Type_Location | null
  subBatterArr: OT.BatterType[]
  onChangeBatter: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangePitcher: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeResult: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClickAdd: (
    pitchArr: OT.PitchType[],
    selectedBall: CT.Type_Pitch | null,
    selectedLocation: CT.Type_Location | null,
    editRecord: LT.EditRecordPayload | null,
    gameNum: number | null,
    isStealFail: boolean,
    leagueNum: number | null,
    pitcherName: string,
    record: OT.RecordElementType | null,
    result: CT.Type_Result,
    selectedBatter: OT.BatterType | null
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickBall: (ball: CT.Type_Pitch) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickClose: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickLocation: (location: CT.Type_Location) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickRemoveLastPitch: (
    pitchArr: OT.PitchType[],
    editRecord: LT.EditRecordPayload | null,
    gameNum: number | null,
    isStealFail: boolean,
    leagueNum: number | null,
    pitcherName: string,
    record: OT.RecordElementType | null,
    result: CT.Type_Result,
    selectedBatter: OT.BatterType | null
  ) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickStealFail: (result: CT.Type_Result) => (e: React.MouseEvent<HTMLButtonElement>) => void
  editRecord: LT.EditRecordPayload | null
  gameNum: number | null
  leagueNum: number | null
  prevRecordArr: OT.RecordElementType[]
  record: OT.RecordElementType | null
  selectedBatter: OT.BatterType | null
  setBatterOId: Setter<string>
  setIsStealFail: Setter<boolean>
  setPitcherName: Setter<string>
  setResult: Setter<CT.Type_Result>
}

const emptyFn = () => {}

// prettier-ignore
export const EditRecordModalContext = createContext<ContextType>({
  batterOId: '',
  isStealFail: false,
  mainBatterArr: [],
  pitchArr: [],
  pitcherArr: [],
  pitcherName: '',
  result: null,
  selectedBall: null,
  selectedLocation: null,
  subBatterArr: [],
  onChangeBatter: emptyFn,
  onChangePitcher: emptyFn,
  onChangeResult: emptyFn,
  onClickAdd: () => emptyFn,
  onClickBall: () => emptyFn,
  onClickClose: emptyFn,
  onClickLocation: () => emptyFn,
  onClickRemoveLastPitch: () => emptyFn,
  onClickStealFail: () => emptyFn,
  editRecord: null,
  gameNum: null,
  leagueNum: null,
  prevRecordArr: [],
  record: null,
  selectedBatter: null,
  setBatterOId: emptyFn,
  setIsStealFail: emptyFn,
  setPitcherName: emptyFn,
  setResult: emptyFn,
})

export const useEditRecordModalContext = () => useContext(EditRecordModalContext)

export const EditRecordModalProvider: FC<PropsWithChildren> = ({children}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const {updateRecord} = useRecordCallbacksContext()

  const [batterOId, setBatterOId] = useState<string>('')
  const [isStealFail, setIsStealFail] = useState<boolean>(false)
  const [pitchArr, setPitchArr] = useState<OT.PitchType[]>([])
  const [pitcherName, setPitcherName] = useState<string>('')
  const [result, setResult] = useState<CT.Type_Result>(null)
  const [selectedBall, setSelectedBall] = useState<CT.Type_Pitch | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<CT.Type_Location | null>(null)

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const enemyTeamIdx = game ? V.TEAM_IDX_MAP[game.enemyTeam] : -1
  const record = recordArr.find(item => item.order === editRecord?.order && item.rotation === editRecord?.rotation) || editRecord?.record || null
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]
  const mainBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '선발')
  const subBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '후보')
  const batterArr = [...mainBatterArr, ...subBatterArr]
  const fallbackPitcherName = record?.pitcherName || game?.SPName || pitcherArr[0]?.name || ''
  const selectedBatter =
    batterArr.find(batter => batter.batterOId === batterOId) ||
    (editRecord?.batter.batterOId === batterOId ? editRecord.batter : null) ||
    editRecord?.batter ||
    null
  const prevRecordArr = U.getPrevGameRecordArr(
    recordArr,
    editRecord ? {order: editRecord.order, rotation: editRecord.rotation} : null,
    gameNum,
    batterOId
  )

  const _saveRecord = useCallback(
    (
      nextPitchArr: OT.PitchType[],
      clearSelection: boolean,
      closeAfter: boolean,
      editRecord: LT.EditRecordPayload | null,
      gameNum: number | null,
      isStealFail: boolean,
      leagueNum: number | null,
      pitcherName: string,
      record: OT.RecordElementType | null,
      result: CT.Type_Result,
      selectedBatter: OT.BatterType | null
    ) => {
      if (gameNum === null || leagueNum === null || !editRecord) {
        alert(`[EditRecordModal] gameNum or leagueNum is null`)
        return
      }

      const nextRecord = U.buildRecordElement({
        batter: selectedBatter,
        gameNum,
        isStealFail,
        leagueNum,
        order: editRecord.order,
        pitchArr: nextPitchArr,
        pitcherName,
        record,
        result,
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
    []
  )

  const onClickAdd = useCallback(
    (
      pitchArr: OT.PitchType[],
      selectedBall: CT.Type_Pitch | null,
      selectedLocation: CT.Type_Location | null,
      editRecord: LT.EditRecordPayload | null,
      gameNum: number | null,
      isStealFail: boolean,
      leagueNum: number | null,
      pitcherName: string,
      record: OT.RecordElementType | null,
      result: CT.Type_Result,
      selectedBatter: OT.BatterType | null
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (selectedBall && selectedLocation) {
          _saveRecord(
            [...pitchArr, {ball: selectedBall, location: selectedLocation}],
            true,
            false,
            editRecord,
            gameNum,
            isStealFail,
            leagueNum,
            pitcherName,
            record,
            result,
            selectedBatter
          )
          return
        }

        if (selectedBall || selectedLocation) {
          alert(`[EditRecordModal] 구종과 위치를 선택하세요`)
          return
        }

        _saveRecord(pitchArr, false, true, editRecord, gameNum, isStealFail, leagueNum, pitcherName, record, result, selectedBatter)
      },
    []
  )

  const onClickRemoveLastPitch = useCallback(
    (
      pitchArr: OT.PitchType[],
      editRecord: LT.EditRecordPayload | null,
      gameNum: number | null,
      isStealFail: boolean,
      leagueNum: number | null,
      pitcherName: string,
      record: OT.RecordElementType | null,
      result: CT.Type_Result,
      selectedBatter: OT.BatterType | null
    ) =>
      (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (pitchArr.length === 0) {
          return
        }

        _saveRecord(
          pitchArr.slice(0, -1),
          false,
          false,
          editRecord,
          gameNum,
          isStealFail,
          leagueNum,
          pitcherName,
          record,
          result,
          selectedBatter
        )
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

  const onClickClose = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    closeModal()
  }, [])

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
    (result: CT.Type_Result) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!U.canStealFail(result)) {
        return
      }

      setIsStealFail(prev => !prev)
    },
    []
  )

  const initForm = useEffectEvent(() => {
    const nextPitcherName = U.isRecordedAtBat(record)
      ? record?.pitcherName || fallbackPitcherName
      : U.getRecentPitcherName(recordArr, editRecord ? {order: editRecord.order, rotation: editRecord.rotation} : null, fallbackPitcherName)

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

  // prettier-ignore
  const value: ContextType = {
    batterOId,
    isStealFail,
    mainBatterArr,
    pitchArr,
    pitcherArr,
    pitcherName,
    result,
    selectedBall,
    selectedLocation,
    subBatterArr,
    onChangeBatter,
    onChangePitcher,
    onChangeResult,
    onClickAdd,
    onClickBall,
    onClickClose,
    onClickLocation,
    onClickRemoveLastPitch,
    onClickStealFail,
    editRecord,
    gameNum,
    leagueNum,
    prevRecordArr,
    record,
    selectedBatter,
    setBatterOId,
    setIsStealFail,
    setPitcherName,
    setResult,
  }

  return <EditRecordModalContext.Provider value={value}>{children}</EditRecordModalContext.Provider>
}
