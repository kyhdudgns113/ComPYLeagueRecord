import {useCallback} from 'react'

import {useSettingCallbacksContext} from '@context'
import {useModalActions, useMovedPitcher, usePitcherActions, useSettingActions} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'
import * as V from '@value'

import './PitcherRow.scss'

type PitcherRowProps = DivCommonProps & {
  pitcher: OT.PitcherType
  pitcherIdx: number
}

export const PitcherRow: FC<PitcherRowProps> = ({pitcher, pitcherIdx, ...props}) => {
  const {openModifyPitcherModal} = useModalActions()
  const {setTeamCPArr, setTeamRPArr, setTeamSPArr} = usePitcherActions()
  const {clearMovedPitcher, setMovedPitcher} = useSettingActions()
  const {movePitcherInArr} = useSettingCallbacksContext()

  const movedPitcher = useMovedPitcher()

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }, [])

  const onDoubleClick = useCallback(
    (pitcher: OT.PitcherType) => (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      openModifyPitcherModal(pitcher)
    },
    []
  )

  const onDragStart = useCallback(
    (pitcher: OT.PitcherType) => (e: React.DragEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setMovedPitcher(pitcher)
    },
    []
  )

  const onDrop = useCallback(
    (movePitcher: OT.PitcherType | null, pitcher: OT.PitcherType, pitcherIdx: number) => (e: React.DragEvent<HTMLDivElement>) => {
      /**
       * movePitcher: 이동할 투수
       * pitcher: 현재 요소의 투수, movePitcher랑 같을수도, 다를수도 있음
       * pitcherIdx: 현재 요소의 인덱스
       */
      e.stopPropagation()

      if (!movePitcher) {
        return
      }

      const leagueNum = movePitcher.leagueNum
      const teamIdx = V.TEAM_IDX_MAP[pitcher.teamName]

      movePitcherInArr(movePitcher, pitcherIdx, pitcher.pitcherType, pitcher.teamName).then(res => {
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
    <div
      className={`PitcherRow`}
      draggable
      onDoubleClick={onDoubleClick(pitcher)}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={e => e.preventDefault()}
      onDragStart={onDragStart(pitcher)}
      onDrop={onDrop(movedPitcher!, pitcher, pitcherIdx)}
      {...props}
    >
      <p className={`Name_Row`}>{pitcher.name}</p>
    </div>
  )
}
