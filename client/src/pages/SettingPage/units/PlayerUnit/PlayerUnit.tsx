import {Fragment, useEffect, useState} from 'react'

import {useLeagueNumSetting, useTeamIdxSetting} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as TB from '../../tables'
import * as V from '@value'

import './PlayerUnit.scss'

type PlayerUnitProps = DivCommonProps

export const PlayerUnit: FC<PlayerUnitProps> = ({...props}) => {
  const leagueNumSetting = useLeagueNumSetting()
  const teamIdxSetting = useTeamIdxSetting()

  const [isHidden, setIsHidden] = useState<boolean>(true)
  const [isMyTeam, setIsMyTeam] = useState<boolean>(false)
  const [teamName, setTeamName] = useState<string>('')

  // 자동 갱신: isHidden
  useEffect(() => {
    if (leagueNumSetting === null || leagueNumSetting === undefined || teamIdxSetting === null || teamIdxSetting === undefined) {
      setIsHidden(true)
      setIsMyTeam(false)
    } // ::
    else {
      setIsHidden(false)

      if (teamIdxSetting === V.MY_TEAM_IDX) {
        setIsMyTeam(true)
      } // ::
      else {
        setIsMyTeam(false)
      }
    }
  }, [leagueNumSetting, teamIdxSetting])

  // 선택된 팀 이름
  useEffect(() => {
    if (teamIdxSetting !== null) {
      setTeamName(V.TEAM_NAME[teamIdxSetting])
    } // ::
    else {
      setTeamName('')
    }
  }, [teamIdxSetting])

  return (
    <div className={`PlayerUnit`} {...props}>
      <p className={`Title_Unit ${isHidden ? 'hidden' : ''} ${teamName ? `_team-${teamName}` : ''}`}>{`${teamName} 선수 명단`}</p>
      <div className={`Container_Unit ${isHidden ? 'hidden' : ''}`}>
        {isMyTeam && (
          <Fragment>
            <TB.PitcherTable pitcherType={'선발'} />
            <TB.PitcherTable pitcherType={'중계'} />
            <TB.PitcherTable pitcherType={'마무리'} />
          </Fragment>
        )}
        {!isMyTeam && (
          <Fragment>
            <TB.BatterTable batterType={'선발'} />
            <TB.BatterTable batterType={'후보'} />
          </Fragment>
        )}
      </div>
    </div>
  )
}
