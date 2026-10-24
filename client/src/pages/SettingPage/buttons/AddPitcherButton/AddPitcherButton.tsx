import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as CT from '@commonType'

import './AddPitcherButton.scss'

type AddPitcherButtonProps = ButtonCommonProps & {
  pitcherType: CT.Type_Pitcher
}

export const AddPitcherButton: FC<AddPitcherButtonProps> = ({pitcherType, ...props}) => {
  const {openAddPitcherModal} = useModalActions()

  const onClickAddPitcher = useCallback(
    (pitcherType: CT.Type_Pitcher) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddPitcherModal(pitcherType)
    },
    []
  )

  return (
    <button className={`AddPitcherButton`} onClick={onClickAddPitcher(pitcherType)} {...props}>
      <Icon className={`AddPitcherIcon_Button`} iconName="add" />
    </button>
  )
}
