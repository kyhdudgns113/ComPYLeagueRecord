import {useEffect, useState} from 'react'

import {useLeagueNumSetting} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as V from '@value'

import './TeamUnit.scss'

type TeamUnitProps = DivCommonProps

export const TeamUnit: FC<TeamUnitProps> = ({...props}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const leagueNumSetting = useLeagueNumSetting()

  const halfLen = Math.floor(V.TEAM_IDX_ARR.length / 2)

  useEffect(() => {
    setIsHidden(leagueNumSetting === null || leagueNumSetting === undefined)
  }, [leagueNumSetting])

  return (
    <div className={`TeamUnit`} {...props}>
      <div hidden={isHidden}>
        {/* 1. 타이틀 */}
        <p className={`Title_Unit`}>{`[리그 ${leagueNumSetting}] 팀 선택`}</p>

        {/* 2. 팀 행 1 */}
        <div className={`TeamRow_Unit row_1`}>
          {V.TEAM_IDX_ARR.slice(0, halfLen).map(teamIdx => (
            <B.TeamButton key={teamIdx} teamIdx={teamIdx} />
          ))}
        </div>

        {/* 3. 팀 행 2 */}
        <div className={`TeamRow_Unit row_2`}>
          {V.TEAM_IDX_ARR.slice(halfLen).map(teamIdx => (
            <B.TeamButton key={teamIdx} teamIdx={teamIdx} />
          ))}
        </div>
      </div>
    </div>
  )
}
