import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

interface ModalState {
  modalType: LT.ModalType
}

const initialState: ModalState = {
  modalType: null,
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType: (state, action: PayloadAction<LT.ModalType>) => {
      state.modalType = action.payload
    },
  },
})
