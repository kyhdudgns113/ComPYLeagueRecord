import {useAppSelector, useAppDispatch} from '@redux'
import {ModalSlice} from './slice'

import * as CT from '@commonType'
import * as OT from '@objectType'

export const useModalStates = () => useAppSelector(state => state.modal)

export const useModalActions = () => {
  const dispatch = useAppDispatch()

  return {
    closeModal: () => dispatch(ModalSlice.actions.closeModal()),

    openAddBatterModal: (batterClass: CT.Type_BatterClass) => dispatch(ModalSlice.actions.openAddBatterModal(batterClass)),
    openAddLeagueModal: () => dispatch(ModalSlice.actions.openAddLeagueModal()),
    openAddPitcherModal: (pitcherType: CT.Type_Pitcher) => dispatch(ModalSlice.actions.openAddPitcherModal(pitcherType)),
    openModifyBatterModal: (batter: OT.BatterType) => dispatch(ModalSlice.actions.openModifyBatterModal(batter)),
    openModifyPitcherModal: (pitcher: OT.PitcherType) => dispatch(ModalSlice.actions.openModifyPitcherModal(pitcher)),
  }
}

export const useModalType = () => useAppSelector(state => state.modal.modalType)
