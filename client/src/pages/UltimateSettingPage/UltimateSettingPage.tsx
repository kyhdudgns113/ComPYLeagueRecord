import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './UltimateSettingPage.scss'

type UltimateSettingPageProps = DivCommonProps

export const UltimateSettingPage: FC<UltimateSettingPageProps> = ({...props}) => {
  return (
    <div className={`UltimateSettingPage`} {...props}>
      UltimateSettingPage.tsx
    </div>
  )
}
