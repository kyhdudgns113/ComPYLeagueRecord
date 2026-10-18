import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './IntroPage.scss'

type IntroPageProps = DivCommonProps

export const IntroPage: FC<IntroPageProps> = ({...props}) => {
  return (
    <div className={`IntroPage`} {...props}>
      IntroPage.tsx
    </div>
  )
}
