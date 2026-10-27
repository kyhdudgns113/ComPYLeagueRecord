import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as C from '../../bases'
import * as U from '@util'
import * as V from '@value'

import './InfoTabPart.scss'

type InfoTabPartProps = DivCommonProps

export const InfoTabPart: FC<InfoTabPartProps> = ({...props}) => {
  const {
    batterOId,
    isStealFail,
    mainBatterArr,
    onChangeBatter,
    onChangePitcher,
    onChangeResult,
    onClickStealFail,
    pitcherArr,
    pitcherName,
    result,
    subBatterArr,
  } = C.useEditRecordModalContext()

  const SPArr = pitcherArr.filter(pitcher => pitcher.pitcherType === '선발')
  const RPArr = pitcherArr.filter(pitcher => pitcher.pitcherType === '중계')
  const CPArr = pitcherArr.filter(pitcher => pitcher.pitcherType === '마무리')

  return (
    <div className={`InfoTab_Modal`} {...props}>
      {/* 1. 입력행: 투수 / 타자 */}
      <div className={`Input_Row_Modal`}>
        <div className={`Input_Field_Modal`}>
          <p className={`Input_Label_Modal`}>투수</p>
          <select className={`Select_Modal`} onChange={onChangePitcher} value={pitcherName}>
            <optgroup label="선발">
              {SPArr.map(pitcher => (
                <option key={pitcher.pitcherOId} value={pitcher.name}>
                  {pitcher.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="중계">
              {RPArr.map(pitcher => (
                <option key={pitcher.pitcherOId} value={pitcher.name}>
                  {pitcher.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="마무리">
              {CPArr.map(pitcher => (
                <option key={pitcher.pitcherOId} value={pitcher.name}>
                  {pitcher.name}
                </option>
              ))}
            </optgroup>
          </select>
        </div>
        <div className={`Input_Field_Modal`}>
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
      </div>

      {/* 2. 입력행: 결과 / 도루실패 */}
      <div className={`Input_Row_Modal`}>
        <div className={`Input_Field_Modal`}>
          <p className={`Input_Label_Modal`}>결과</p>
          <select className={`Select_Modal`} onChange={onChangeResult} value={result || ''}>
            {V.RESULT_ARR.map(item => (
              <option key={item || 'empty'} value={item || ''}>
                {item || '없음'}
              </option>
            ))}
          </select>
        </div>
        <div className={`Input_Field_Modal`}>
          <p className={`Input_Label_Modal`}>도루실패</p>
          <button
            className={`StealFailToggle_Modal ${isStealFail ? '_on' : ''}`}
            disabled={!U.canStealFail(result)}
            onClick={onClickStealFail(result)}
            type="button"
          >
            {isStealFail ? '실패' : '없음'}
          </button>
        </div>
      </div>
    </div>
  )
}
