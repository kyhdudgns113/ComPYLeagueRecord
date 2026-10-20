import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'
import * as OT from '@objectType'

interface RecordState {
  gameArr: OT.GameInfoType[]
  gameNum: LT.GameNumType
  leagueArr: OT.LeagueInfoType[]
  leagueNum: LT.LeagueNumType

  recordArr: OT.RecordElementType[]
}

const initialState: RecordState = {
  gameArr: [],
  gameNum: null,
  leagueArr: [],
  leagueNum: null,

  recordArr: [],
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

    setGameArr: (state, action: PayloadAction<OT.GameInfoType[]>) => {
      state.gameArr = action.payload
    },
    setGameNum: (state, action: PayloadAction<LT.GameNumType>) => {
      state.gameNum = action.payload
    },
    setLeagueArr: (state, action: PayloadAction<OT.LeagueInfoType[]>) => {
      state.leagueArr = action.payload
    },
    setLeagueNum: (state, action: PayloadAction<LT.LeagueNumType>) => {
      state.leagueNum = action.payload
    },
    setRecordArr: (state, action: PayloadAction<OT.RecordElementType[]>) => {
      state.recordArr = action.payload
    },
  },
})
