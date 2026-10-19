import {useAppSelector, useAppDispatch} from '@redux'
import {RecordSlice} from '@redux'

import * as OT from '@objectType'

export const useRecordStates = () => useAppSelector(state => state.record)

export const useRecordActions = () => {
  const dispatch = useAppDispatch()

  return {
    addLeague: (league: OT.LeagueInfoType) => dispatch(RecordSlice.actions.addLeague(league)),

    changeLeague: (league: OT.LeagueInfoType, leagueIdx: number) => dispatch(RecordSlice.actions.changeLeague({league, leagueIdx})),

    setLeagueArr: (leagueArr: OT.LeagueInfoType[]) => dispatch(RecordSlice.actions.setLeagueArr(leagueArr)),
  }
}

export const useLeagueArr = () => useAppSelector(state => state.record.leagueArr)
