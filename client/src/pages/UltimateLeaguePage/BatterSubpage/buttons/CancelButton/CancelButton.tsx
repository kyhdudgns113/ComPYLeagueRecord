import {useCallback} from 'react'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {ButtonCommonProps} from '@prop'

import './CancelButton.scss'

type CancelButtonProps = ButtonCommonProps & {
  setIsEdit: Setter<boolean>
}

export const CancelButton: FC<CancelButtonProps> = ({setIsEdit, ...props}) => {
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
