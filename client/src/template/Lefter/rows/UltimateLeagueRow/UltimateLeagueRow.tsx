import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useBaseStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './UltimateLeagueRow.scss'

type UltimateLeagueRowProps = DivCommonProps

export const UltimateLeagueRow: FC<UltimateLeagueRowProps> = ({...props}) => {
  const {lefterTab} = useBaseStates()

  const navigate = useNavigate()

  const onClickRow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    navigate('/main/ultimateLeague')
  }, [navigate])

  return (
    <div className={`UltimateLeagueRow ${lefterTab === 'UltimateLeague' && '_selected'}`} onClick={onClickRow} {...props}>
      <p className={`Title_Row`}>Ultimate League</p>
    </div>
  )
}
