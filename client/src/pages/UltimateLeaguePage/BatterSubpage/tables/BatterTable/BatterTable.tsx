import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'

import './BatterTable.scss'

type BatterTableProps = DivCommonProps & {
  batterTable: OT.UltiBatterTableType
}

export const BatterTable: FC<BatterTableProps> = ({batterTable, ...props}) => {
  return (
    <div className={`BatterTable`} {...props}>
      {/* 1. 버튼 행? */}
      {/* 2. 테이블 */}
      <table>
        <thead>
          <tr>
            <th className={`th-gameNum`}>이정후'21</th>
            <th className={`th-playNum`}>출전</th>
            <th className={`th-atBat`}>타수</th>
            <th className={`th-avg`}>타율</th>
            <th className={`th-hit1`}>1루타</th>
            <th className={`th-hit2`}>2루타</th>
            <th className={`th-hit3`}>3루타</th>
            <th className={`th-hit4`}>홈런</th>
            <th className={`th-steal`}>도루</th>
            <th className={`th-slg`}>장타</th>
            <th className={`th-ops`}>OPS</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
