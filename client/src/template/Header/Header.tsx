import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './Header.scss'

type HeaderCopyMeProps = DivCommonProps

export const Header: FC<HeaderCopyMeProps> = ({...props}) => {
  return (
    <div className={`Header`} {...props}>
      Header.tsx
    </div>
  )
}
