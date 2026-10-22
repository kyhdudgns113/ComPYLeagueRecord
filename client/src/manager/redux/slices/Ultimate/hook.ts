import {useAppSelector, useAppDispatch} from '@redux'
import {UltimateSlice} from './slice'

import * as OT from '@objectType'

export const useUltimateStates = () => useAppSelector(state => state.ultimate)

export const useUltimateActions = () => {
  const dispatch = useAppDispatch()

  return {
    setBatterTableArr: (batterTableArr: OT.UltiBatterTableType[]) => dispatch(UltimateSlice.actions.setBatterTableArr(batterTableArr)),
    setPitcherTableArr: (pitcherTableArr: OT.UltiPitcherTableType[]) => dispatch(UltimateSlice.actions.setPitcherTableArr(pitcherTableArr)),
  }
}

export const useUltimatePitcherTableArr = () => useAppSelector(state => state.ultimate.pitcherTableArr)
export const useUltimateBatterTableArr = () => useAppSelector(state => state.ultimate.batterTableArr)
