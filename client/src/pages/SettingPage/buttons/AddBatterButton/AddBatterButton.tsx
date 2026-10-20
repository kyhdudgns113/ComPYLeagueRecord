import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as CT from '@commonType'

import './AddBatterButton.scss'

type AddBatterButtonProps = ButtonCommonProps & {
  batterType: CT.Type_BatterClass
}

export const AddBatterButton: FC<AddBatterButtonProps> = ({batterType, ...props}) => {
  const {openAddBatterModal} = useModalActions()

  const onClickAddBatter = useCallback(
    (batterType: CT.Type_BatterClass) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddBatterModal(batterType)
    },
    [openAddBatterModal]
  )

  return (
    <button className={`AddBatterButton`} onClick={onClickAddBatter(batterType)} {...props}>
      <Icon className={`AddBatterIcon_Button`} iconName="add" />
    </button>
  )
}
