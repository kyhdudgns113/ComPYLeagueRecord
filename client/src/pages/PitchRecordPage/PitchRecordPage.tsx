import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as U from './units'

import './PitchRecordPage.scss'

type PitchRecordPageProps = DivCommonProps

export const PitchRecordPage: FC<PitchRecordPageProps> = ({...props}) => {
  return (
    <div className={`PitchRecordPage`} {...props}>
      {/* 1. 타이틀 */}

      {/* 2. 몸통 행 */}
      <div className={`Body_Page`}>
        {/* 2-1. 리그 목록 */}
        <U.LeagueUnit />

        {/* 2-2. 게임 목록 */}
        <U.GameUnit />

        {/* 2-3. 투구 기록 테이블 */}
        <U.RecordUnit />
      </div>
    </div>
  )
}
