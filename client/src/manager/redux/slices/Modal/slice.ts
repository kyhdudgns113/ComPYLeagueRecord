import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'

interface ModalState {
  modalType: LT.ModalType

  addPitcher_PitcherType: LT.ModalPitcherType
}

const initialState: ModalState = {
  modalType: null,

  addPitcher_PitcherType: null,
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.modalType = null
      state.addPitcher_PitcherType = null
    },

    openAddLeagueModal: state => {
      state.modalType = 'AddLeague'
      state.addPitcher_PitcherType = null
    },
    openAddPitcherModal: (state, action: PayloadAction<LT.ModalPitcherType>) => {
      state.modalType = 'AddPitcher'
      state.addPitcher_PitcherType = action.payload
    },
  },
})
