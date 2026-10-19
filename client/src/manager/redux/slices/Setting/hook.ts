import {useAppSelector, useAppDispatch} from '@redux'
import {SettingSlice} from './slice'

export const useSettingStates = () => useAppSelector(state => state.setting)

export const useSettingActions = () => {
  const dispatch = useAppDispatch()

  return {
    setTeamIdx: (teamIdx: number) => dispatch(SettingSlice.actions.setTeamIdx(teamIdx)),
    clearTeamIdx: () => dispatch(SettingSlice.actions.setTeamIdx(null)),
  }
}

// export const useCopyMeCount = () => useAppSelector(state => state.copyMe.count)
