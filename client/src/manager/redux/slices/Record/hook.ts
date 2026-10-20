import {useAppSelector, useAppDispatch} from '@redux'
import {RecordSlice} from '@redux'

import * as OT from '@objectType'

export const useRecordStates = () => useAppSelector(state => state.record)

export const useRecordActions = () => {
  const dispatch = useAppDispatch()

  return {
    addLeague: (league: OT.LeagueInfoType) => dispatch(RecordSlice.actions.addLeague(league)),

    clearGameNum: () => dispatch(RecordSlice.actions.setGameNum(null)),
    clearLeagueNum: () => dispatch(RecordSlice.actions.setLeagueNum(null)),

    changeLeague: (league: OT.LeagueInfoType, leagueIdx: number) => dispatch(RecordSlice.actions.changeLeague({league, leagueIdx})),

    setGameArr: (gameArr: OT.GameInfoType[]) => dispatch(RecordSlice.actions.setGameArr(gameArr)),
    setGameNum: (gameNum: number) => dispatch(RecordSlice.actions.setGameNum(gameNum)),
    setLeagueArr: (leagueArr: OT.LeagueInfoType[]) => dispatch(RecordSlice.actions.setLeagueArr(leagueArr)),
    setLeagueNum: (leagueNum: number) => dispatch(RecordSlice.actions.setLeagueNum(leagueNum)),
    setRecordArr: (recordArr: OT.RecordElementType[]) => dispatch(RecordSlice.actions.setRecordArr(recordArr)),
  }
}

export const useLeagueArr = () => useAppSelector(state => state.record.leagueArr)
export const useRecordArr = () => useAppSelector(state => state.record.recordArr)
