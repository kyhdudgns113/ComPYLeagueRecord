import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

type InfoTabPartProps = DivCommonProps & {
  batterOId: string
  isStealFail: boolean
  mainBatterArr: OT.BatterType[]
  onChangeBatter: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangePitcher: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeResult: (e: React.ChangeEvent<HTMLSelectElement>) => void
  onClickClose: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickSaveInfo: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClickStealFail: (e: React.MouseEvent<HTMLButtonElement>) => void
  pitcherArr: OT.PitcherType[]
  pitcherName: string
  result: CT.Type_Result
  subBatterArr: OT.BatterType[]
}

export const InfoTabPart: FC<InfoTabPartProps> = ({
  batterOId,
  isStealFail,
  mainBatterArr,
  onChangeBatter,
  onChangePitcher,
  onChangeResult,
  onClickClose,
  onClickSaveInfo,
  onClickStealFail,
  pitcherArr,
  pitcherName,
  result,
  subBatterArr,
  ...props
}) => {
  return (
    <div className={`InfoTab_Modal`} {...props}>
      {/* 2. 입력행: 투수 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>투수</p>
        <select className={`Select_Modal`} onChange={onChangePitcher} value={pitcherName}>
          {pitcherArr.map(pitcher => (
            <option key={pitcher.pitcherOId} value={pitcher.name}>
              {pitcher.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. 입력행: 타자 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>타자</p>
        <select className={`Select_Modal`} onChange={onChangeBatter} value={batterOId}>
          <optgroup label="선발">
            {mainBatterArr.map(batter => (
              <option key={batter.batterOId} value={batter.batterOId}>
                {batter.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="후보">
            {subBatterArr.map(batter => (
              <option key={batter.batterOId} value={batter.batterOId}>
                {batter.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* 4. 입력행: 결과 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>결과</p>
        <select className={`Select_Modal`} onChange={onChangeResult} value={result || ''}>
          {V.RESULT_ARR.map(item => (
            <option key={item || 'empty'} value={item || ''}>
              {item || '없음'}
            </option>
          ))}
        </select>
      </div>

      {/* 5. 입력행: 도루실패 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>도루실패</p>
        <button
          className={`StealFailToggle_Modal ${isStealFail ? '_on' : ''}`}
          disabled={!U.canStealFail(result)}
          onClick={onClickStealFail}
          type="button"
        >
          {isStealFail ? '실패' : '없음'}
        </button>
      </div>

      {/* 6. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSaveInfo} type="button">
          추가
        </button>
        <button className={`Button_Modal`} onClick={onClickClose} type="button">
          닫기
        </button>
      </div>
    </div>
  )
}
