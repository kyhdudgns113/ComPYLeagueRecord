import type {DivCommonProps} from '@prop'
import type {FC} from 'react'

import './Template.scss'

type TemplateProps = DivCommonProps

export const Template: FC<TemplateProps> = ({...props}) => {
  return (
    <div className={`Template`} {...props}>
      <p>Template.tsx</p>
      <p>Template 내용</p>
    </div>
  )
}
