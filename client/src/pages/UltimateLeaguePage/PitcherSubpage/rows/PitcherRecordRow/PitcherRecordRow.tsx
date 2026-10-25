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

// 스타일은 상위 컴포넌트인 PitcherTable.scss 에 있다

type PitcherRecordRowProps = TableRowCommonProps & {
  dragIdx: number | null
  isEdit: boolean
  record: OT.UltiPitcherRecordType
  recordArr: OT.UltiPitcherRecordType[]
  recordIdx: number
  setDragIdx: Setter<number | null>
  setDraftArr: Setter<OT.UltiPitcherRecordType[]>
  tableOId: string
}

export const PitcherRecordRow: FC<PitcherRecordRowProps> = ({
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
  const displayRecord = U.withUltiPitcherCalcRates(record)

  const onChangeCell = useCallback(
    (recordIdx: number, key: keyof OT.UltiPitcherRecordType, inputType: 'number' | 'text') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value

      setDraftArr(prevArr => {
        return prevArr.map((item, idx) => {
          if (idx !== recordIdx) {
            return item
          }

          if (inputType === 'text') {
            return U.withUltiPitcherCalcRates({...item, [key]: nextValue})
          }

          if (nextValue === '') {
            return U.withUltiPitcherCalcRates({...item, [key]: 0})
          }

          const nextNum = Number(nextValue)
          return U.withUltiPitcherCalcRates({...item, [key]: isNaN(nextNum) ? 0 : nextNum})
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
      openEditUltiRecordDescModal({kind: 'pitcher', recordIdx, tableOId})
    },
    []
  )

  return (
    <tr
      className={`PitcherRecordRow ${dragIdx === recordIdx ? '_dragging' : ''} rowIdx-${recordIdx} ${recordIdx > 10 && `_etcPitcher`}`}
      onDragOver={isEdit ? onDragOverRow : undefined}
      onDrop={isEdit ? onDropRow(dragIdx, recordIdx) : undefined}
      {...props}
    >
      {V.ULTI_PITCHER_RECORD_CELLS.map(cell => (
        <td
          className={cell.className}
          key={cell.key}
          onDoubleClick={!isEdit && cell.key === 'name' ? onDoubleClickName(recordIdx, tableOId) : undefined}
        >
          {isEdit && !cell.isCalc ? (
            <input
              className={`Input_Table`}
              onChange={onChangeCell(recordIdx, cell.key, cell.inputType)}
              type={cell.inputType}
              value={record[cell.key]}
            />
          ) : (
            U.formatCellValue(displayRecord[cell.key], cell.digits, !isEdit && !(cell.showZeroWhenPlayed && record.playNum !== 0))
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
        <B.DeletePitcherButton
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
