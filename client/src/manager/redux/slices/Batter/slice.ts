import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as OT from '@objectType'
import * as V from '@value'

type ModifyBatterArrPayload = {leagueNum: number; teamIdx: number; batterArr: OT.BatterType[]}

interface BatterState {
  MainBatter3DArr: OT.BatterType[][][]
  SubBatter3DArr: OT.BatterType[][][]
}

const emptyMatrix = (): OT.BatterType[][] => Array.from({length: V.TEAM_IDX_ARR.length}, () => [])

const ensureLeague = (arr3D: OT.BatterType[][][], leagueNum: number) => {
  while (arr3D.length <= leagueNum) {
    arr3D.push(emptyMatrix())
  }
}

const initialState: BatterState = {
  MainBatter3DArr: [],
  SubBatter3DArr: [],
}

export const BatterSlice = createSlice({
  name: 'batter',
  initialState,
  reducers: {
    modifyMainBatterArr: (state, action: PayloadAction<ModifyBatterArrPayload>) => {
      const {leagueNum, teamIdx, batterArr} = action.payload
      if (leagueNum < 0 || teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      ensureLeague(state.MainBatter3DArr, leagueNum)
      state.MainBatter3DArr[leagueNum][teamIdx] = batterArr
    },
    modifySubBatterArr: (state, action: PayloadAction<ModifyBatterArrPayload>) => {
      const {leagueNum, teamIdx, batterArr} = action.payload
      if (leagueNum < 0 || teamIdx < 0 || teamIdx >= V.TEAM_IDX_ARR.length) {
        return
      }
      ensureLeague(state.SubBatter3DArr, leagueNum)
      state.SubBatter3DArr[leagueNum][teamIdx] = batterArr
    },

    setMainBatter3DArr: (state, action: PayloadAction<OT.BatterType[][][]>) => {
      state.MainBatter3DArr = action.payload
    },
    setSubBatter3DArr: (state, action: PayloadAction<OT.BatterType[][][]>) => {
      state.SubBatter3DArr = action.payload
    },
  },
})
