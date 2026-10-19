import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PitcherTable.scss'

import * as CT from '@commonType'

type PitcherTableProps = DivCommonProps & {
  pitcherType: CT.Type_Pitcher
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherType, ...props}) => {
  return (
    <div className={`PitcherTable`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_PitcherTable`}>{`${pitcherType}투수`}</p>

      {/* 2. 테이블 */}
      <table className={`Table_PitcherTable`}>
        <thead>
          <tr>
            <th>이름</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
