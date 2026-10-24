import {useCallback, useEffect, useEffectEvent, useState} from 'react'

import {useRecordCallbacksContext} from '@context'
import {useModalActions, useModalStates, useRecordActions, useRecordStates, useTeamBatterArr, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as HTTP from '@httpType'
import * as U from '@util'
import * as V from '@value'

// 스타일은 상위 컴포넌트인 EditRecordModal.scss 에 있다

type InfoTabPartProps = DivCommonProps

export const InfoTabPart: FC<InfoTabPartProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()
  const {setRecordArr} = useRecordActions()
  const {gameArr, gameNum, leagueNum, recordArr} = useRecordStates()
  const SPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '선발')
  const RPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '중계')
  const CPArr = useTeamPitcherArr(leagueNum ?? -1, V.MY_TEAM_IDX, '마무리')
  const {updateRecord} = useRecordCallbacksContext()

  const [batterOId, setBatterOId] = useState<string>('')
  const [isStealFail, setIsStealFail] = useState<boolean>(false)
  const [pitcherName, setPitcherName] = useState<string>('')
  const [result, setResult] = useState<CT.Type_Result>(null)

  const game = gameArr.find(item => item.gameNum === gameNum) || null
  const enemyTeamIdx = game ? V.TEAM_IDX_MAP[game.enemyTeam] : -1
  const record = recordArr.find(item => item.order === editRecord?.order && item.rotation === editRecord?.rotation) || editRecord?.record || null
  const pitcherArr = [...SPArr, ...RPArr, ...CPArr]
  const mainBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '선발')
  const subBatterArr = useTeamBatterArr(leagueNum ?? -1, enemyTeamIdx, '후보')
  const batterArr = [...mainBatterArr, ...subBatterArr]
  const fallbackPitcherName = record?.pitcherName || game?.SPName || pitcherArr[0]?.name || ''
  const selectedBatter =
    batterArr.find(batter => batter.batterOId === batterOId) ||
    (editRecord?.batter.batterOId === batterOId ? editRecord.batter : null) ||
    editRecord?.batter ||
    null

  const onClickSaveInfo = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (gameNum === null || leagueNum === null || !editRecord) {
        alert(`[InfoTabPart] gameNum or leagueNum is null`)
        return
      }

      const nextRecord = U.buildRecordElement({
        batter: selectedBatter,
        gameNum,
        isStealFail,
        leagueNum,
        order: editRecord.order,
        pitchArr: record?.pitchArr || [],
        pitcherName,
        record,
        result,
        rotation: editRecord.rotation,
      })
      const data: HTTP.HTTP_UpdateRecord = {
        gameNum,
        leagueNum,
        order: editRecord.order,
        record: nextRecord,
        rotation: editRecord.rotation,
      }

      updateRecord(data).then(res => {
        if (res.isSuccess) {
          const {recordArr} = res
          setRecordArr(recordArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[InfoTabPart] ${res.errMsg}`)
          }
        }
      })
    },
    [closeModal, editRecord, gameNum, isStealFail, leagueNum, pitcherName, record, result, selectedBatter, setRecordArr, updateRecord]
  )

  const onChangePitcher = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setPitcherName(e.target.value)
  }, [])

  const onChangeBatter = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBatterOId(e.target.value)
  }, [])

  const onChangeResult = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextResult = (e.target.value || null) as CT.Type_Result
    setResult(nextResult)

    if (!U.canStealFail(nextResult)) {
      setIsStealFail(false)
    }
  }, [])

  const onClickStealFail = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (!U.canStealFail(result)) {
        return
      }

      setIsStealFail(prev => !prev)
    },
    [result]
  )

  const initForm = useEffectEvent(() => {
    const nextPitcherName = U.isRecordedAtBat(record)
      ? record?.pitcherName || fallbackPitcherName
      : U.getRecentPitcherName(recordArr, editRecord ? {order: editRecord.order, rotation: editRecord.rotation} : null, fallbackPitcherName)

    setPitcherName(nextPitcherName)
    setBatterOId(record?.batterOId || editRecord?.batter.batterOId || '')
    setResult(record?.result ?? null)
    setIsStealFail(!!record?.isStealFail && U.canStealFail(record?.result ?? null))
  })

  // 열린 타석 기준으로 정보 폼 초기화
  useEffect(() => {
    initForm()
  }, [editRecord])

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
        <button className={`Button_Modal`} onClick={closeModal} type="button">
          닫기
        </button>
      </div>
    </div>
  )
}
