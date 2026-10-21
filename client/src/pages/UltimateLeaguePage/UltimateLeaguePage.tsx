import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './UltimateLeaguePage.scss'

type UltimateLeaguePageProps = DivCommonProps

export const UltimateLeaguePage: FC<UltimateLeaguePageProps> = ({...props}) => {
  return (
    <div className={`UltimateLeaguePage`} {...props}>
      UltimateLeaguePage.tsx
    </div>
  )
}
