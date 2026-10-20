import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'
import * as OT from '@objectType'

interface ModalState {
  modalType: LT.ModalType

  addBatter_BatterClass: LT.ModalBatterClassType
  addPitcher_PitcherType: LT.ModalPitcherType
  modifyBatter: OT.BatterType | null
  modifyPitcher: OT.PitcherType | null
}

const initialState: ModalState = {
  modalType: null,

  addBatter_BatterClass: null,
  addPitcher_PitcherType: null,
  modifyBatter: null,
  modifyPitcher: null,
}

const clearModalExtras = (state: ModalState) => {
  state.addBatter_BatterClass = null
  state.addPitcher_PitcherType = null
  state.modifyBatter = null
  state.modifyPitcher = null
}

export const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: state => {
      state.modalType = null
      clearModalExtras(state)
    },

    openAddBatterModal: (state, action: PayloadAction<LT.ModalBatterClassType>) => {
      state.modalType = 'AddBatter'
      clearModalExtras(state)
      state.addBatter_BatterClass = action.payload
    },
    openAddLeagueModal: state => {
      state.modalType = 'AddLeague'
      clearModalExtras(state)
    },
    openAddPitcherModal: (state, action: PayloadAction<LT.ModalPitcherType>) => {
      state.modalType = 'AddPitcher'
      clearModalExtras(state)
      state.addPitcher_PitcherType = action.payload
    },
    openModifyBatterModal: (state, action: PayloadAction<OT.BatterType>) => {
      state.modalType = 'ModifyBatter'
      clearModalExtras(state)
      state.modifyBatter = action.payload
    },
    openModifyPitcherModal: (state, action: PayloadAction<OT.PitcherType>) => {
      state.modalType = 'ModifyPitcher'
      clearModalExtras(state)
      state.modifyPitcher = action.payload
    },
  },
})
