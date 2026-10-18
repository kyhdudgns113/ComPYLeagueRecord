import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

interface BaseState {
  pageTeamName: LT.PageTeamType
}

const initialState: BaseState = {
  pageTeamName: '',
}

export const BaseSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    setPageTeamName: (state, action: PayloadAction<LT.PageTeamType>) => {
      state.pageTeamName = action.payload
    },
  },
})
