import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

interface BaseState {
  lefterTab: LT.LefterTabType
  pageTeamName: LT.PageTeamType
  themeMode: LT.ThemeModeType
}

const readThemeMode = (): LT.ThemeModeType => {
  try {
    return localStorage.getItem('themeMode') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

const initialState: BaseState = {
  lefterTab: null,
  pageTeamName: '',
  themeMode: readThemeMode(),
}

export const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setLefterTab: (state, action: PayloadAction<LT.LefterTabType>) => {
      state.lefterTab = action.payload
    },
    setPageTeamName: (state, action: PayloadAction<LT.PageTeamType>) => {
      state.pageTeamName = action.payload
    },
    setThemeMode: (state, action: PayloadAction<LT.ThemeModeType>) => {
      state.themeMode = action.payload
    },
    toggleThemeMode: state => {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark'
    },
  },
})
