import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as OT from '@objectType'
import * as V from '@value'

type ModifyPitcherArrPayload = {leagueNum: number; teamIdx: number; pitcherArr: OT.PitcherType[]}

interface PitcherState {
  CP3DArr: OT.PitcherType[][][]
  RP3DArr: OT.PitcherType[][][]
  SP3DArr: OT.PitcherType[][][]
}

const emptyMatrix = (): OT.PitcherType[][] => Array.from({length: V.TEAM_IDX_ARR.length}, () => [])

const ensureLeague = (arr3D: OT.PitcherType[][][], leagueNum: number) => {
  while (arr3D.length <= leagueNum) {
    arr3D.push(emptyMatrix())
  }
}

const initialState: PitcherState = {
  CP3DArr: [],
  RP3DArr: [],
  SP3DArr: [],
}

export const PitcherSlice = createSlice({
  name: 'pitcher',
  initialState,
  reducers: {
    modifyCPArr: (state, action: PayloadAction<ModifyPitcherArrPayload>) => {
      const {leagueNum, teamIdx, pitcherArr} = action.payload
      if (leagueNum < 0 || teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      ensureLeague(state.CP3DArr, leagueNum)
      state.CP3DArr[leagueNum][teamIdx] = pitcherArr
    },
    modifyRPArr: (state, action: PayloadAction<ModifyPitcherArrPayload>) => {
      const {leagueNum, teamIdx, pitcherArr} = action.payload
      if (leagueNum < 0 || teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      ensureLeague(state.RP3DArr, leagueNum)
      state.RP3DArr[leagueNum][teamIdx] = pitcherArr
    },
    modifySPArr: (state, action: PayloadAction<ModifyPitcherArrPayload>) => {
      const {leagueNum, teamIdx, pitcherArr} = action.payload
      if (leagueNum < 0 || teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      ensureLeague(state.SP3DArr, leagueNum)
      state.SP3DArr[leagueNum][teamIdx] = pitcherArr
    },

    setCP3DArr: (state, action: PayloadAction<OT.PitcherType[][][]>) => {
      state.CP3DArr = action.payload
    },
    setRP3DArr: (state, action: PayloadAction<OT.PitcherType[][][]>) => {
      state.RP3DArr = action.payload
    },
    setSP3DArr: (state, action: PayloadAction<OT.PitcherType[][][]>) => {
      state.SP3DArr = action.payload
    },
  },
})
