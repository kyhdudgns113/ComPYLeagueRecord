import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as C from '../../bases'
import * as U from '@util'

import './PrevPitchResultPart.scss'

type PrevPitchResultPartProps = DivCommonProps

export const PrevPitchResultPart: FC<PrevPitchResultPartProps> = ({...props}) => {
  const {prevRecordArr} = C.useEditRecordModalContext()

  return (
    <div className={`PrevPitchResult_Modal`} {...props}>
      {/* 1. 타이틀 */}
      <p className={`PrevTitle_Modal`}>이전 투구 결과</p>

      {/* 2. 목록 */}
      <div className={`PrevList_Modal`}>
        {prevRecordArr.length === 0 ? (
          <p className={`Empty_Modal`}>없음</p>
        ) : (
          prevRecordArr.map(record => (
            <div className={`PrevPitchResult_Row_Modal`} key={`${record.order}-${record.rotation}`}>
              <p className={`Name_Modal`}>{`${record.pitcherName}`}</p>
              <p className={`PitchLog_Modal`}>{record.pitchArr.map(pitch => U.convertPitchLog(pitch)).join(', ') || ' '}</p>
              <p className={`Result_Modal`}>{[record.result || '', record.isStealFail ? '도' : ''].filter(Boolean).join(' ') || ' '}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
