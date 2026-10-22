import {useCallback} from 'react'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './ModifyButton.scss'

type ModifyButtonProps = ButtonCommonProps & {
  isEdit: boolean
}

export const ModifyButton: FC<ModifyButtonProps> = ({isEdit, onClick, ...props}) => {
  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      onClick?.(e)
    },
    [onClick]
  )

  return (
    <button className={`ModifyButton ${isEdit ? '_editing' : ''}`} onClick={onClickButton} type="button" {...props}>
      {isEdit ? '완료' : '수정'}
    </button>
  )
}
