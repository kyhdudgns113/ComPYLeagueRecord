import {useAppSelector, useAppDispatch} from '@redux'
import {UltimateSlice} from './slice'

import * as OT from '@objectType'

export const useUltimateStates = () => useAppSelector(state => state.ultimate)

export const useUltimateActions = () => {
  const dispatch = useAppDispatch()

  return {
    clearBatterTableArr: () => dispatch(UltimateSlice.actions.setBatterTableArr([])),
    clearLeagueNumUlti: () => dispatch(UltimateSlice.actions.setLeagueNum(null)),
    clearPitcherTableArr: () => dispatch(UltimateSlice.actions.setPitcherTableArr([])),

    setBatterTableArr: (batterTableArr: OT.UltiBatterTableType[]) => dispatch(UltimateSlice.actions.setBatterTableArr(batterTableArr)),
    setLeagueArrUlti: (leagueArr: OT.UltiLeagueInfoType[]) => dispatch(UltimateSlice.actions.setLeagueArr(leagueArr)),
    setLeagueNumUlti: (leagueNum: number) => dispatch(UltimateSlice.actions.setLeagueNum(leagueNum)),
    setPitcherTableArr: (pitcherTableArr: OT.UltiPitcherTableType[]) => dispatch(UltimateSlice.actions.setPitcherTableArr(pitcherTableArr)),
  }
}

export const useUltimateBatterTableArr = () => useAppSelector(state => state.ultimate.batterTableArr)
export const useUltimateLeagueArr = () => useAppSelector(state => state.ultimate.leagueArr)
export const useUltimateLeagueNum = () => useAppSelector(state => state.ultimate.leagueNum)
export const useUltimatePitcherTableArr = () => useAppSelector(state => state.ultimate.pitcherTableArr)
