import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

// 스타일은 상위 컴포넌트인 LeagueUnit.scss 에 있다
// import './LeagueRow.scss'

type LeagueRowProps = TableRowCommonProps & {
  league: OT.LeagueInfoType
}

export const LeagueRow: FC<LeagueRowProps> = ({league, ...props}) => {
  const navigate = useNavigate()

  const onClickNumber = useCallback(
    (leagueNum: number) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      navigate(`/main/setting/${leagueNum}`)
    },
    [navigate]
  )

  return (
    <tr className={`LeagueRow`} {...props}>
      <td className={`td-number`} onClick={onClickNumber(league.leagueNum)}>
        {league.leagueNum}
      </td>
      <td className={`td-createdAt`}>{U.convertDateNum(league.createdAtNum)}</td>
      <td className={`td-description`}>{league.description}</td>
    </tr>
  )
}
