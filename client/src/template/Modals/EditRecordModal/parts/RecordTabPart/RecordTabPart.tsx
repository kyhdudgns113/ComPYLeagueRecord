import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as O from '../../objects'
import * as OT from '@objectType'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

type RecordTabPartProps = DivCommonProps & {
  onClickAddPitch: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickBall: (ball: CT.Type_Pitch) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickClose: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickLocation: (location: CT.Type_Location) => (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickRemoveLastPitch: (e: React.MouseEvent<HTMLButtonElement>) => void
  pitchArr: OT.PitchType[]
  selectedBall: CT.Type_Pitch | null
  selectedLocation: CT.Type_Location | null
}

export const RecordTabPart: FC<RecordTabPartProps> = ({
  onClickAddPitch,
  onClickBall,
  onClickClose,
  onClickLocation,
  onClickRemoveLastPitch,
  pitchArr,
  selectedBall,
  selectedLocation,
  ...props
}) => {
  return (
    <div className={`RecordTab_Modal`} {...props}>
      {/* 2. 투구 로그 */}
      <O.PitchLogObject onClickRemoveLastPitch={onClickRemoveLastPitch} pitchArr={pitchArr} />

      {/* 3. 존 판 */}
      <O.ZoneGridObject onClickLocation={onClickLocation} selectedLocation={selectedLocation} />

      {/* 4. 구종 판 */}
      <O.PitchTypeGridObject onClickBall={onClickBall} selectedBall={selectedBall} />

      {/* 5. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickAddPitch} type="button">
          추가
        </button>
        <button className={`Button_Modal`} onClick={onClickClose} type="button">
          닫기
        </button>
      </div>
    </div>
  )
}
