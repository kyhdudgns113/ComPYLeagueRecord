import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './LeaguePart.scss'

type LeaguePartProps = DivCommonProps

export const LeaguePart: FC<LeaguePartProps> = ({...props}) => {
  return (
    <div className={`LeaguePart`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Part`}>리그 목록</p>

      {/* 2. 테이블: 리그 목록 */}
      <table className={`Table_Part`}>
        <thead>
          <tr>
            <th className={`th-number`}>번호</th>
            <th className={`th-createdAt`}>날짜</th>
            <th className={`th-description`}>설명</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`td-number`}>1</td>
            <td className={`td-createdAt`}>1</td>
            <td className={`td-description`}>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
