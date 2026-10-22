import {useCallback, useState} from 'react'

import {BatterSubpage} from './BatterSubpage'
import {PitcherSubpage} from './PitcherSubpage'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as U from './units'

import './UltimateLeaguePage.scss'

type SubPageType = 'batter' | 'pitcher'

type UltimateLeaguePageProps = DivCommonProps

export const UltimateLeaguePage: FC<UltimateLeaguePageProps> = ({...props}) => {
  const [subPage, setSubPage] = useState<SubPageType>('pitcher')

  const onClickTab = useCallback(
    (nextSubPage: SubPageType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setSubPage(nextSubPage)
    },
    []
  )

  return (
    <div className={`UltimateLeaguePage`} {...props}>
      {/* 1. 얼티밋 리그 정보 배열 */}
      <div className={`LeagueList_Page`}>
        <U.LeagueUnit />
      </div>

      <div className={`LeagueTables_Page`}>
        <div className={`Tab_Row_Page`}>
          <button className={`Tab_Page ${subPage === 'pitcher' ? '_selected' : ''}`} onClick={onClickTab('pitcher')} type="button">
            투수
          </button>
          <button className={`Tab_Page ${subPage === 'batter' ? '_selected' : ''}`} onClick={onClickTab('batter')} type="button">
            타자
          </button>
        </div>

        <div className={`SubPageArea_Page`}>
          {subPage === 'pitcher' && <PitcherSubpage />}
          {subPage === 'batter' && <BatterSubpage />}
        </div>
      </div>
    </div>
  )
}
