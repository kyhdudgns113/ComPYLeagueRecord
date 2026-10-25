import {useCallback, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {useLeagueNumSetting} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import * as LT from '@localType'
import * as V from '@value'

import './TeamButton.scss'

type TeamButtonProps = ButtonCommonProps & {
  teamIdx: number
}

export const TeamButton: FC<TeamButtonProps> = ({teamIdx, ...props}) => {
  const leagueNumSetting = useLeagueNumSetting()
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const navigate = useNavigate()

  const onClickButton = useCallback(
    (leagueNum: LT.LeagueNumType, teamIdx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      navigate(`/main/setting/${leagueNum}/${teamIdx}`)
    },
    []
  )

  // 리그·팀 바뀌면 선택 표시 초기화
  useEffect(() => {
    setIsSelected(false)
  }, [leagueNumSetting, teamIdx])

  return (
    <button
      className={`TeamButton ${isSelected ? '_selected' : ''} _team-${V.TEAM_NAME[teamIdx]}`}
      onClick={onClickButton(leagueNumSetting, teamIdx)}
      {...props}
    >
      {V.TEAM_NAME[teamIdx]}
    </button>
  )
}
