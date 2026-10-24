import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddBatterButton.scss'

type AddBatterButtonProps = ButtonCommonProps & {
  tableOId: string
}

export const AddBatterButton: FC<AddBatterButtonProps> = ({tableOId, ...props}) => {
  const {openAddUltiBatterModal} = useModalActions()

  const onClickButton = useCallback(
    (tableOId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddUltiBatterModal(tableOId)
    },
    []
  )

  return (
    <button className={`AddBatterButton`} onClick={onClickButton(tableOId)} type="button" {...props}>
      타자 추가
    </button>
  )
}
