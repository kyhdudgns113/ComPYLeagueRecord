import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as OT from '@objectType'
import * as V from '@value'

interface BatterState {
  MainBatterMatrix: OT.BatterType[][]
  SubBatterMatrix: OT.BatterType[][]
}

const initialState: BatterState = {
  MainBatterMatrix: Array.from({length: V.TEAM_IDX_ARR.length}, () => []),
  SubBatterMatrix: Array.from({length: V.TEAM_IDX_ARR.length}, () => []),
}

export const BatterSlice = createSlice({
  name: 'batter',
  initialState,
  reducers: {
    modifyMainBatterArr: (state, action: PayloadAction<{teamIdx: number; batterArr: OT.BatterType[]}>) => {
      const {teamIdx, batterArr} = action.payload
      if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      state.MainBatterMatrix[teamIdx] = batterArr
    },
    modifySubBatterArr: (state, action: PayloadAction<{teamIdx: number; batterArr: OT.BatterType[]}>) => {
      const {teamIdx, batterArr} = action.payload
      if (teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      state.SubBatterMatrix[teamIdx] = batterArr
    },

    setMainBatterMatrix: (state, action: PayloadAction<OT.BatterType[][]>) => {
      state.MainBatterMatrix = action.payload
    },
    setSubBatterMatrix: (state, action: PayloadAction<OT.BatterType[][]>) => {
      state.SubBatterMatrix = action.payload
    },
  },
})
