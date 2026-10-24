import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

// 스타일은 상위 컴포넌트인 AddBatterModal.scss 에 있다

type InputRowProps = DivCommonProps & {
  label: string
}

export const InputRow: FC<InputRowProps> = ({children, label, ...props}) => {
  return (
    <div className={`Input_Row_Modal`} {...props}>
      <p className={`Input_Label_Modal`}>{label}</p>
      {children}
    </div>
  )
}
