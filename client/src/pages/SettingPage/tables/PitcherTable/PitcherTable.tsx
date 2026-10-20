import {useCallback} from 'react'

import {useSettingCallbacksContext} from '@context'
import {useLeagueNumSetting, useMovedPitcher, usePitcherActions, useSettingActions, useTeamIdxSetting, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as CT from '@commonType'
import * as OT from '@objectType'
import * as R from '../../rows'
import * as V from '@value'

import './PitcherTable.scss'

type PitcherTableProps = DivCommonProps & {
  pitcherType: CT.Type_Pitcher
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherType, ...props}) => {
  const {setTeamCPArr, setTeamRPArr, setTeamSPArr} = usePitcherActions()
  const {clearMovedPitcher} = useSettingActions()
  const {movePitcherInArr} = useSettingCallbacksContext()

  const leagueNum = useLeagueNumSetting()
  const movedPitcher = useMovedPitcher()
  const teamIdx = useTeamIdxSetting()

  const pitcherArr = useTeamPitcherArr(leagueNum ?? -1, teamIdx ?? -1, pitcherType)

  const onDropList = useCallback(
    (movePitcher: OT.PitcherType | null, pitcherArrLen: number, pitcherType: CT.Type_Pitcher, teamIdx: number | null) =>
      (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!movePitcher) {
          return
        }

        if (teamIdx === null) {
          return
        }

        const leagueNum = movePitcher.leagueNum
        const teamName = V.TEAM_NAME[teamIdx]

        movePitcherInArr(movePitcher, pitcherArrLen, pitcherType, teamName).then(res => {
          const {isSuccess} = res
          if (isSuccess) {
            const {CPArr, RPArr, SPArr} = res
            setTeamCPArr(leagueNum, teamIdx, CPArr)
            setTeamRPArr(leagueNum, teamIdx, RPArr)
            setTeamSPArr(leagueNum, teamIdx, SPArr)
            clearMovedPitcher()
          } // ::
          else {
            if (res.errMsg) {
              alert(res.errMsg)
            }
          }
        })
      },
    []
  )

  return (
    <div className={`PitcherTable`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Table`}>{`${pitcherType}투수`}</p>

      {/* 2. 투수 목록 */}
      <div
        className={`PitcherList_Table`}
        onDragOver={e => e.preventDefault()}
        onDrop={onDropList(movedPitcher, pitcherArr.length, pitcherType, teamIdx)}
      >
        {pitcherArr.map((pitcher, pitcherIdx) => {
          return <R.PitcherRow key={pitcherIdx} pitcher={pitcher} pitcherIdx={pitcherIdx} />
        })}
      </div>

      {/* 3. 추가 버튼 */}
      <B.AddPitcherButton pitcherType={pitcherType} />
    </div>
  )
}
