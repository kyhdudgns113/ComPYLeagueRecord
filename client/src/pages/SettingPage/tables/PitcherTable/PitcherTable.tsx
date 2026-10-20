import {useLeagueNumSetting, useTeamIdxSetting, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as CT from '@commonType'
import * as R from '../../rows'

import './PitcherTable.scss'

type PitcherTableProps = DivCommonProps & {
  pitcherType: CT.Type_Pitcher
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherType, ...props}) => {
  const leagueNum = useLeagueNumSetting()
  const teamIdx = useTeamIdxSetting()

  const pitcherArr = useTeamPitcherArr(leagueNum ?? -1, teamIdx ?? -1, pitcherType)

  return (
    <div className={`PitcherTable`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Table`}>{`${pitcherType}투수`}</p>

      {/* 2. 투수 목록 */}
      <div className={`PitcherList_Table`}>
        {pitcherArr.map((pitcher, pitcherIdx) => {
          return <R.PitcherRow key={pitcherIdx} pitcher={pitcher} pitcherIdx={pitcherIdx} />
        })}
      </div>

      {/* 3. 추가 버튼 */}
      <B.AddPitcherButton pitcherType={pitcherType} />
    </div>
  )
}
