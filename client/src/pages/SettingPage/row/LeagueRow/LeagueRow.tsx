import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as OT from '@objectType'

// 스타일은 상위 컴포넌트인 LeagueUnit.scss 에 있다
// import './LeagueRow.scss'

type LeagueRowProps = TableRowCommonProps & {
  league: OT.LeagueInfoType
}

export const LeagueRow: FC<LeagueRowProps> = ({league, ...props}) => {
  return (
    <tr className={`LeagueRow`} {...props}>
      <td className={`td-number`}>{league.leagueNum}</td>
      <td className={`td-createdAt`}>{new Date(league.createdAtNum).toLocaleString()}</td>
      <td className={`td-description`}>{league.description}</td>
    </tr>
  )
}
