import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useBaseStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './UltimateSettingRow.scss'

type UltimateSettingRowProps = DivCommonProps

export const UltimateSettingRow: FC<UltimateSettingRowProps> = ({...props}) => {
  const {lefterTab} = useBaseStates()

  const navigate = useNavigate()

  const onClickRow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    navigate('/main/ultimateSetting')
  }, [navigate])

  return (
    <div className={`UltimateSettingRow ${lefterTab === 'UltimateSetting' && '_selected'}`} onClick={onClickRow} {...props}>
      <p className={`Title_Row`}>Ultimate Setting</p>
    </div>
  )
}
