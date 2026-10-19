import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useLeagueNum} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as LT from '@localType'
import * as V from '@value'

import './TeamButton.scss'

type TeamButtonProps = ButtonCommonProps & {
  teamIdx: number
}

export const TeamButton: FC<TeamButtonProps> = ({teamIdx, ...props}) => {
  const leagueNum = useLeagueNum()

  const navigate = useNavigate()

  const onClickButton = useCallback(
    (leagueNum: LT.LeagueNumType, teamIdx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      navigate(`/main/setting/${leagueNum}/${teamIdx}`)
    },
    [navigate]
  )

  return (
    <button className={`TeamButton`} onClick={onClickButton(leagueNum, teamIdx)} {...props}>
      {V.TEAM_NAME[teamIdx]}
    </button>
  )
}
