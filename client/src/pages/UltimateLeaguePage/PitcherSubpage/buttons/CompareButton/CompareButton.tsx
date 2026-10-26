import {useCallback} from 'react'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as C from '../../bases'

import './CompareButton.scss'

type CompareButtonProps = ButtonCommonProps

export const CompareButton: FC<CompareButtonProps> = ({...props}) => {
  const {isCompare, setIsCompare} = C.usePitcherTableContext()

  const onClickButton = useCallback(
    (isCompare: boolean) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setIsCompare(!isCompare)
    },
    []
  )

  return (
    <button className={`CompareButton ${isCompare ? '_comparing' : ''}`} onClick={onClickButton(isCompare)} type="button" {...props}>
      비교
    </button>
  )
}
