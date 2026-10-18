import type {FC} from 'react'
import type {SpanCommonProps} from '@prop'

import './Icon.scss'

export type IconProps = SpanCommonProps & {
  iconName: string
}

export const Icon: FC<IconProps> = ({iconName, className, ...props}) => {
  return (
    <span className={`material-symbols-outlined Icon ${className || ''}`} {...props}>
      {iconName}
    </span>
  )
}
