import {useAppSelector, useAppDispatch} from '@redux'
import {SettingSlice} from './slice'

export const useSettingStates = () => useAppSelector(state => state.setting)

export const useSettingActions = () => {
  const dispatch = useAppDispatch()

  return {
    clearLeagueNumSetting: () => dispatch(SettingSlice.actions.setLeagueNumSetting(null)),
    clearTeamIdxSetting: () => dispatch(SettingSlice.actions.setTeamIdxSetting(null)),

    setLeagueNumSetting: (leagueNum: number) => dispatch(SettingSlice.actions.setLeagueNumSetting(leagueNum)),
    setTeamIdxSetting: (teamIdx: number) => dispatch(SettingSlice.actions.setTeamIdxSetting(teamIdx)),
  }
}

export const useLeagueNumSetting = () => useAppSelector(state => state.setting.leagueNumSetting)
export const useTeamIdxSetting = () => useAppSelector(state => state.setting.teamIdxSetting)
