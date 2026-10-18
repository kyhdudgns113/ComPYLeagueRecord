import {useAppSelector, useAppDispatch} from '@redux'
import {BaseSlice} from './slice'

import * as CT from '@commonType'

export const useBaseStates = () => useAppSelector(state => state.base)

export const useBaseMeActions = () => {
  const dispatch = useAppDispatch()

  return {
    setPageTeamName: (teamName: CT.Type_Team) => dispatch(BaseSlice.actions.setPageTeamName(teamName)),
  }
}

// export const useBaseCount = () => useAppSelector(state => state.base.count)
