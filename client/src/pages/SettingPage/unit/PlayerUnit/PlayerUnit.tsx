import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PlayerUnit.scss'

type PlayerUnitProps = DivCommonProps

export const PlayerUnit: FC<PlayerUnitProps> = ({...props}) => {
  return (
    <div className={`PlayerUnit`} {...props}>
      PlayerUnit.tsx
    </div>
  )
}
