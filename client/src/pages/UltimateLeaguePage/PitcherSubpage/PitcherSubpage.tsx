import {useUltimatePitcherTableArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from './buttons'
import * as T from './tables'

import './PitcherSubpage.scss'

type PitcherSubpageProps = DivCommonProps

export const PitcherSubpage: FC<PitcherSubpageProps> = ({...props}) => {
  const pitcherTableArr = useUltimatePitcherTableArr()
  return (
    <div className={`PitcherSubpage`} {...props}>
      {/* 1. 테이블 추가 버튼 */}
      <B.AddPitcherTableButton />

      {/* 2. 테이블 목록 */}
      <div className={`TableArr_SubPage`}>
        {pitcherTableArr.map((pitcherTable, idx) => (
          <T.PitcherTable key={idx} pitcherTable={pitcherTable} />
        ))}
      </div>
    </div>
  )
}
