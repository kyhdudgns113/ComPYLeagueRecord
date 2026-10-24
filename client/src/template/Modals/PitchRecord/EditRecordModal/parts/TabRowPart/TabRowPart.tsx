import {useCallback} from 'react'

import type {FC} from 'react'
import type {Setter} from '@localType'
import type {DivCommonProps} from '@prop'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

export type TabType = '기록' | '정보'

type TabRowPartProps = DivCommonProps & {
  setTab: Setter<TabType>
  tab: TabType
}

export const TabRowPart: FC<TabRowPartProps> = ({setTab, tab, ...props}) => {
  const onClickTab = useCallback(
    (nextTab: TabType) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      setTab(nextTab)
    },
    []
  )

  return (
    <div className={`Tab_Row_Modal`} {...props}>
      <button className={`Tab_Modal ${tab === '기록' ? 'selected' : ''}`} onClick={onClickTab('기록')} type="button">
        기록
      </button>
      <button className={`Tab_Modal ${tab === '정보' ? 'selected' : ''}`} onClick={onClickTab('정보')} type="button">
        정보
      </button>
    </div>
  )
}
