import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'

import './AddPitcherButton.scss'

type AddPitcherButtonProps = ButtonCommonProps

export const AddPitcherButton: FC<AddPitcherButtonProps> = ({...props}) => {
  const {openAddUltiPitcherModal} = useModalActions()
  const {pitcherTable} = C.usePitcherTableContext()

  const onClickButton = useCallback(
    (tableOId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddUltiPitcherModal(tableOId)
    },
    []
  )

  return (
    <button className={`AddPitcherButton`} onClick={onClickButton(pitcherTable.tableOId)} type="button" {...props}>
      투수 추가
    </button>
  )
}
