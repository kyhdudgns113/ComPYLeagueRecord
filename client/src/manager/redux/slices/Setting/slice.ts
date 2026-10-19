import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

interface SettingState {
  teamIdx: number | null
}

const initialState: SettingState = {
  teamIdx: null,
}

export const SettingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setTeamIdx: (state, action: PayloadAction<number | null>) => {
      state.teamIdx = action.payload
    },
  },
})
