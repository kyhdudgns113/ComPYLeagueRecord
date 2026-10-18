import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'

import './IconFilled.scss'

export type IconFilledProps = SpanCommonProps & {
  iconName: string
}

export const IconFilled: FC<IconFilledProps> = ({iconName, className, ...props}) => {
  return (
    <span className={`material-symbols-outlined fill ${className || ''}`} {...props}>
      {iconName}
    </span>
  )
}
