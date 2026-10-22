import {useCallback, useState} from 'react'

import {Icon} from '@component'
import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'

import './PitcherTable.scss'

const RECORD_CELLS: {className: string; digits?: number; isCalc?: boolean; key: keyof OT.UltiPitcherRecordType; inputType: 'number' | 'text'}[] = [
  {className: 'td-gameNum', key: 'name', inputType: 'text'},
  {className: 'td-playNum', key: 'playNum', inputType: 'number'},
  {className: 'td-innings', key: 'inning', inputType: 'number'},
  {className: 'td-era', digits: 2, key: 'era', inputType: 'number'},
  {className: 'td-win', key: 'win', inputType: 'number'},
  {className: 'td-loss', key: 'lose', inputType: 'number'},
  {className: 'td-save', key: 'save', inputType: 'number'},
  {className: 'td-hold', key: 'hold', inputType: 'number'},
  {className: 'td-blown', key: 'blown', inputType: 'number'},
  {className: 'td-complete', key: 'wanBong', inputType: 'number'},
  {className: 'td-perfect', key: 'wanTo', inputType: 'number'},
  {className: 'td-strikeout', key: 'strikeOut', inputType: 'number'},
  {className: 'td-whip', digits: 3, key: 'whip', inputType: 'number'},
  {className: 'td-homeRun', key: 'homeRun', inputType: 'number'},
  {className: 'td-earnedRun', key: 'ownLoseScore', inputType: 'number'},
  {className: 'td-k9', digits: 3, isCalc: true, key: 'kPer9', inputType: 'number'},
  {className: 'td-hr9', digits: 3, isCalc: true, key: 'homeRunPer9', inputType: 'number'},
]

const roundTo = (value: number, digits: number) => {
  const factor = 10 ** digits
  return Math.round(value * factor) / factor
}

const calcPer9 = (count: number, inning: number) => {
  if (inning <= 0) {
    return 0
  }

  return roundTo((count * 9) / inning, 3)
}

const withCalcRates = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...record,
    homeRunPer9: calcPer9(record.homeRun, record.inning),
    kPer9: calcPer9(record.strikeOut, record.inning),
  }
}

const withFixedStats = (record: OT.UltiPitcherRecordType): OT.UltiPitcherRecordType => {
  return {
    ...withCalcRates(record),
    era: roundTo(Number(record.era) || 0, 2),
    whip: roundTo(Number(record.whip) || 0, 3),
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

type PitcherTableProps = DivCommonProps & {
  pitcherTable: OT.UltiPitcherTableType
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherTable, ...props}) => {
  const {setPitcherTableArr} = useUltimateActions()
  const {updatePitcherTable} = useUltimateCallbacksContext()

  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<OT.UltiPitcherRecordType[]>(pitcherTable.recordArr)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : pitcherTable.recordArr

  const onChangeCell = useCallback((recordIdx: number, key: keyof OT.UltiPitcherRecordType, inputType: 'number' | 'text') => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.target.value

      setDraftArr(prevArr => {
        return prevArr.map((record, idx) => {
          if (idx !== recordIdx) {
            return record
          }

          if (inputType === 'text') {
            return withCalcRates({...record, [key]: nextValue})
          }

          if (nextValue === '') {
            return withCalcRates({...record, [key]: 0})
          }

          const nextNum = Number(nextValue)
          return withCalcRates({...record, [key]: isNaN(nextNum) ? 0 : nextNum})
        })
      })
    }
  }, [])

  const onClickModify = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!isEdit) {
        setDraftArr(pitcherTable.recordArr.map(record => withCalcRates({...record})))
        setIsEdit(true)
        return
      }

      const nextArr = draftArr.map(record => withFixedStats(record))

      updatePitcherTable(nextArr, pitcherTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {pitcherTableArr} = res
          setPitcherTableArr(pitcherTableArr)
          setIsEdit(false)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[PitcherTable] ${res.errMsg}`)
          }
        }
      })
    },
    [draftArr, isEdit, pitcherTable.recordArr, pitcherTable.tableOId, setPitcherTableArr, updatePitcherTable]
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

      updatePitcherTable(nextArr, pitcherTable.tableOId).then(res => {
        if (res.isSuccess) {
          const {pitcherTableArr} = res
          setPitcherTableArr(pitcherTableArr)
          setDraftArr(nextArr)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[PitcherTable] ${res.errMsg}`)
          }
        }
      })
    },
    [pitcherTable.tableOId, recordArr, setPitcherTableArr, updatePitcherTable]
  )

  return (
    <div className={`PitcherTable ${isEdit ? '_editing' : ''}`} {...props}>
      {/* 1. 테이블 */}
      <table>
        <thead>
          <tr>
            <th className={`th-gameNum`}>{pitcherTable.gameNum}</th>
            <th className={`th-playNum`}>출전</th>
            <th className={`th-innings`}>이닝</th>
            <th className={`th-era`}>ERA</th>
            <th className={`th-win`}>승</th>
            <th className={`th-loss`}>패</th>
            <th className={`th-save`}>세</th>
            <th className={`th-hold`}>홀</th>
            <th className={`th-blown`}>블</th>
            <th className={`th-complete`}>완봉</th>
            <th className={`th-perfect`}>완투</th>
            <th className={`th-strikeout`}>삼진</th>
            <th className={`th-whip`}>WHIP</th>
            <th className={`th-homeRun`}>피홈런</th>
            <th className={`th-earnedRun`}>자책점</th>
            <th className={`th-k9`}>K/9</th>
            <th className={`th-hr9`}>홈런/9</th>
            <th className={`th-drag`} />
            <th className={`th-delete`} />
          </tr>
        </thead>
        <tbody>
          {recordArr.map((record, recordIdx) => (
            <tr
              className={`${dragIdx === recordIdx ? '_dragging' : ''} rowIdx-${recordIdx} ${recordIdx > 10 && `_etcPitcher`}`}
              key={recordIdx}
              onDragOver={isEdit ? onDragOverRow : undefined}
              onDrop={isEdit ? onDropRow(recordIdx) : undefined}
            >
              {RECORD_CELLS.map(cell => (
                <td className={cell.className} key={cell.key}>
                  {isEdit && !cell.isCalc ? (
                    <input
                      className={`Input_Table`}
                      onChange={onChangeCell(recordIdx, cell.key, cell.inputType)}
                      type={cell.inputType}
                      value={record[cell.key]}
                    />
                  ) : (
                    formatCellValue(record[cell.key], cell.digits, !isEdit)
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
                <B.DeletePitcherButton name={record.name} onClick={onClickDelete(recordIdx)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 2. 버튼 행 */}
      <div className={`ButtonRow_Table`}>
        <B.AddPitcherButton tableOId={pitcherTable.tableOId} />
        <B.ModifyButton isEdit={isEdit} onClick={onClickModify} />
        <B.DeleteTableButton gameNum={pitcherTable.gameNum} tableOId={pitcherTable.tableOId} />
      </div>
    </div>
  )
}
