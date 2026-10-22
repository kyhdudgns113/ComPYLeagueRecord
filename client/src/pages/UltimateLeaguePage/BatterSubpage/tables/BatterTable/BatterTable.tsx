import type {FC} from 'react'
import type {TableCommonProps} from '@prop'

import './BatterTable.scss'

type BatterTableProps = TableCommonProps

export const BatterTable: FC<BatterTableProps> = ({...props}) => {
  return (
    <table className={`BatterTable`} {...props}>
      BatterTable.tsx
    </table>
  )
}
