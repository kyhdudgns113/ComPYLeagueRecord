import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './BatterSubpage.scss'

type BatterSubpageProps = DivCommonProps

export const BatterSubpage: FC<BatterSubpageProps> = ({...props}) => {
  return (
    <div className={`BatterSubpage`} {...props}>
      BatterSubpage.tsx
    </div>
  )
}
