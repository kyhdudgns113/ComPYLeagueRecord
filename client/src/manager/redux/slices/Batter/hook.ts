import {useAppSelector, useAppDispatch} from '@redux'

import {BatterSlice} from './slice'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const useBatterStates = () => useAppSelector(state => state.batter)

export const useBatterActions = () => {
  const dispatch = useAppDispatch()

  return {
    setTeamMainBatterArr: (leagueNum: number, teamIdx: number, batterArr: OT.BatterType[]) =>
      dispatch(BatterSlice.actions.modifyMainBatterArr({leagueNum, teamIdx, batterArr})),
    setTeamSubBatterArr: (leagueNum: number, teamIdx: number, batterArr: OT.BatterType[]) =>
      dispatch(BatterSlice.actions.modifySubBatterArr({leagueNum, teamIdx, batterArr})),

    setMainBatter3DArr: (MainBatter3DArr: OT.BatterType[][][]) => dispatch(BatterSlice.actions.setMainBatter3DArr(MainBatter3DArr)),
    setSubBatter3DArr: (SubBatter3DArr: OT.BatterType[][][]) => dispatch(BatterSlice.actions.setSubBatter3DArr(SubBatter3DArr)),
  }
}

export const useTeamBatterArr = (leagueNum: number, teamIdx: number, batterClass: CT.Type_BatterClass) => {
  const {MainBatter3DArr, SubBatter3DArr} = useBatterStates()

  if (leagueNum < 0) {
    return []
  }

  if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
    // alert(`[BatterHook] teamIdx is out of range: ${teamIdx}. but return []`)
    return []
  }

  switch (batterClass) {
    case '선발':
      return MainBatter3DArr[leagueNum]?.[teamIdx] || []
    case '후보':
      return SubBatter3DArr[leagueNum]?.[teamIdx] || []
    default:
      alert(`[BatterHook] batterClass is invalid: ${batterClass}. but return []`)
      return []
  }
}
