import {useAppSelector, useAppDispatch} from '@redux'
import {ModalSlice} from './slice'

export const useModalStates = () => useAppSelector(state => state.modal)

export const useModalActions = () => {
  const dispatch = useAppDispatch()

  return {
    closeModal: () => dispatch(ModalSlice.actions.setModalType(null)),

    openAddLeagueModal: () => dispatch(ModalSlice.actions.setModalType('AddLeague')),
  }
}

export const useModalType = () => useAppSelector(state => state.modal.modalType)
