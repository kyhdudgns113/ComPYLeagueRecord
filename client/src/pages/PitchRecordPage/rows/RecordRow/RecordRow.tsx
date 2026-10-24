import {Fragment, useCallback} from 'react'

import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as LT from '@localType'
import * as OT from '@objectType'
import * as U from '@util'

// 스타일은 상위 컴포넌트인 RecordUnit.scss 에 있다
// import './RecordRow.scss'

type RecordRowProps = TableRowCommonProps & {
  atBatArr: (OT.RecordElementType | null)[]
  batter: OT.BatterType
  inningEndKeySet: Set<string>
  order: number
}

export const RecordRow: FC<RecordRowProps> = ({atBatArr, batter, inningEndKeySet, order, ...props}) => {
  const {openEditRecordModal, openModifyBatterModal} = useModalActions()

  const onDoubleClickBatter = useCallback(
    (batter: OT.BatterType) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()

      if (!batter.batterOId) {
        return
      }

      openModifyBatterModal(batter)
    },
    []
  )

  const onClickRecord = useCallback(
    (batter: OT.BatterType, order: number, record: OT.RecordElementType | null, rotation: number) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      const arg: LT.EditRecordPayload = {batter, order, record, rotation}
      openEditRecordModal(arg)
    },
    []
  )

  return (
    <tr className={`RecordRow order-${order}`} {...props}>
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
            <td
              className={`td-pitch ${inningEndKeySet.has(`${order}-${atBatIdx + 1}`) ? '_inningEnd' : ''}`}
              onClick={onClickRecord(batter, order, record, atBatIdx + 1)}
            >
              {record ? record.pitchArr.map(pitch => U.convertPitchMark(pitch)).join(' ') : ''}
            </td>
            <td
              className={`td-result ${inningEndKeySet.has(`${order}-${atBatIdx + 1}`) ? '_inningEnd' : ''}`}
              onClick={onClickRecord(batter, order, record, atBatIdx + 1)}
            >
              {[record?.result?.slice(0, 1) || '', record?.isStealFail ? '도' : ''].filter(Boolean).join('')}
            </td>
          </Fragment>
        )
      })}
    </tr>
  )
}
