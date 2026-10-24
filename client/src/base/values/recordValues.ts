import * as CT from '@commonType'

export const ORDER_ARR = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export const ZONE_GRID: CT.Type_Location[][] = [
  ['HL', 'H1', 'H2', 'H3', 'HR'],
  ['L1', '1', '2', '3', 'R3'],
  ['L4', '4', '5', '6', 'R6'],
  ['L7', '7', '8', '9', 'R9'],
  ['BL', 'B7', 'B8', 'B9', 'BR'],
]

export const STRIKE_ZONE_SET = new Set<CT.Type_Location>(['1', '2', '3', '4', '5', '6', '7', '8', '9'])

export const PITCH_BTN_ARR: {ball: CT.Type_Pitch; label: string}[] = [
  {ball: '직구', label: '직구'},
  {ball: '컷터', label: '컷터'},
  {ball: '투심', label: '투심'},
  {ball: '싱커', label: '싱커'},
  {ball: '스플리터', label: '스플'},
  {ball: '슬라이더', label: '슬라'},
  {ball: '커브', label: '커브'},
  {ball: '포크', label: '포크'},
  {ball: '체인지업', label: '체인지'},
  {ball: '써클 체인지업', label: '써클'},
]

export const RESULT_ARR: CT.Type_Result[] = ['1루타', '2루타', '3루타', '홈런', '볼넷', '삼진', '뜬공', '땅볼', '직선타', '병살', '에러', null]

export const ON_BASE_RESULT_ARR: CT.Type_Result[] = ['1루타', '2루타', '3루타', '볼넷', '에러']
