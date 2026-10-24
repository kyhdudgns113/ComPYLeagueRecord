import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddLeagueButton.scss'

type AddLeagueButtonProps = ButtonCommonProps

export const AddLeagueButton: FC<AddLeagueButtonProps> = ({...props}) => {
  const {openAddLeagueModal} = useModalActions()

  const onClickAddLeague = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddLeagueModal()
    },
    []
  )

  return (
    <button className={`AddLeagueButton`} onClick={onClickAddLeague} {...props}>
      <Icon className={`AddLeagueIcon_Button`} iconName="add" />
    </button>
  )
}
