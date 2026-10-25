import {createSlice} from '@reduxjs/toolkit'

import type {PayloadAction} from '@reduxjs/toolkit' // eslint-disable-line

import * as LT from '@localType'
import * as OT from '@objectType'

interface ModalState {
  modalType: LT.ModalType

  addBatter_BatterClass: LT.ModalBatterClassType
  addPitcher_PitcherType: LT.ModalPitcherType
  addUltiBatter_TableOId: string | null
  addUltiPitcher_TableOId: string | null
  editRecord: LT.EditRecordPayload | null
  editUltiRecordDesc: LT.EditUltiRecordDescPayload | null
  modifyBatter: OT.BatterType | null
  modifyPitcher: OT.PitcherType | null
}

const initialState: ModalState = {
  modalType: null,

  addBatter_BatterClass: null,
  addPitcher_PitcherType: null,
  addUltiBatter_TableOId: null,
  addUltiPitcher_TableOId: null,
  editRecord: null,
  editUltiRecordDesc: null,
  modifyBatter: null,
  modifyPitcher: null,
}

const clearModalExtras = (state: ModalState) => {
  state.addBatter_BatterClass = null
  state.addPitcher_PitcherType = null
  state.addUltiBatter_TableOId = null
  state.addUltiPitcher_TableOId = null
  state.editRecord = null
  state.editUltiRecordDesc = null
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
    openAddBatterTableModal: state => {
      state.modalType = 'AddBatterTable'
      clearModalExtras(state)
    },
    openAddGameModal: state => {
      state.modalType = 'AddGame'
      clearModalExtras(state)
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
    openAddPitcherTableModal: state => {
      state.modalType = 'AddPitcherTable'
      clearModalExtras(state)
    },
    openAddUltiBatterModal: (state, action: PayloadAction<string>) => {
      state.modalType = 'AddUltiBatter'
      clearModalExtras(state)
      state.addUltiBatter_TableOId = action.payload
    },
    openAddUltiLeagueModal: state => {
      state.modalType = 'AddUltiLeague'
      clearModalExtras(state)
    },
    openAddUltiPitcherModal: (state, action: PayloadAction<string>) => {
      state.modalType = 'AddUltiPitcher'
      clearModalExtras(state)
      state.addUltiPitcher_TableOId = action.payload
    },
    openEditRecordModal: (state, action: PayloadAction<LT.EditRecordPayload>) => {
      state.modalType = 'EditRecord'
      clearModalExtras(state)
      state.editRecord = action.payload
    },
    openEditUltiRecordDescModal: (state, action: PayloadAction<LT.EditUltiRecordDescPayload>) => {
      state.modalType = 'EditUltiRecordDesc'
      clearModalExtras(state)
      state.editUltiRecordDesc = action.payload
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
