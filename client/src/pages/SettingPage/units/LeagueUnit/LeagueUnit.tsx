import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useRecordStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as R from '../../rows'

import './LeagueUnit.scss'

type LeagueUnitProps = DivCommonProps

export const LeagueUnit: FC<LeagueUnitProps> = ({...props}) => {
  const {leagueArr} = useRecordStates()

  const navigate = useNavigate()

  const onClickTHNumber = useCallback(
    (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      navigate('/main/setting')
    },
    [navigate]
  )

  return (
    <div className={`LeagueUnit`} {...props}>
      {/* 1. 타이틀행(with 버튼) */}
      <div className={`TitleRow_Unit`}>
        <p className={`Title_Unit`}>리그 목록</p>
        <B.AddLeagueButton />
      </div>

      {/* 2. 테이블: 리그 목록 */}
      <table className={`Table_Unit`}>
        <thead>
          <tr>
            <th className={`th-number`} onClick={onClickTHNumber}>
              번호
            </th>
            <th className={`th-createdAt`}>날짜</th>
            <th className={`th-description`}>설명</th>
          </tr>
        </thead>
        <tbody>
          {/* 리그 목록 */}
          {leagueArr.map((league, leagueIdx) => {
            return <R.LeagueRow key={leagueIdx} league={league} />
          })}
        </tbody>
      </table>
    </div>
  )
}
