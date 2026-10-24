import {useState} from 'react'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as OT from '@objectType'
import * as R from '../../rows'

import './BatterTable.scss'

type BatterTableProps = DivCommonProps & {
  batterTable: OT.UltiBatterTableType
}

export const BatterTable: FC<BatterTableProps> = ({batterTable, ...props}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [draftArr, setDraftArr] = useState<OT.UltiBatterRecordType[]>(batterTable.recordArr)
  const [dragIdx, setDragIdx] = useState<number | null>(null)

  const recordArr = isEdit ? draftArr : batterTable.recordArr

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
            <R.BatterRecordRow
              dragIdx={dragIdx}
              isEdit={isEdit}
              key={recordIdx}
              record={record}
              recordArr={recordArr}
              recordIdx={recordIdx}
              setDragIdx={setDragIdx}
              setDraftArr={setDraftArr}
              tableOId={batterTable.tableOId}
            />
          ))}
        </tbody>
      </table>

      {/* 2. 버튼 행 */}
      <div className={`ButtonRow_Table`}>
        <B.AddBatterButton tableOId={batterTable.tableOId} />
        <B.ModifyButton batterTable={batterTable} draftArr={draftArr} isEdit={isEdit} setDraftArr={setDraftArr} setIsEdit={setIsEdit} />
        <B.DeleteTableButton batterTable={batterTable} />
      </div>
    </div>
  )
}
