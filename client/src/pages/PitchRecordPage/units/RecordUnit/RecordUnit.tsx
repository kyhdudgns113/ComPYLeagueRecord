import {Fragment, useEffect, useState} from 'react'

import {useRecordStates, useTeamBatterArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'
import * as R from '../../rows'
import * as V from '@value'

import './RecordUnit.scss'

const ORDER_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const getAtBatArr = (recordArr: OT.RecordElementType[], order: number, atBatLen: number) => {
  return Array.from({length: atBatLen}, (_, atBatIdx) => {
    return recordArr.find(record => record.order === order && record.rotation === atBatIdx + 1) || null
  })
}

type RecordUnitProps = DivCommonProps

export const RecordUnit: FC<RecordUnitProps> = ({...props}) => {
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const teamIdx = game ? V.TEAM_IDX_MAP[game.enemyTeam] : -1
  const starterArr = useTeamBatterArr(leagueNum ?? -1, teamIdx, '선발')

  const lineupArr = ORDER_ARR.map((_, orderIdx) => starterArr[orderIdx] || V.NULL_BATTER_OBJ())
  const maxRotation = Math.max(0, ...recordArr.map(record => record.rotation || 0))
  const atBatLen = Math.max(6, maxRotation)

  useEffect(() => {
    setIsHidden(gameNum === null)
  }, [gameNum])

  return (
    <div className={`RecordUnit`} {...props}>
      <div hidden={isHidden}>
        {/* 1. 타이틀 */}
        <p className={`Title_Unit`}>{`[리그 ${leagueNum || ''}] 게임 ${gameNum || ''} 기록`}</p>

        {/* 2. 테이블: 타순별 투구 기록 */}
        <table className={`Table_Unit`}>
          <thead>
            <tr>
              <th className={`th-order`} rowSpan={2}>
                #
              </th>
              <th className={`th-name`} rowSpan={2}>
                이름
              </th>
              <th className={`th-hand`} rowSpan={2}>
                손
              </th>
              <th className={`th-pressure`} rowSpan={2}>
                위
              </th>
              {Array.from({length: atBatLen}, (_, atBatIdx) => (
                <th key={atBatIdx} className={`th-atBat`} colSpan={2}>
                  {`타석 ${atBatIdx + 1}`}
                </th>
              ))}
            </tr>
            <tr>
              {Array.from({length: atBatLen}, (_, atBatIdx) => (
                <Fragment key={atBatIdx}>
                  <th className={`th-pitch`}>투구</th>
                  <th className={`th-result`}>결</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {lineupArr.map((batter, orderIdx) => {
              const order = ORDER_ARR[orderIdx]
              return (
                <R.RecordRow key={order} atBatArr={getAtBatArr(recordArr, order, atBatLen)} batter={batter} order={order} />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
