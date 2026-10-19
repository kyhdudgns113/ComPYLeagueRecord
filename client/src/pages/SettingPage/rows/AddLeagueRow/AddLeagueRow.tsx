import {Icon} from '@component'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

// 테이블 스타일은 상위 컴포넌트인 LeagueUnit.scss 에 있다
import './AddLeagueRow.scss'

type AddLeagueRowProps = TableRowCommonProps

export const AddLeagueRow: FC<AddLeagueRowProps> = ({...props}) => {
  return (
    <tr className={`AddLeagueRow`} {...props}>
      <td colSpan={3}>
        <Icon className={`AddLeagueIcon_Row`} iconName="add" />
      </td>
    </tr>
  )
}
