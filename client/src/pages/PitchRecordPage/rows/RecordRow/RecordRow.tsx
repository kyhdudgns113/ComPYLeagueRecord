import {Fragment, useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as OT from '@objectType'
import * as U from '@util'

// 스타일은 상위 컴포넌트인 RecordUnit.scss 에 있다
// import './RecordRow.scss'

type RecordRowProps = TableRowCommonProps & {
  atBatArr: (OT.RecordElementType | null)[]
  batter: OT.BatterType
  order: number
}

export const RecordRow: FC<RecordRowProps> = ({atBatArr, batter, order, ...props}) => {
  const {openModifyBatterModal} = useModalActions()

  const onDoubleClickBatter = useCallback(
    (batter: OT.BatterType) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()

      if (!batter.batterOId) {
        return
      }

      openModifyBatterModal(batter)
    },
    [openModifyBatterModal]
  )

  return (
    <tr className={`RecordRow`} {...props}>
      <td className={`td-order`} onDoubleClick={onDoubleClickBatter(batter)}>
        {order}
      </td>
      <td className={`td-name`} onDoubleClick={onDoubleClickBatter(batter)}>
        {batter.name}
      </td>
      <td className={`td-hand`} onDoubleClick={onDoubleClickBatter(batter)}>
        {batter.batterHand.slice(0, 1)}
      </td>
      <td className={`td-pressure`} onDoubleClick={onDoubleClickBatter(batter)}>
        {batter.hasPressureSkill ? 'O' : ''}
      </td>
      {atBatArr.map((record, atBatIdx) => {
        return (
          <Fragment key={atBatIdx}>
            <td className={`td-pitch`}>{record ? record.pitchArr.map(pitch => U.convertPitchMark(pitch)).join(' ') : ''}</td>
            <td className={`td-result`}>{record?.result?.slice(0, 1) || ''}</td>
          </Fragment>
        )
      })}
    </tr>
  )
}
