import {Modal} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddLeagueModal.scss'

type AddLeagueModalProps = ModalCommonProps

export const AddLeagueModal: FC<AddLeagueModalProps> = ({...props}) => {
  const {closeModal} = useModalActions()

  return (
    <Modal {...props} onClose={closeModal}>
      <div className={`AddLeagueModal`}>
        <h1>Add League</h1>
      </div>
    </Modal>
  )
}
