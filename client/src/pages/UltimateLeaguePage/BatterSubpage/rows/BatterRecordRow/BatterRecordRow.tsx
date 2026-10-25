import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {TableRowCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 BatterTable.scss 에 있다

type BatterRecordRowProps = TableRowCommonProps & {
  dragIdx: number | null
  isEdit: boolean
  record: OT.UltiBatterRecordType
  recordArr: OT.UltiBatterRecordType[]
  recordIdx: number
  setDragIdx: Setter<number | null>
  setDraftArr: Setter<OT.UltiBatterRecordType[]>
  tableOId: string
}

export const BatterRecordRow: FC<BatterRecordRowProps> = ({
  dragIdx,
  isEdit,
  record,
  recordArr,
  recordIdx,
  setDragIdx,
  setDraftArr,
  tableOId,
  ...props
}) => {
  const {openEditUltiRecordDescModal} = useModalActions()

  const onChangeCell = useCallback(
    (recordIdx: number, key: keyof OT.UltiBatterRecordType, inputType: 'number' | 'text') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value

      setDraftArr(prevArr => {
        return prevArr.map((item, idx) => {
          if (idx !== recordIdx) {
            return item
          }

          if (inputType === 'text') {
            return {...item, [key]: nextValue}
          }

          if (nextValue === '') {
            return {...item, [key]: 0}
          }

          const nextNum = Number(nextValue)
          return {...item, [key]: isNaN(nextNum) ? 0 : nextNum}
        })
      })
    },
    []
  )

  const onDragStartRow = useCallback(
    (recordIdx: number) => (e: React.DragEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      setDragIdx(recordIdx)
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('text/plain', `${recordIdx}`)
    },
    []
  )

  const onDragOverRow = useCallback((e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const onDropRow = useCallback(
    (dragIdx: number | null, recordIdx: number) => (e: React.DragEvent<HTMLTableRowElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (dragIdx === null || dragIdx === recordIdx) {
        setDragIdx(null)
        return
      }

      setDraftArr(prevArr => {
        const nextArr = [...prevArr]
        const [movedRecord] = nextArr.splice(dragIdx, 1)
        nextArr.splice(recordIdx, 0, movedRecord)
        return nextArr
      })
      setDragIdx(null)
    },
    []
  )

  const onDragEndRow = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
    e.stopPropagation()
    setDragIdx(null)
  }, [])

  const onDoubleClickName = useCallback(
    (recordIdx: number, tableOId: string) => (e: React.MouseEvent<HTMLTableCellElement>) => {
      e.stopPropagation()
      openEditUltiRecordDescModal({kind: 'batter', recordIdx, tableOId})
    },
    []
  )

  return (
    <tr
      className={`BatterRecordRow ${dragIdx === recordIdx ? '_dragging' : ''} rowIdx-${recordIdx} ${recordIdx > 8 ? '_etcBatter' : ''}`}
      onDragOver={isEdit ? onDragOverRow : undefined}
      onDrop={isEdit ? onDropRow(dragIdx, recordIdx) : undefined}
      {...props}
    >
      {V.ULTI_BATTER_RECORD_CELLS.map(cell => (
        <td
          className={cell.className}
          key={cell.key}
          onDoubleClick={!isEdit && cell.key === 'name' ? onDoubleClickName(recordIdx, tableOId) : undefined}
        >
          {isEdit ? (
            <input
              className={`Input_Table`}
              onChange={onChangeCell(recordIdx, cell.key, cell.inputType)}
              type={cell.inputType}
              value={record[cell.key]}
            />
          ) : (
            U.formatCellValue(record[cell.key], cell.digits, !(cell.showZeroWhenPlayed && record.playNum !== 0))
          )}
        </td>
      ))}
      <td
        className={`td-drag`}
        draggable={isEdit}
        onDragEnd={isEdit ? onDragEndRow : undefined}
        onDragStart={isEdit ? onDragStartRow(recordIdx) : undefined}
      >
        {isEdit && <Icon className={`DragIcon_Table`} iconName="drag_indicator" />}
      </td>
      <td className={`td-delete`}>
        <B.DeleteBatterButton
          name={record.name}
          recordArr={recordArr}
          recordIdx={recordIdx}
          setDraftArr={setDraftArr}
          tableOId={tableOId}
        />
      </td>
    </tr>
  )
}
