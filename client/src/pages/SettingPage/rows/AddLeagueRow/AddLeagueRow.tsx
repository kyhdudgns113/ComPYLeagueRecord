import {useCallback} from 'react'

import {Icon} from '@component'

import type {FC} from 'react'
import type {TableRowCommonProps} from '@prop'

// 테이블 스타일은 상위 컴포넌트인 LeagueUnit.scss 에 있다
import './AddLeagueRow.scss'
import {useModalActions} from '@redux'

type AddLeagueRowProps = TableRowCommonProps

export const AddLeagueRow: FC<AddLeagueRowProps> = ({...props}) => {
  const {openAddLeagueModal} = useModalActions()

  const onClickAddLeague = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      e.stopPropagation()
      openAddLeagueModal()
    },
    [openAddLeagueModal]
  )

  return (
    <tr className={`AddLeagueRow`} {...props}>
      <td colSpan={3}>
        <Icon className={`AddLeagueIcon_Row`} iconName="add" onClick={onClickAddLeague} />
      </td>
    </tr>
  )
}
