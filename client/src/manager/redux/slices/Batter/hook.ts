import {useAppSelector, useAppDispatch} from '@redux'

import {BatterSlice} from './slice'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const useBatterStates = () => useAppSelector(state => state.batter)

export const useBatterActions = () => {
  const dispatch = useAppDispatch()

  return {
    setTeamMainBatterArr: (teamIdx: number, batterArr: OT.BatterType[]) => dispatch(BatterSlice.actions.modifyMainBatterArr({teamIdx, batterArr})),
    setTeamSubBatterArr: (teamIdx: number, batterArr: OT.BatterType[]) => dispatch(BatterSlice.actions.modifySubBatterArr({teamIdx, batterArr})),

    setMainBatterMatrix: (MainBatterMatrix: OT.BatterType[][]) => dispatch(BatterSlice.actions.setMainBatterMatrix(MainBatterMatrix)),
    setSubBatterMatrix: (SubBatterMatrix: OT.BatterType[][]) => dispatch(BatterSlice.actions.setSubBatterMatrix(SubBatterMatrix)),
  }
}

export const useTeamBatterArr = (teamIdx: number, batterClass: CT.Type_BatterClass) => {
  const {MainBatterMatrix, SubBatterMatrix} = useBatterStates()

  if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
    alert(`[BatterHook] teamIdx is out of range: ${teamIdx}. but return []`)
    return []
  }

  switch (batterClass) {
    case '선발':
      return MainBatterMatrix[teamIdx]
    case '후보':
      return SubBatterMatrix[teamIdx]
    default:
      alert(`[BatterHook] batterClass is invalid: ${batterClass}. but return []`)
      return []
  }
}
