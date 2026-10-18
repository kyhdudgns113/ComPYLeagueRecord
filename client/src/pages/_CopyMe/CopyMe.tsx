import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './CopyMe.scss'

type CopyMeProps = DivCommonProps

export const CopyMe: FC<CopyMeProps> = ({...props}) => {
  return (
    <div className={`CopyMe`} {...props}>
      CopyMe.tsx
    </div>
  )
}
