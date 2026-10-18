import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PitchRecordPage.scss'

type PitchRecordPageProps = DivCommonProps

export const PitchRecordPage: FC<PitchRecordPageProps> = ({...props}) => {
  return (
    <div className={`PitchRecordPage`} {...props}>
      PitchRecordPage.tsx
    </div>
  )
}
