import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as C from '../../bases'
import * as O from '../../objects'

import './RecordTabPart.scss'

type RecordTabPartProps = DivCommonProps

export const RecordTabPart: FC<RecordTabPartProps> = ({...props}) => {
  const {
    editRecord,
    gameNum,
    isStealFail,
    leagueNum,
    onClickBall,
    onClickLocation,
    onClickRemoveLastPitch,
    pitchArr,
    pitcherArr,
    pitcherName,
    record,
    result,
    selectedBall,
    selectedBatter,
    selectedLocation,
  } = C.useEditRecordModalContext()

  const selectedPitcher = pitcherArr.find(pitcher => pitcher.name === pitcherName) || null
  const pitchTypeArr = selectedPitcher?.pitchTypeArr || []

  return (
    <div className={`RecordTab_Modal`} {...props}>
      {/* 1. 투구 로그 */}
      <O.PitchLogObject
        onClickRemoveLastPitch={onClickRemoveLastPitch(
          pitchArr,
          editRecord,
          gameNum,
          isStealFail,
          leagueNum,
          pitcherName,
          record,
          result,
          selectedBatter
        )}
        pitchArr={pitchArr}
      />

      {/* 2. 존 판 */}
      <O.ZoneGridObject onClickLocation={onClickLocation} selectedLocation={selectedLocation} />

      {/* 3. 구종 판 */}
      <O.PitchTypeGridObject onClickBall={onClickBall} pitchTypeArr={pitchTypeArr} selectedBall={selectedBall} />
    </div>
  )
}
