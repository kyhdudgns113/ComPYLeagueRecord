import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useUltimateLeagueNum} from '@redux'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

// 스타일은 상위 컴포넌트인 LeagueUnit.scss 에 있다
// import './LeagueRow.scss'

type LeagueRowProps = TableRowCommonProps & {
  league: OT.UltiLeagueInfoType
}

export const LeagueRow: FC<LeagueRowProps> = ({league, ...props}) => {
  const leagueNum = useUltimateLeagueNum()
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (nextLeagueNum: number) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      e.stopPropagation()
      navigate(`/main/ultimateLeague/${nextLeagueNum}`)
    },
    []
  )

  return (
    <tr className={`LeagueRow ${leagueNum === league.leagueNum ? '_selected' : ''}`} onClick={onClickRow(league.leagueNum)} {...props}>
      <td className={`td-number`}>{league.leagueNum}</td>
      <td className={`td-createdAt`}>{U.convertDateNum(league.createdAtNum)}</td>
      <td className={`td-description`}>{league.description}</td>
    </tr>
  )
}
