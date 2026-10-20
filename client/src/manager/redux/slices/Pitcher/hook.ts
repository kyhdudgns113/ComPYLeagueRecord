import {useAppSelector, useAppDispatch} from '@redux'

import {PitcherSlice} from './slice'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const usePitcherStates = () => useAppSelector(state => state.pitcher)

export const usePitcherActions = () => {
  const dispatch = useAppDispatch()

  return {
    setTeamCPArr: (leagueNum: number, teamIdx: number, pitcherArr: OT.PitcherType[]) =>
      dispatch(PitcherSlice.actions.modifyCPArr({leagueNum, teamIdx, pitcherArr})),
    setTeamRPArr: (leagueNum: number, teamIdx: number, pitcherArr: OT.PitcherType[]) =>
      dispatch(PitcherSlice.actions.modifyRPArr({leagueNum, teamIdx, pitcherArr})),
    setTeamSPArr: (leagueNum: number, teamIdx: number, pitcherArr: OT.PitcherType[]) =>
      dispatch(PitcherSlice.actions.modifySPArr({leagueNum, teamIdx, pitcherArr})),

    setCP3DArr: (CP3DArr: OT.PitcherType[][][]) => dispatch(PitcherSlice.actions.setCP3DArr(CP3DArr)),
    setRP3DArr: (RP3DArr: OT.PitcherType[][][]) => dispatch(PitcherSlice.actions.setRP3DArr(RP3DArr)),
    setSP3DArr: (SP3DArr: OT.PitcherType[][][]) => dispatch(PitcherSlice.actions.setSP3DArr(SP3DArr)),
  }
}

export const useTeamPitcherArr = (leagueNum: number, teamIdx: number, pitcherType: CT.Type_Pitcher) => {
  const {CP3DArr, RP3DArr, SP3DArr} = usePitcherStates()

  if (leagueNum < 0) {
    return []
  }

  if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
    alert(`[PitcherHook] teamIdx is out of range: ${teamIdx}. but return []`)
    return []
  }

  switch (pitcherType) {
    case '선발':
      return SP3DArr[leagueNum]?.[teamIdx] || []
    case '중계':
      return RP3DArr[leagueNum]?.[teamIdx] || []
    case '마무리':
      return CP3DArr[leagueNum]?.[teamIdx] || []
    default:
      alert(`[PitcherHook] pitcherType is invalid: ${pitcherType}. but return []`)
      return []
  }
}
