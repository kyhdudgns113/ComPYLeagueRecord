import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddBatterTableButton.scss'

type AddBatterTableButtonProps = ButtonCommonProps

export const AddBatterTableButton: FC<AddBatterTableButtonProps> = ({...props}) => {
  const {openAddBatterTableModal} = useModalActions()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddBatterTableModal()
    },
    [openAddBatterTableModal]
  )

  return (
    <button className={`AddBatterTableButton`} onClick={onClickButton} type="button" {...props}>
      테이블 추가
    </button>
  )
}
