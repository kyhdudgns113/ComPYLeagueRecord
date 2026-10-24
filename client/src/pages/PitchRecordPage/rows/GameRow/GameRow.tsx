import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useRecordStates} from '@redux'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as OT from '@objectType'

// 스타일은 상위 컴포넌트인 GameUnit.scss 에 있다
// import './GameRow.scss'

type GameRowProps = TableRowCommonProps & {
  game: OT.GameInfoType
}

export const GameRow: FC<GameRowProps> = ({game, ...props}) => {
  const {gameNum, leagueNum} = useRecordStates()
  const navigate = useNavigate()

  const onClickRow = useCallback(
    (nextLeagueNum: number, nextGameNum: number) => (e: React.MouseEvent<HTMLTableRowElement>) => {
      e.stopPropagation()
      navigate(`/main/pitchRecord/${nextLeagueNum}/${nextGameNum}`)
    },
    []
  )

  return (
    <tr className={`GameRow ${gameNum === game.gameNum ? '_selected' : ''}`} onClick={onClickRow(leagueNum || game.leagueNum, game.gameNum)} {...props}>
      <td className={`td-number`}>{game.gameNum}</td>
      <td className={`td-enemyTeam`}>{game.enemyTeam}</td>
      <td className={`td-SPName`}>{game.SPName}</td>
    </tr>
  )
}
