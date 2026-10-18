import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as P from './parts'

import './SettingPage.scss'

type SettingPageProps = DivCommonProps

export const SettingPage: FC<SettingPageProps> = ({...props}) => {
  return (
    <div className={`SettingPage`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Page`}>게임 설정</p>

      {/* 2. 몸통 */}
      <div className={`Body_Page`}>
        <P.LeaguePart />
        <P.TeamPart />
        <P.PlayerPart />
      </div>
    </div>
  )
}
