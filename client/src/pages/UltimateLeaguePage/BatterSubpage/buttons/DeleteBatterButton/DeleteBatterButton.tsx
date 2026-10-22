import {useCallback} from 'react'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './DeleteBatterButton.scss'

type DeleteBatterButtonProps = ButtonCommonProps & {
  name: string
}

export const DeleteBatterButton: FC<DeleteBatterButtonProps> = ({name, onClick, ...props}) => {
  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!confirm(`타자 "${name}" 을(를) 삭제할까요?`)) {
        return
      }

      onClick?.(e)
    },
    [name, onClick]
  )

  return (
    <button className={`DeleteBatterButton`} onClick={onClickButton} type="button" {...props}>
      삭제
    </button>
  )
}
