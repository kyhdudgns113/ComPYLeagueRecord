import {useAppSelector, useAppDispatch} from '@redux'
import {BaseSlice} from './slice'

import * as CT from '@commonType'

export const useBaseStates = () => useAppSelector(state => state.base)

export const useBaseActions = () => {
  const dispatch = useAppDispatch()

  return {
    clearLefterTab: () => dispatch(BaseSlice.actions.setLefterTab(null)),

    setLefterSetting: () => dispatch(BaseSlice.actions.setLefterTab('Setting')),
    setLefterPitchRecord: () => dispatch(BaseSlice.actions.setLefterTab('PitchRecord')),

    setPageTeamName: (teamName: CT.Type_Team) => dispatch(BaseSlice.actions.setPageTeamName(teamName)),
  }
}

// export const useBaseCount = () => useAppSelector(state => state.base.count)
