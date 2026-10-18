import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'
import * as OT from '@objectType'

interface RecordState {
  leagueArr: OT.LeagueInfoType[]
  leagueNum: LT.LeagueNumType
}

const initialState: RecordState = {
  leagueArr: [],
  leagueNum: null,
}

export const RecordSlice = createSlice({
  name: 'record',
  initialState,
  reducers: {
    addLeague: (state, action: PayloadAction<OT.LeagueInfoType>) => {
      state.leagueArr = [action.payload, ...state.leagueArr]
    },

    changeLeague: (state, action: PayloadAction<{league: OT.LeagueInfoType; leagueIdx: number}>) => {
      const {league, leagueIdx} = action.payload

      if (state.leagueArr.length > leagueIdx) {
        state.leagueArr[leagueIdx] = league
      } // ::
      else {
        alert(`[RecordSlice/modifyLeague] 배열 인덱스를 벗어납니다.\nlength: ${state.leagueArr.length}\nleagueIdx: ${leagueIdx}`)
      }
    },

    setLeagueArr: (state, action: PayloadAction<OT.LeagueInfoType[]>) => {
      state.leagueArr = action.payload
    },
    setLeagueNum: (state, action: PayloadAction<LT.LeagueNumType>) => {
      state.leagueNum = action.payload
    },
  },
})
