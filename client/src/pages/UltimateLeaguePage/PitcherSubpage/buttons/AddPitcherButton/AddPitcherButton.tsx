import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddPitcherButton.scss'

type AddPitcherButtonProps = ButtonCommonProps & {
  tableOId: string
}

export const AddPitcherButton: FC<AddPitcherButtonProps> = ({tableOId, ...props}) => {
  const {openAddUltiPitcherModal} = useModalActions()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddUltiPitcherModal(tableOId)
    },
    [openAddUltiPitcherModal, tableOId]
  )

  return (
    <button className={`AddPitcherButton`} onClick={onClickButton} type="button" {...props}>
      투수 추가
    </button>
  )
}
