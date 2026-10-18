import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

interface BaseState {
  lefterTab: LT.LefterTabType
  pageTeamName: LT.PageTeamType
}

const initialState: BaseState = {
  lefterTab: null,
  pageTeamName: '',
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
  },
})
