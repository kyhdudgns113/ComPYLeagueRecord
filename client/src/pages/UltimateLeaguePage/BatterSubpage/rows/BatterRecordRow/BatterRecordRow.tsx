import {useCallback} from 'react'

import {Icon} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {Setter, UltiBatterDraftType} from '@localType'
import type {TableRowCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 BatterTable.scss 에 있다

type BatterRecordRowProps = TableRowCommonProps & {
  dragIdx: number | null
  isEdit: boolean
  record: OT.UltiBatterRecordType | UltiBatterDraftType
  recordArr: (OT.UltiBatterRecordType | UltiBatterDraftType)[]
  recordIdx: number
  setDragIdx: Setter<number | null>
  setDraftArr: Setter<UltiBatterDraftType[]>
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
  const numericRecord = U.fromUltiBatterDraft(record)
  const displayRecord = U.withUltiBatterCalcRates(numericRecord)

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
      {V.ULTI_BATTER_RECORD_CELLS.map(cell => (
        <td
          className={`${cell.className} ${cell.isCalc ? '_calc' : ''}`}
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
            U.formatCellValue(displayRecord[cell.key], cell.digits, !isEdit && !(cell.showZeroWhenPlayed && numericRecord.playNum !== 0))
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
