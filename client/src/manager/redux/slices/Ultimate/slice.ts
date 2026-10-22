import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'
import * as OT from '@objectType'

interface UltimateState {
  batterTableArr: OT.UltiBatterTableType[]
  leagueArr: OT.UltiLeagueInfoType[]
  leagueNum: LT.LeagueNumType
  pitcherTableArr: OT.UltiPitcherTableType[]
}

const initialState: UltimateState = {
  batterTableArr: [],
  leagueArr: [],
  leagueNum: null,
  pitcherTableArr: [],
}

export const UltimateSlice = createSlice({
  name: 'ultimate',
  initialState,
  reducers: {
    setBatterTableArr: (state, action: PayloadAction<OT.UltiBatterTableType[]>) => {
      state.batterTableArr = action.payload
    },
    setLeagueArr: (state, action: PayloadAction<OT.UltiLeagueInfoType[]>) => {
      state.leagueArr = action.payload
    },
    setLeagueNum: (state, action: PayloadAction<LT.LeagueNumType>) => {
      state.leagueNum = action.payload
    },
    setPitcherTableArr: (state, action: PayloadAction<OT.UltiPitcherTableType[]>) => {
      state.pitcherTableArr = action.payload
    },
  },
})
