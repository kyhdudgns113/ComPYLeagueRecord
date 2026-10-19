import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

/**
 * Setting 페이지에서 사용하는 leagueNum 이랑 teamIdx 이디ㅏ.
 */
interface SettingState {
  leagueNumSetting: LT.LeagueNumType
  teamIdxSetting: number | null
}

const initialState: SettingState = {
  leagueNumSetting: null,
  teamIdxSetting: null,
}

export const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setLeagueNumSetting: (state, action: PayloadAction<LT.LeagueNumType>) => {
      state.leagueNumSetting = action.payload
    },
    setTeamIdxSetting: (state, action: PayloadAction<number | null>) => {
      state.teamIdxSetting = action.payload
    },
  },
})
