import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './BatterTable.scss'

import * as CT from '@commonType'

type BatterTableProps = DivCommonProps & {
  batterType: CT.Type_BatterClass
}

export const BatterTable: FC<BatterTableProps> = ({batterType, ...props}) => {
  return (
    <div className={`BatterTable`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_BatterTable`}>{`${batterType}타자`}</p>

      {/* 2. 테이블 */}
      <table className={`Table_BatterTable`}>
        <thead>
          <tr>
            <th>이름</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}
