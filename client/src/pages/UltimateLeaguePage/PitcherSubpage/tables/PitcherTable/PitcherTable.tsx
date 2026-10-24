import {useState} from 'react'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'
import * as R from '../../rows'

import './PitcherTable.scss'

type PitcherTableProps = DivCommonProps & {
  pitcherTable: OT.UltiPitcherTableType
}

export const PitcherTable: FC<PitcherTableProps> = ({pitcherTable, ...props}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<OT.UltiPitcherRecordType[]>(pitcherTable.recordArr)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : pitcherTable.recordArr

  return (
    <div className={`PitcherTable ${isEdit ? '_editing' : ''}`} {...props}>
      {/* 1. 테이블 */}
      <table>
        <thead>
          <tr>
            <th className={`th-gameNum`}>{pitcherTable.gameNum}</th>
            <th className={`th-playNum`} rowSpan={2}>
              출전
            </th>
            <th className={`th-innings`} rowSpan={2}>
              이닝
            </th>
            <th className={`th-era`} rowSpan={2}>
              ERA
            </th>
            <th className={`th-win`} rowSpan={2}>
              승
            </th>
            <th className={`th-loss`} rowSpan={2}>
              패
            </th>
            <th className={`th-save`} rowSpan={2}>
              세
            </th>
            <th className={`th-hold`} rowSpan={2}>
              홀
            </th>
            <th className={`th-blown`} rowSpan={2}>
              블
            </th>
            <th className={`th-complete`} rowSpan={2}>
              완봉
            </th>
            <th className={`th-perfect`} rowSpan={2}>
              완투
            </th>
            <th className={`th-strikeout`} rowSpan={2}>
              삼진
            </th>
            <th className={`th-whip`} rowSpan={2}>
              WHIP
            </th>
            <th className={`th-homeRun`} rowSpan={2}>
              피홈런
            </th>
            <th className={`th-earnedRun`} rowSpan={2}>
              자책점
            </th>
            <th className={`th-k9`} rowSpan={2}>
              K/9
            </th>
            <th className={`th-hr9`} rowSpan={2}>
              홈런/9
            </th>
            <th className={`th-drag`} rowSpan={2} />
            <th className={`th-delete`} rowSpan={2} />
          </tr>
          <tr>
            <th className={`th-createdAt`}>{new Date(pitcherTable.createdAtNum).toLocaleDateString()}</th>
          </tr>
        </thead>
        <tbody>
          {recordArr.map((record, recordIdx) => (
            <R.PitcherRecordRow
              dragIdx={dragIdx}
              isEdit={isEdit}
              key={recordIdx}
              record={record}
              recordArr={recordArr}
              recordIdx={recordIdx}
              setDragIdx={setDragIdx}
              setDraftArr={setDraftArr}
              tableOId={pitcherTable.tableOId}
            />
          ))}
        </tbody>
      </table>

      {/* 2. 버튼 행 */}
      <div className={`ButtonRow_Table`}>
        <B.AddPitcherButton tableOId={pitcherTable.tableOId} />
        <B.ModifyButton draftArr={draftArr} isEdit={isEdit} pitcherTable={pitcherTable} setDraftArr={setDraftArr} setIsEdit={setIsEdit} />
        <B.DeleteTableButton pitcherTable={pitcherTable} />
      </div>
    </div>
  )
}
