import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

interface CopyMeState {
  countCopyMe: number
  isCopyMe: boolean
  nameCopyMe: string
}

const initialState: CopyMeState = {
  countCopyMe: 0,
  isCopyMe: true,
  nameCopyMe: "CopyMe"
}

export const copyMeSlice = createSlice({
  name: 'copyMe',
  initialState,
  reducers: {
    switchCopyMe: state => {
      state.isCopyMe = !state.isCopyMe
    },

    setCountCopyMe: (state, action: PayloadAction<number>) => {
      state.countCopyMe = action.payload
    },

    setArgsCopyMe: (state, action: PayloadAction<{count: number, name: string}>) => {
      const {count, name} = action.payload

      state.nameCopyMe = name
      state.countCopyMe = count
    }
  }
})