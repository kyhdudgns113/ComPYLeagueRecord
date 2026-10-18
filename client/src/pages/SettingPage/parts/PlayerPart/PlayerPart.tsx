import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PlayerPart.scss'

type PlayerPartProps = DivCommonProps

export const PlayerPart: FC<PlayerPartProps> = ({...props}) => {
  return (
    <div className={`PlayerPart`} {...props}>
      PlayerPart.tsx
    </div>
  )
}
