import {useEffect, useState} from 'react'

import {useRecordStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as R from '../../rows'

import './GameUnit.scss'

type GameUnitProps = DivCommonProps

export const GameUnit: FC<GameUnitProps> = ({...props}) => {
  const {gameArr, leagueNum} = useRecordStates()
  const [isHidden, setIsHidden] = useState<boolean>(true)

  useEffect(() => {
    setIsHidden(leagueNum === null)
  }, [leagueNum])

  return (
    <div className={`GameUnit`} {...props}>
      <div hidden={isHidden}>
        {/* 1. 타이틀행(with 버튼) */}
        <div className={`TitleRow_Unit`}>
          <p className={`Title_Unit`}>{`리그 ${leagueNum || ''}`}</p>
          <B.AddGameButton />
        </div>

        {/* 2. 테이블: 게임 목록 */}
        <table className={`Table_Unit`}>
          <thead>
            <tr>
              <th className={`th-number`}>#</th>
              <th className={`th-enemyTeam`}>상대</th>
              <th className={`th-SPName`}>선발</th>
            </tr>
          </thead>
          <tbody>
            {gameArr.map((game, gameIdx) => {
              return <R.GameRow key={gameIdx} game={game} />
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
