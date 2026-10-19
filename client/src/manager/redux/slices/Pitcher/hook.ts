import {useAppSelector, useAppDispatch} from '@redux'

import {PitcherSlice} from './slice'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const usePitcherStates = () => useAppSelector(state => state.pitcher)

export const usePitcherActions = () => {
  const dispatch = useAppDispatch()

  return {
    setTeamCPArr: (teamIdx: number, pitcherArr: OT.PitcherType[]) => dispatch(PitcherSlice.actions.modifyCPArr({teamIdx, pitcherArr})),
    setTeamRPArr: (teamIdx: number, pitcherArr: OT.PitcherType[]) => dispatch(PitcherSlice.actions.modifyRPArr({teamIdx, pitcherArr})),
    setTeamSPArr: (teamIdx: number, pitcherArr: OT.PitcherType[]) => dispatch(PitcherSlice.actions.modifySPArr({teamIdx, pitcherArr})),

    setCPMatrix: (CPMatrix: OT.PitcherType[][]) => dispatch(PitcherSlice.actions.setCPMatrix(CPMatrix)),
    setRPMatrix: (RPMatrix: OT.PitcherType[][]) => dispatch(PitcherSlice.actions.setRPMatrix(RPMatrix)),
    setSPMatrix: (SPMatrix: OT.PitcherType[][]) => dispatch(PitcherSlice.actions.setSPMatrix(SPMatrix)),
  }
}

// export const useCopyMeCount = () => useAppSelector(state => state.copyMe.count)

export const useTeamPitcherArr = (teamIdx: number, pitcherType: CT.Type_Pitcher) => {
  if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
    alert(`[PitcherHook] teamIdx is out of range: ${teamIdx}. but return []`)
    return []
  }

  switch (pitcherType) {
    case '선발':
      return usePitcherStates().SPMatrix[teamIdx]
    case '중계':
      return usePitcherStates().RPMatrix[teamIdx]
    case '마무리':
      return usePitcherStates().SPMatrix[teamIdx]
    default:
      alert(`[PitcherHook] pitcherType is invalid: ${pitcherType}. but return []`)
      return []
  }
}
