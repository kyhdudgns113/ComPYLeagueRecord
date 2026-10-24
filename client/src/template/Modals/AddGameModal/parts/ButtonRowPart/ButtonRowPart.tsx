import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

// 스타일은 상위 컴포넌트인 AddGameModal.scss 에 있다

type ButtonRowPartProps = DivCommonProps & {
  onClickCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void
  submitText: string
}

export const ButtonRowPart: FC<ButtonRowPartProps> = ({onClickCancel, onClickSubmit, submitText, ...props}) => {
  return (
    <div className={`Button_Row_Modal`} {...props}>
      <button className={`Button_Modal`} onClick={onClickSubmit} type="button">
        {submitText}
      </button>
      <button className={`Button_Modal`} onClick={onClickCancel} type="button">
        취소
      </button>
    </div>
  )
}
