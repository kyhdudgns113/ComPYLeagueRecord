import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'

import './PitcherRow.scss'

type PitcherRowProps = DivCommonProps & {
  pitcher: OT.PitcherType
  pitcherIdx: number
}

export const PitcherRow: FC<PitcherRowProps> = ({pitcher, pitcherIdx, ...props}) => {
  return (
    <div className={`PitcherRow`} data-pitcher-idx={pitcherIdx} {...props}>
      <p className={`Name_Row`}>{pitcher.name}</p>
    </div>
  )
}
