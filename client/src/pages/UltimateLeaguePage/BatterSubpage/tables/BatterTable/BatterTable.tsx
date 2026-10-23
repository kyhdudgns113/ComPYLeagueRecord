import {useCallback, useState} from 'react'

import {Icon} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'

import './BatterTable.scss'

const RECORD_CELLS: {className: string; digits?: number; key: keyof OT.UltiBatterRecordType; inputType: 'number' | 'text'}[] = [
  {className: 'td-gameNum', key: 'name', inputType: 'text'},
  {className: 'td-playNum', key: 'playNum', inputType: 'number'},
  {className: 'td-atBat', key: 'atBat', inputType: 'number'},
  {className: 'td-avg', digits: 3, key: 'avg', inputType: 'number'},
  {className: 'td-hit1', key: 'hit1', inputType: 'number'},
  {className: 'td-hit2', key: 'hit2', inputType: 'number'},
  {className: 'td-hit3', key: 'hit3', inputType: 'number'},
  {className: 'td-hit4', key: 'hit4', inputType: 'number'},
  {className: 'td-steal', key: 'steal', inputType: 'number'},
  {className: 'td-slg', digits: 3, key: 'slg', inputType: 'number'},
  {className: 'td-ops', digits: 3, key: 'ops', inputType: 'number'},
]

const roundTo = (value: number, digits: number) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

const withFixedRates = (record: OT.UltiBatterRecordType): OT.UltiBatterRecordType => {
  return {
    ...record,
    avg: roundTo(Number(record.avg) || 0, 3),
    ops: roundTo(Number(record.ops) || 0, 3),
    slg: roundTo(Number(record.slg) || 0, 3),
  }
}

const formatCellValue = (value: string | number, digits?: number, hideZero?: boolean) => {
  if (hideZero && typeof value === 'number' && value === 0) {
    return ''
  }

  if (digits === undefined || typeof value !== 'number') {
    return value
  }

  return value.toFixed(digits)
}

type BatterTableProps = DivCommonProps & {
  batterTable: OT.UltiBatterTableType
}

export const BatterTable: FC<BatterTableProps> = ({batterTable, ...props}) => {
  const {setBatterTableArr} = useUltimateActions()
  const {updateBatterTable} = useUltimateCallbacksContext()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<OT.UltiBatterRecordType[]>(batterTable.recordArr)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : batterTable.recordArr

  const onChangeCell = useCallback((recordIdx: number, key: keyof OT.UltiBatterRecordType, inputType: 'number' | 'text') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value

      setDraftArr(prevArr => {
        return prevArr.map((record, idx) => {
          if (idx !== recordIdx) {
            return record
          }

          if (inputType === 'text') {
            return {...record, [key]: nextValue}
          }

          if (nextValue === '') {
            return {...record, [key]: 0}
          }

          const nextNum = Number(nextValue)
          return {...record, [key]: isNaN(nextNum) ? 0 : nextNum}
        })
      })
    }
  }, [])

  const onClickModify = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!isEdit) {
        setDraftArr(batterTable.recordArr.map(record => ({...record})))
        setIsEdit(true)
        return
      }

      const nextArr = draftArr.map(record => withFixedRates(record))

      updateBatterTable(nextArr, batterTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {batterTableArr} = res
          setBatterTableArr(batterTableArr)
          setIsEdit(false)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[BatterTable] ${res.errMsg}`)
          }
        }
      })
    },
    [batterTable.recordArr, batterTable.tableOId, draftArr, isEdit, setBatterTableArr, updateBatterTable]
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
    (targetIdx: number) => (e: React.DragEvent<HTMLTableRowElement>) => {
      e.preventDefault()
      e.stopPropagation()

      if (dragIdx === null || dragIdx === targetIdx) {
        setDragIdx(null)
        return
      }

      setDraftArr(prevArr => {
        const nextArr = [...prevArr]
        const [movedRecord] = nextArr.splice(dragIdx, 1)
        nextArr.splice(targetIdx, 0, movedRecord)
        return nextArr
      })
      setDragIdx(null)
    },
    [dragIdx]
  )

  const onDragEndRow = useCallback((e: React.DragEvent<HTMLTableCellElement>) => {
    e.stopPropagation()
    setDragIdx(null)
  }, [])

  const onClickDelete = useCallback(
    (recordIdx: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      const nextArr = recordArr.filter((_, idx) => idx !== recordIdx)

      updateBatterTable(nextArr, batterTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {batterTableArr} = res
          setBatterTableArr(batterTableArr)
          setDraftArr(nextArr)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[BatterTable] ${res.errMsg}`)
          }
        }
      })
    },
    [batterTable.tableOId, recordArr, setBatterTableArr, updateBatterTable]
  )

  return (
    <div className={`BatterTable ${isEdit ? '_editing' : ''}`} {...props}>
      {/* 1. 테이블 */}
      <table>
        <thead>
          <tr>
            <th className={`th-gameNum`}>{batterTable.gameNum}</th>
            <th className={`th-playNum`} rowSpan={2}>
              출전
            </th>
            <th className={`th-atBat`} rowSpan={2}>
              타수
            </th>
            <th className={`th-avg`} rowSpan={2}>
              타율
            </th>
            <th className={`th-hit1`} rowSpan={2}>
              1루타
            </th>
            <th className={`th-hit2`} rowSpan={2}>
              2루타
            </th>
            <th className={`th-hit3`} rowSpan={2}>
              3루타
            </th>
            <th className={`th-hit4`} rowSpan={2}>
              홈런
            </th>
            <th className={`th-steal`} rowSpan={2}>
              도루
            </th>
            <th className={`th-slg`} rowSpan={2}>
              장타
            </th>
            <th className={`th-ops`} rowSpan={2}>
              OPS
            </th>
            <th className={`th-drag`} rowSpan={2} />
            <th className={`th-delete`} rowSpan={2} />
          </tr>
          <tr>
            <th className={`th-createdAt`}>{new Date(batterTable.createdAtNum).toLocaleDateString()}</th>
          </tr>
        </thead>
        <tbody>
          {recordArr.map((record, recordIdx) => (
            <tr
              className={`${dragIdx === recordIdx ? '_dragging' : ''} rowIdx-${recordIdx} ${recordIdx > 8 ? '_etcBatter' : ''}`}
              key={recordIdx}
              onDragOver={isEdit ? onDragOverRow : undefined}
              onDrop={isEdit ? onDropRow(recordIdx) : undefined}
            >
              {RECORD_CELLS.map(cell => (
                <td className={cell.className} key={cell.key}>
                  {isEdit ? (
                    <input
                      className={`Input_Table`}
                      onChange={onChangeCell(recordIdx, cell.key, cell.inputType)}
                      type={cell.inputType}
                      value={record[cell.key]}
                    />
                  ) : (
                    formatCellValue(record[cell.key], cell.digits, true)
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
                <B.DeleteBatterButton name={record.name} onClick={onClickDelete(recordIdx)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. 버튼 행 */}
      <div className={`ButtonRow_Table`}>
        <B.AddBatterButton tableOId={batterTable.tableOId} />
        <B.ModifyButton isEdit={isEdit} onClick={onClickModify} />
        <B.DeleteTableButton gameNum={batterTable.gameNum} tableOId={batterTable.tableOId} />
      </div>
    </div>
  )
}
