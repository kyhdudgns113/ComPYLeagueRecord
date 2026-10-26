import {useCallback} from 'react'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'

import './CancelButton.scss'

type CancelButtonProps = ButtonCommonProps

export const CancelButton: FC<CancelButtonProps> = ({...props}) => {
  const {setIsEdit} = C.useBatterTableContext()

  const onClickButton = useCallback(
    (setIsEdit: Setter<boolean>) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setIsEdit(false)
    },
    []
  )

  return (
    <button className={`CancelButton`} onClick={onClickButton(setIsEdit)} type="button" {...props}>
      취소
    </button>
  )
}
