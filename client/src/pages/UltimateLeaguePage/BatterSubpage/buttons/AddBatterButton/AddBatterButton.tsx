import {useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'

import './AddBatterButton.scss'

type AddBatterButtonProps = ButtonCommonProps

export const AddBatterButton: FC<AddBatterButtonProps> = ({...props}) => {
  const {openAddUltiBatterModal} = useModalActions()
  const {batterTable} = C.useBatterTableContext()

  const onClickButton = useCallback(
    (tableOId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      openAddUltiBatterModal(tableOId)
    },
    []
  )

  return (
    <button className={`AddBatterButton`} onClick={onClickButton(batterTable.tableOId)} type="button" {...props}>
      타자 추가
    </button>
  )
}
