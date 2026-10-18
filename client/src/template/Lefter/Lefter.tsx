import * as R from './rows'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './Lefter.scss'

type LefterProps = DivCommonProps

export const Lefter: FC<LefterProps> = ({...props}) => {
  return (
    <div className={`Lefter`} {...props}>
      <R.SettingRow />
      <R.PitchRecordRow />
    </div>
  )
}
