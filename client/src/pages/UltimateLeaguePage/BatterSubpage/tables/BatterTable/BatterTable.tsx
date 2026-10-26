import {useCallback} from 'react'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as B from '../../buttons'
import * as C from '../../bases'
import * as OT from '@objectType'
import * as R from '../../rows'

import './BatterTable.scss'

type BatterTableProps = DivCommonProps & {
  batterTable: OT.UltiBatterTableType
  prevTable: OT.UltiBatterTableType | null
}

export const BatterTable: FC<BatterTableProps> = ({batterTable, prevTable, ...props}) => {
  return (
    <C.BatterTableProvider batterTable={batterTable} prevTable={prevTable}>
      <BatterTableView {...props} />
    </C.BatterTableProvider>
  )
}

const BatterTableView: FC<DivCommonProps> = ({...props}) => {
  const {batterTable, desc, draftDesc, isEdit, prevTable, recordArr, setDraftDesc} = C.useBatterTableContext()

  const onChangeDesc = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.stopPropagation()
    setDraftDesc(e.target.value)
  }, [])

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
              안타
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
          {recordArr.map((_, recordIdx) => (
            <R.BatterRecordRow key={recordIdx} recordIdx={recordIdx} />
          ))}
        </tbody>
      </table>

      {/* 2. 메모창 */}
      <div className={`Memo_Table`}>
        <p className={`Title_Table`}>메모</p>
        <div className={`Content_Table`}>
          {isEdit ? <textarea className={`Input_Table`} onChange={onChangeDesc} value={draftDesc} /> : <p className={`TableDesc_Table`}>{desc}</p>}
        </div>
      </div>

      {/* 3. 버튼 행 */}
      <div className={`ButtonRow_Table`}>
        <B.AddBatterButton />
        <B.ModifyButton />
        {isEdit && <B.CancelButton />}
        {prevTable && <B.CompareButton />}
        <B.DeleteTableButton />
      </div>
    </div>
  )
}
