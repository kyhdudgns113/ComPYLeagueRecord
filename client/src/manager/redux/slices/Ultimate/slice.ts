import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as OT from '@objectType'

interface UltimateState {
  batterTableArr: OT.UltiBatterTableType[]
  pitcherTableArr: OT.UltiPitcherTableType[]
}

const initialState: UltimateState = {
  batterTableArr: [],
  pitcherTableArr: [],
}

export const UltimateSlice = createSlice({
  name: 'ultimate',
  initialState,
  reducers: {
    setBatterTableArr: (state, action: PayloadAction<OT.UltiBatterTableType[]>) => {
      state.batterTableArr = action.payload
    },
    setPitcherTableArr: (state, action: PayloadAction<OT.UltiPitcherTableType[]>) => {
      state.pitcherTableArr = action.payload
    },
  },
})
