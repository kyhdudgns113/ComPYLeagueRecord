import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

import './PitchLogObject.scss'

type PitchLogObjectProps = DivCommonProps & {
  onClickRemoveLastPitch: (e: React.MouseEvent<HTMLButtonElement>) => void
  pitchArr: OT.PitchType[]
}

export const PitchLogObject: FC<PitchLogObjectProps> = ({onClickRemoveLastPitch, pitchArr, ...props}) => {
  return (
    <div className={`PitchLog_Row_Modal`} {...props}>
      <p className={`PitchLog_Modal`}>{pitchArr.map(pitch => U.convertPitchLog(pitch)).join(', ') || ' '}</p>
      <button className={`RemoveLast_Modal`} disabled={pitchArr.length === 0} onClick={onClickRemoveLastPitch} type="button">
        삭제
      </button>
    </div>
  )
}
