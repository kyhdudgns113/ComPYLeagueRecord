import {Fragment, useEffect, useState} from 'react'

import {useRecordStates} from '@redux'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as OT from '@objectType'
import * as R from '../../rows'

import './RecordUnit.scss'

type DummyStarterType = {
  batterHand: CT.Type_BatterHand
  batterName: string
  hasPressure: boolean
  order: number
}

const DUMMY_STARTER_ARR: DummyStarterType[] = [
  {order: 1, batterName: '박찬호', batterHand: '우타', hasPressure: false},
  {order: 2, batterName: '김도영', batterHand: '우타', hasPressure: true},
  {order: 3, batterName: '소크라테스', batterHand: '좌타', hasPressure: false},
  {order: 4, batterName: '최형우', batterHand: '좌타', hasPressure: true},
  {order: 5, batterName: '나성범', batterHand: '좌타', hasPressure: false},
  {order: 6, batterName: '김선빈', batterHand: '우타', hasPressure: false},
  {order: 7, batterName: '이우성', batterHand: '우타', hasPressure: false},
  {order: 8, batterName: '한준수', batterHand: '좌타', hasPressure: false},
  {order: 9, batterName: '박민', batterHand: '우타', hasPressure: false},
]

const makeRecord = (
  starter: DummyStarterType,
  pitcherName: string,
  pitch: OT.PitchType[],
  result: CT.Type_Result,
  override?: Partial<OT.RecordElementType>
): OT.RecordElementType => {
  return {
    batterClass: '선발',
    batterHand: starter.batterHand,
    batterName: starter.batterName,
    hasPressure: starter.hasPressure,
    pitch,
    pitcherName,
    result,
    ...override,
  }
}

const DUMMY_RECORD_ARR: OT.RecordElementType[] = [
  makeRecord(
    DUMMY_STARTER_ARR[0],
    '구대성',
    [
      {ball: '직구', location: '5'},
      {ball: '슬라이더', location: 'H1'},
    ],
    '삼진'
  ),
  makeRecord(
    DUMMY_STARTER_ARR[1],
    '구대성',
    [
      {ball: '직구', location: '2'},
      {ball: '커브', location: '7'},
    ],
    '1루타'
  ),
  makeRecord(
    DUMMY_STARTER_ARR[2],
    '구대성',
    [
      {ball: '포크', location: '8'},
      {ball: '직구', location: '9'},
    ],
    '뜬공'
  ),
  makeRecord(
    DUMMY_STARTER_ARR[3],
    '구대성',
    [
      {ball: '직구', location: '1'},
      {ball: '슬라이더', location: 'L7'},
    ],
    '삼진'
  ),
  makeRecord(DUMMY_STARTER_ARR[4], '구대성', [{ball: '체인지업', location: '6'}], '땅볼'),
  makeRecord(
    DUMMY_STARTER_ARR[5],
    '구대성',
    [
      {ball: '직구', location: '4'},
      {ball: '직구', location: '5'},
      {ball: '컷터', location: '3'},
    ],
    '2루타'
  ),
  makeRecord(DUMMY_STARTER_ARR[6], '구대성', [{ball: '슬라이더', location: 'HR'}], '삼진'),
  makeRecord(DUMMY_STARTER_ARR[7], '구대성', [{ball: '직구', location: '8'}], '병살'),
  makeRecord(DUMMY_STARTER_ARR[8], '구대성', [{ball: '커브', location: 'B8'}], '뜬공'),
  makeRecord(DUMMY_STARTER_ARR[0], '구대성', [{ball: '직구', location: '5'}], '1루타'),
  makeRecord(
    DUMMY_STARTER_ARR[1],
    '구대성',
    [
      {ball: '슬라이더', location: '2'},
      {ball: '포크', location: '8'},
    ],
    '홈런'
  ),
  makeRecord(DUMMY_STARTER_ARR[2], '정민철', [{ball: '직구', location: '9'}], '직선타'),
  makeRecord(
    DUMMY_STARTER_ARR[3],
    '정민철',
    [
      {ball: '투심', location: '5'},
      {ball: '커브', location: 'H3'},
    ],
    '삼진'
  ),
  makeRecord(DUMMY_STARTER_ARR[4], '정민철', [{ball: '직구', location: 'L1'}], '에러'),
  makeRecord(DUMMY_STARTER_ARR[5], '정민철', [{ball: '슬라이더', location: '6'}], '뜬공', {
    batterClass: '후보',
    batterName: '이창진',
    batterHand: '좌타',
    hasPressure: false,
  }),
  makeRecord(
    DUMMY_STARTER_ARR[6],
    '정민철',
    [
      {ball: '직구', location: '7'},
      {ball: '체인지업', location: '2'},
    ],
    '땅볼'
  ),
  makeRecord(DUMMY_STARTER_ARR[7], '정민철', [{ball: '포크', location: '5'}], '삼진'),
  makeRecord(DUMMY_STARTER_ARR[8], '정민철', [{ball: '직구', location: '3'}], '1루타'),
  makeRecord(
    DUMMY_STARTER_ARR[0],
    '김원형',
    [
      {ball: '직구', location: '5'},
      {ball: '슬라이더', location: '1'},
    ],
    '뜬공'
  ),
  makeRecord(DUMMY_STARTER_ARR[1], '김원형', [{ball: '커브', location: '8'}], '삼진'),
  makeRecord(
    DUMMY_STARTER_ARR[2],
    '김원형',
    [
      {ball: '직구', location: '4'},
      {ball: '직구', location: '6'},
    ],
    '2루타'
  ),
]

const getAtBatArr = (recordArr: OT.RecordElementType[], orderIdx: number, atBatLen: number) => {
  return Array.from({length: atBatLen}, (_, atBatIdx) => {
    return recordArr[atBatIdx * 9 + orderIdx] || null
  })
}

type RecordUnitProps = DivCommonProps

export const RecordUnit: FC<RecordUnitProps> = ({...props}) => {
  const {gameNum, leagueNum} = useRecordStates()
  const [isHidden, setIsHidden] = useState<boolean>(true)

  const atBatLen = Math.max(6, Math.ceil(DUMMY_RECORD_ARR.length / 9))

  useEffect(() => {
    setIsHidden(gameNum === null)
  }, [gameNum])

  return (
    <div className={`RecordUnit`} {...props}>
      <div hidden={isHidden}>
        {/* 1. 타이틀 */}
        <p className={`Title_Unit`}>{`[리그 ${leagueNum || ''}] 게임 ${gameNum || ''} 기록`}</p>

        {/* 2. 테이블: 타순별 투구 기록 */}
        <table className={`Table_Unit`}>
          <thead>
            <tr>
              <th className={`th-order`} rowSpan={2}>
                #
              </th>
              <th className={`th-name`} rowSpan={2}>
                이름
              </th>
              <th className={`th-hand`} rowSpan={2}>
                손
              </th>
              <th className={`th-pressure`} rowSpan={2}>
                위
              </th>
              {Array.from({length: atBatLen}, (_, atBatIdx) => (
                <th key={atBatIdx} className={`th-atBat`} colSpan={2}>
                  {`타석 ${atBatIdx + 1}`}
                </th>
              ))}
            </tr>
            <tr>
              {Array.from({length: atBatLen}, (_, atBatIdx) => (
                <Fragment key={atBatIdx}>
                  <th className={`th-pitch`}>투구</th>
                  <th className={`th-result`}>결</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {DUMMY_STARTER_ARR.map((starter, orderIdx) => {
              return (
                <R.RecordRow
                  key={starter.order}
                  atBatArr={getAtBatArr(DUMMY_RECORD_ARR, orderIdx, atBatLen)}
                  batterHand={starter.batterHand}
                  batterName={starter.batterName}
                  hasPressure={starter.hasPressure}
                  order={starter.order}
                />
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
