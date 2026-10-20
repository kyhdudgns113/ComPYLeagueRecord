import {Fragment} from 'react'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as U from '@util'

// 스타일은 상위 컴포넌트인 RecordUnit.scss 에 있다
// import './RecordRow.scss'

type RecordRowProps = TableRowCommonProps & {
  atBatArr: (OT.RecordElementType | null)[]
  batterHand: CT.Type_BatterHand
  batterName: string
  hasPressure: boolean
  order: number
}

export const RecordRow: FC<RecordRowProps> = ({atBatArr, batterHand, batterName, hasPressure, order, ...props}) => {
  return (
    <tr className={`RecordRow`} {...props}>
      <td className={`td-order`}>{order}</td>
      <td className={`td-name`}>{batterName}</td>
      <td className={`td-hand`}>{batterHand.slice(0, 1)}</td>
      <td className={`td-pressure`}>{hasPressure ? 'O' : ''}</td>
      {atBatArr.map((record, atBatIdx) => {
        return (
          <Fragment key={atBatIdx}>
            <td className={`td-pitch`}>{record ? record.pitch.map(pitch => U.convertPitchMark(pitch)).join(' ') : ''}</td>
            <td className={`td-result`}>{record?.result?.slice(0, 1) || ''}</td>
          </Fragment>
        )
      })}
    </tr>
  )
}
