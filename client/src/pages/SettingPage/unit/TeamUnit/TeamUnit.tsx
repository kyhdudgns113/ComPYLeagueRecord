import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './TeamUnit.scss'

type TeamUnitProps = DivCommonProps

export const TeamUnit: FC<TeamUnitProps> = ({...props}) => {
  return (
    <div className={`TeamUnit`} {...props}>
      TeamUnit.tsx
    </div>
  )
}
