import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PitcherSubpage.scss'

type PitcherSubpageProps = DivCommonProps

export const PitcherSubpage: FC<PitcherSubpageProps> = ({...props}) => {
  return (
    <div className={`PitcherSubpage`} {...props}>
      PitcherSubpage.tsx
    </div>
  )
}
