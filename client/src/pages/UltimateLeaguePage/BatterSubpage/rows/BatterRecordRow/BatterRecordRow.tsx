import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

import * as B from '../../buttons'
import * as C from '../../bases'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 BatterTable.scss 에 있다

type BatterRecordRowProps = TableRowCommonProps & {
  recordIdx: number
}

export const BatterRecordRow: FC<BatterRecordRowProps> = ({recordIdx, ...props}) => {
  const {openEditUltiRecordDescModal} = useModalActions()
  const {batterTable, dragIdx, isEdit, prevTable, recordArr, setDragIdx, setDraftArr, showCompare} = C.useBatterTableContext()

  const record = recordArr[recordIdx]
  const prevRecord = prevTable?.recordArr.find(item => item.name === record.name) || null
  const numericRecord = U.fromUltiBatterDraft(record)
  const displayRecord = showCompare ? U.diffUltiBatterRecord(numericRecord, prevRecord) : U.withUltiBatterCalcRates(numericRecord)
  const tableOId = batterTable.tableOId

  const onChangeCell = useCallback(
    (recordIdx: number, key: keyof OT.UltiBatterRecordType, inputType: 'number' | 'text') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value

      setDraftArr(prevArr => {
        return prevArr.map((item, idx) => {
          if (idx !== recordIdx) {
            return item
          }

          const nextItem = {...item, [key]: nextValue}

          if (inputType === 'text') {
            return nextItem
          }

          const calc = U.withUltiBatterCalcRates(U.fromUltiBatterDraft(nextItem))
          return {
            ...nextItem,
            avg: String(calc.avg),
            slg: String(calc.slg),
          }
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
      {V.ULTI_BATTER_RECORD_CELLS.map(cell => {
        const cellValue = displayRecord[cell.key]
        const rateDiff = showCompare && cell.digits !== undefined && typeof cellValue === 'number' ? cellValue : 0
        const hideZero = showCompare ? true : !isEdit && !(cell.showZeroWhenPlayed && numericRecord.atBat !== 0)

        return (
          <td
            className={`${cell.className} ${cell.isCalc ? '_calc' : ''} ${rateDiff > 0 ? '_diffUp' : ''} ${rateDiff < 0 ? '_diffDown' : ''}`}
            key={cell.key}
            onDoubleClick={!isEdit && cell.key === 'name' ? onDoubleClickName(recordIdx, tableOId) : undefined}
          >
            {isEdit && !cell.isCalc ? (
              <input
                className={`Input_Table`}
                onChange={onChangeCell(recordIdx, cell.key, cell.inputType)}
                type="text"
                value={record[cell.key]}
              />
            ) : (
              U.formatCellValue(cellValue, cell.digits, hideZero)
            )}
          </td>
        )
      })}
      <td
        className={`td-drag`}
        draggable={isEdit}
        onDragEnd={isEdit ? onDragEndRow : undefined}
        onDragStart={isEdit ? onDragStartRow(recordIdx) : undefined}
      >
        {isEdit && <Icon className={`DragIcon_Table`} iconName="drag_indicator" />}
      </td>
      <td className={`td-delete`}>
        <B.DeleteBatterButton recordIdx={recordIdx} />
      </td>
    </tr>
  )
}
