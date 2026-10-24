import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

type PitchTypeGridObjectProps = DivCommonProps & {
  onClickBall: (ball: CT.Type_Pitch) => (e: React.MouseEvent<HTMLButtonElement>) => void
  selectedBall: CT.Type_Pitch | null
}

export const PitchTypeGridObject: FC<PitchTypeGridObjectProps> = ({onClickBall, selectedBall, ...props}) => {
  return (
    <div className={`PitchType_Grid_Modal`} {...props}>
      {V.PITCH_BTN_ARR.map(item => (
        <button
          className={`PitchType_Modal ${selectedBall === item.ball ? 'selected' : ''}`}
          key={item.ball}
          onClick={onClickBall(item.ball)}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
