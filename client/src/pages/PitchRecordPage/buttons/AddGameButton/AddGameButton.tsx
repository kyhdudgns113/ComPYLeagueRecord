import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions, useRecordStates} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './AddGameButton.scss'

type AddGameButtonProps = ButtonCommonProps

export const AddGameButton: FC<AddGameButtonProps> = ({...props}) => {
  const {gameArr} = useRecordStates()
  const {openAddGameModal} = useModalActions()

  const onClickAddGame = useCallback(
    (gameLen: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (gameLen >= 144) {
        alert(`[AddGameButton] 게임은 최대 144개까지 생성할 수 있습니다.`)
        return
      }

      openAddGameModal()
    },
    [openAddGameModal]
  )

  return (
    <button className={`AddGameButton`} onClick={onClickAddGame(gameArr.length)} {...props}>
      <Icon className={`AddGameIcon_Button`} iconName="add" />
    </button>
  )
}
