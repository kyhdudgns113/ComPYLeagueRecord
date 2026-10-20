import {useCallback} from 'react'

import {useSettingCallbacksContext} from '@context'
import {useBatterActions, useMovedBatter, useSettingActions} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'
import * as V from '@value'

import './BatterRow.scss'

type BatterRowProps = DivCommonProps & {
  batter: OT.BatterType
  batterIdx: number
}

export const BatterRow: FC<BatterRowProps> = ({batter, batterIdx, ...props}) => {
  const {setTeamMainBatterArr, setTeamSubBatterArr} = useBatterActions()
  const {clearMovedBatter, setMovedBatter} = useSettingActions()
  const {moveBatterInArr} = useSettingCallbacksContext()

  const movedBatter = useMovedBatter()

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  const onDragStart = useCallback(
    (batter: OT.BatterType) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setMovedBatter(batter)
    },
    []
  )

  const onDrop = useCallback(
    (moveBatter: OT.BatterType | null, batter: OT.BatterType, batterIdx: number) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation()

      if (!moveBatter) {
        return
      }

      const leagueNum = moveBatter.leagueNum
      const teamIdx = V.TEAM_IDX_MAP[batter.teamName]

      moveBatterInArr(moveBatter, batterIdx, batter.batterClass, batter.teamName).then(res => {
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
    <div
      className={`BatterRow`}
      draggable
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={e => e.preventDefault()}
      onDragStart={onDragStart(batter)}
      onDrop={onDrop(movedBatter, batter, batterIdx)}
      {...props}
    >
      <p className={`Name_Row`}>{batter.name}</p>
    </div>
  )
}
