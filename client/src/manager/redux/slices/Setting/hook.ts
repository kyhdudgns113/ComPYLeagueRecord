import {useAppSelector, useAppDispatch} from '@redux'

import {SettingSlice} from './slice'

import * as OT from '@objectType'

export const useSettingStates = () => useAppSelector(state => state.setting)

export const useSettingActions = () => {
  const dispatch = useAppDispatch()

  return {
    clearLeagueNumSetting: () => dispatch(SettingSlice.actions.setLeagueNumSetting(null)),
    clearMovedBatter: () => dispatch(SettingSlice.actions.setMovedBatter(null)),
    clearMovedPitcher: () => dispatch(SettingSlice.actions.setMovedPitcher(null)),
    clearTeamIdxSetting: () => dispatch(SettingSlice.actions.setTeamIdxSetting(null)),

    setLeagueNumSetting: (leagueNum: number) => dispatch(SettingSlice.actions.setLeagueNumSetting(leagueNum)),
    setMovedBatter: (movedBatter: OT.BatterType | null) => dispatch(SettingSlice.actions.setMovedBatter(movedBatter)),
    setMovedPitcher: (movedPitcher: OT.PitcherType | null) => dispatch(SettingSlice.actions.setMovedPitcher(movedPitcher)),
    setTeamIdxSetting: (teamIdx: number) => dispatch(SettingSlice.actions.setTeamIdxSetting(teamIdx)),
  }
}

export const useLeagueNumSetting = () => useAppSelector(state => state.setting.leagueNumSetting)
export const useMovedBatter = () => useAppSelector(state => state.setting.movedBatter)
export const useMovedPitcher = () => useAppSelector(state => state.setting.movedPitcher)
export const useTeamIdxSetting = () => useAppSelector(state => state.setting.teamIdxSetting)
