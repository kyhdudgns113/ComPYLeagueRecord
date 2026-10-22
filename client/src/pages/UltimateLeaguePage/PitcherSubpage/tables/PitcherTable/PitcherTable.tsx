import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'

import './PitcherTable.scss'

type PitcherTableProps = DivCommonProps & {
  pitcherTable: OT.UltiPitcherTableType
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherTable, ...props}) => {
  return (
    <div className={`PitcherTable`} {...props}>
      {/* 1. 버튼 행? */}
      {/* 2. 테이블 */}
      <table>
        <thead>
          <tr>
            <th className={`th-gameNum`}>데스파이네'21</th>
            <th className={`th-playNum`}>출전</th>
            <th className={`th-innings`}>이닝</th>
            <th className={`th-era`}>ERA</th>
            <th className={`th-win`}>승</th>
            <th className={`th-loss`}>패</th>
            <th className={`th-save`}>세</th>
            <th className={`th-hold`}>홀</th>
            <th className={`th-blown`}>블</th>
            <th className={`th-complete`}>완봉</th>
            <th className={`th-perfect`}>완투</th>
            <th className={`th-strikeout`}>삼진</th>
            <th className={`th-whip`}>WHIP</th>
            <th className={`th-homeRun`}>피홈런</th>
            <th className={`th-earnedRun`}>자책점</th>
            <th className={`th-k9`}>K/9</th>
            <th className={`th-hr9`}>홈런/9</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
