import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as OT from '@objectType'
import * as V from '@value'

interface PitcherState {
  CPMatrix: OT.PitcherType[][]
  RPMatrix: OT.PitcherType[][]
  SPMatrix: OT.PitcherType[][]
}

const initialState: PitcherState = {
  CPMatrix: Array.from({length: V.TEAM_IDX_ARR.length}, () => []),
  RPMatrix: Array.from({length: V.TEAM_IDX_ARR.length}, () => []),
  SPMatrix: Array.from({length: V.TEAM_IDX_ARR.length}, () => []),
}

export const PitcherSlice = createSlice({
  name: 'pitcher',
  initialState,
  reducers: {
    modifyCPArr: (state, action: PayloadAction<{teamIdx: number; pitcherArr: OT.PitcherType[]}>) => {
      const {teamIdx, pitcherArr} = action.payload
      if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      state.CPMatrix[teamIdx] = pitcherArr
    },
    modifyRPArr: (state, action: PayloadAction<{teamIdx: number; pitcherArr: OT.PitcherType[]}>) => {
      const {teamIdx, pitcherArr} = action.payload
      if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      state.RPMatrix[teamIdx] = pitcherArr
    },
    modifySPArr: (state, action: PayloadAction<{teamIdx: number; pitcherArr: OT.PitcherType[]}>) => {
      const {teamIdx, pitcherArr} = action.payload
      if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      state.SPMatrix[teamIdx] = pitcherArr
    },

    setCPMatrix: (state, action: PayloadAction<OT.PitcherType[][]>) => {
      state.CPMatrix = action.payload
    },
    setRPMatrix: (state, action: PayloadAction<OT.PitcherType[][]>) => {
      state.RPMatrix = action.payload
    },
    setSPMatrix: (state, action: PayloadAction<OT.PitcherType[][]>) => {
      state.SPMatrix = action.payload
    },
  },
})
