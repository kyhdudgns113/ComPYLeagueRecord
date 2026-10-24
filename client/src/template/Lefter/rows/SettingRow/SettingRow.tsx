import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useBaseStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './SettingRow.scss'

type SettingRowProps = DivCommonProps

export const SettingRow: FC<SettingRowProps> = ({...props}) => {
  const {lefterTab} = useBaseStates()

  const navigate = useNavigate()

  const onClickRow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    navigate('/main/setting')
  }, [])

  return (
    <div className={`SettingRow ${lefterTab === 'Setting' && '_selected'}`} onClick={onClickRow} {...props}>
      <p className={`Title_Row`}>Setting</p>
    </div>
  )
}
