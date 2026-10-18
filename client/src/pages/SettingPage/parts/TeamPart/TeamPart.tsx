import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './TeamPart.scss'

type TeamPartProps = DivCommonProps

export const TeamPart: FC<TeamPartProps> = ({...props}) => {
  return (
    <div className={`TeamPart`} {...props}>
      TeamPart.tsx
    </div>
  )
}
