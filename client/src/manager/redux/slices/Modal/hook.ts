import {useAppSelector, useAppDispatch} from '@redux'
import {ModalSlice} from './slice'

import * as CT from '@commonType'

export const useModalStates = () => useAppSelector(state => state.modal)

export const useModalActions = () => {
  const dispatch = useAppDispatch()

  return {
    closeModal: () => dispatch(ModalSlice.actions.closeModal()),

    openAddBatterModal: (batterClass: CT.Type_BatterClass) => dispatch(ModalSlice.actions.openAddBatterModal(batterClass)),
    openAddLeagueModal: () => dispatch(ModalSlice.actions.openAddLeagueModal()),
    openAddPitcherModal: (pitcherType: CT.Type_Pitcher) => dispatch(ModalSlice.actions.openAddPitcherModal(pitcherType)),
  }
}

export const useModalType = () => useAppSelector(state => state.modal.modalType)
