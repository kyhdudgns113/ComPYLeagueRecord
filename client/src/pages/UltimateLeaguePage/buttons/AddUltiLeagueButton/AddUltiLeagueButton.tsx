import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddUltiLeagueButton.scss'

type AddUltiLeagueButtonProps = ButtonCommonProps

export const AddUltiLeagueButton: FC<AddUltiLeagueButtonProps> = ({...props}) => {
  const {openAddUltiLeagueModal} = useModalActions()

  const onClickAddLeague = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddUltiLeagueModal()
    },
    [openAddUltiLeagueModal]
  )

  return (
    <button className={`AddUltiLeagueButton`} onClick={onClickAddLeague} type="button" {...props}>
      <Icon className={`AddUltiLeagueIcon_Button`} iconName="add" />
    </button>
  )
}
