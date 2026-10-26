import {useUltimateBatterTableArr} from '@redux'

import {DeleteLeagueButton} from '../PitcherSubpage/buttons'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from './buttons'
import * as T from './tables'

import './BatterSubpage.scss'

type BatterSubpageProps = DivCommonProps

export const BatterSubpage: FC<BatterSubpageProps> = ({...props}) => {
  const batterTableArr = useUltimateBatterTableArr()
  return (
    <div className={`BatterSubpage`} {...props}>
      {/* 1. 버튼 행 */}
      <div className={`ButtonRow_SubPage`}>
        <B.AddBatterTableButton />
        <DeleteLeagueButton />
      </div>

      {/* 2. 테이블 목록 */}
      <div className={`TableArr_SubPage`}>
        {batterTableArr.map((batterTable, tableIdx) => (
          <T.BatterTable
            batterTable={batterTable}
            key={batterTable.tableOId}
            prevTable={batterTableArr[tableIdx + 1] || null}
          />
        ))}
      </div>
    </div>
  )
}
