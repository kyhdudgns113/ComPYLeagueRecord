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
      {/* 1. 버튼 행 */}
      <div className={`ButtonRow_SubPage`}>
        <B.AddPitcherTableButton />
        <B.DeleteLeagueButton />
      </div>

      {/* 2. 테이블 목록 */}
      <div className={`TableArr_SubPage`}>
        {pitcherTableArr.map((pitcherTable, tableIdx) => (
          <T.PitcherTable
            key={pitcherTable.tableOId}
            pitcherTable={pitcherTable}
            prevTable={pitcherTableArr[tableIdx + 1] || null}
          />
        ))}
      </div>
    </div>
  )
}
