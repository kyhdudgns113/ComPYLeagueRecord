import {useRecordStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as R from '../../rows'

import './LeagueUnit.scss'

type LeagueUnitProps = DivCommonProps

export const LeagueUnit: FC<LeagueUnitProps> = ({...props}) => {
  const {leagueArr} = useRecordStates()

  return (
    <div className={`LeagueUnit`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Unit`}>리그 목록</p>

      {/* 2. 테이블: 리그 목록 */}
      <table className={`Table_Unit`}>
        <thead>
          <tr>
            <th className={`th-number`}>#</th>
            <th className={`th-createdAt`}>생성일</th>
            <th className={`th-description`}>설명</th>
          </tr>
        </thead>
        <tbody>
          {leagueArr.map((league, leagueIdx) => {
            return <R.LeagueRow key={leagueIdx} league={league} />
          })}
        </tbody>
      </table>
    </div>
  )
}
