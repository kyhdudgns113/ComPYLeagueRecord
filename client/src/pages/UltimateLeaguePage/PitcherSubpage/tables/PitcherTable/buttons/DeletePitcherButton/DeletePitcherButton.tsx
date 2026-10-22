import {useCallback} from 'react'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './DeletePitcherButton.scss'

type DeletePitcherButtonProps = ButtonCommonProps & {
  name: string
}

export const DeletePitcherButton: FC<DeletePitcherButtonProps> = ({name, onClick, ...props}) => {
  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!confirm(`투수 "${name}" 을(를) 삭제할까요?`)) {
        return
      }

      onClick?.(e)
    },
    [name, onClick]
  )

  return (
    <button className={`DeletePitcherButton`} onClick={onClickButton} type="button" {...props}>
      삭제
    </button>
  )
}
