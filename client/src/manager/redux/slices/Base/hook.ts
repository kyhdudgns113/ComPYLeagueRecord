import {useAppSelector, useAppDispatch} from '@redux'
import {BaseSlice} from './slice'

import * as CT from '@commonType'

export const useBaseStates = () => useAppSelector(state => state.base)

export const useBaseActions = () => {
  const dispatch = useAppDispatch()

  return {
    clearLefterTab: () => dispatch(BaseSlice.actions.setLefterTab(null)),

    setLefterPitchRecord: () => dispatch(BaseSlice.actions.setLefterTab('PitchRecord')),
    setLefterSetting: () => dispatch(BaseSlice.actions.setLefterTab('Setting')),
    setLefterUltimateLeague: () => dispatch(BaseSlice.actions.setLefterTab('UltimateLeague')),
    setLefterUltimateSetting: () => dispatch(BaseSlice.actions.setLefterTab('UltimateSetting')),

    setPageTeamName: (teamName: CT.Type_Team) => dispatch(BaseSlice.actions.setPageTeamName(teamName)),
  }
}

// export const useBaseCount = () => useAppSelector(state => state.base.count)
