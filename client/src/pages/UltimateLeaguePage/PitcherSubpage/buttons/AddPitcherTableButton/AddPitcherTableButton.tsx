import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddPitcherTableButton.scss'

type AddPitcherTableButtonProps = ButtonCommonProps

export const AddPitcherTableButton: FC<AddPitcherTableButtonProps> = ({...props}) => {
  const {openAddPitcherTableModal} = useModalActions()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddPitcherTableModal()
    },
    [openAddPitcherTableModal]
  )

  return (
    <button className={`AddPitcherTableButton`} onClick={onClickButton} type="button" {...props}>
      테이블 추가
    </button>
  )
}
