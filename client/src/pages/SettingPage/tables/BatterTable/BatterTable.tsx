import {useCallback} from 'react'

import {useSettingCallbacksContext} from '@context'
import {useBatterActions, useLeagueNumSetting, useMovedBatter, useSettingActions, useTeamBatterArr, useTeamIdxSetting} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as CT from '@commonType'
import * as OT from '@objectType'
import * as R from '../../rows'
import * as V from '@value'

import './BatterTable.scss'

type BatterTableProps = DivCommonProps & {
  batterType: CT.Type_BatterClass
}

export const BatterTable: FC<BatterTableProps> = ({batterType, ...props}) => {
  const {setTeamMainBatterArr, setTeamSubBatterArr} = useBatterActions()
  const {clearMovedBatter} = useSettingActions()
  const {moveBatterInArr} = useSettingCallbacksContext()

  const leagueNum = useLeagueNumSetting()
  const movedBatter = useMovedBatter()
  const teamIdx = useTeamIdxSetting()

  const batterArr = useTeamBatterArr(leagueNum ?? -1, teamIdx ?? -1, batterType)

  const onDropList = useCallback(
    (moveBatter: OT.BatterType | null, batterArrLen: number, batterType: CT.Type_BatterClass, teamIdx: number | null) =>
      (e: React.DragEvent<HTMLDivElement>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!moveBatter) {
          return
        }

        if (teamIdx === null) {
          return
        }

        const leagueNum = moveBatter.leagueNum
        const teamName = V.TEAM_NAME[teamIdx]

        moveBatterInArr(moveBatter, batterArrLen, batterType, teamName).then(res => {
          const {isSuccess} = res
          if (isSuccess) {
            const {MainBatterArr, SubBatterArr} = res
            setTeamMainBatterArr(leagueNum, teamIdx, MainBatterArr)
            setTeamSubBatterArr(leagueNum, teamIdx, SubBatterArr)
            clearMovedBatter()
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
    <div className={`BatterTable`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Table`}>{`${batterType}타자`}</p>

      {/* 2. 타자 목록 */}
      <div className={`BatterList_Table`} onDragOver={e => e.preventDefault()} onDrop={onDropList(movedBatter, batterArr.length, batterType, teamIdx)}>
        {batterArr.map((batter, batterIdx) => {
          return <R.BatterRow key={batterIdx} batter={batter} batterIdx={batterIdx} />
        })}
      </div>

      {/* 3. 추가 버튼 */}
      <B.AddBatterButton batterType={batterType} />
    </div>
  )
}
