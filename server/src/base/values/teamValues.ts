import * as CT from '@commonType'

// 정렬기준 : KT 가 맨 앞, 나머지는 스탯티즈 순
export const [TEAM_KT, TEAM_KIA, TEAM_SAMSUNG, TEAM_DOOSAN, TEAM_SSG, TEAM_LG, TEAM_LOTTE, TEAM_HANHWA, TEAM_NC, TEAM_KIWOOM] = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
]

export const TEAM_NAME: {[key: string]: CT.Type_Team} = {
  [TEAM_KT]: 'KT',
  [TEAM_KIA]: '기아',
  [TEAM_SAMSUNG]: '삼성',
  [TEAM_DOOSAN]: '두산',
  [TEAM_SSG]: 'SSG',
  [TEAM_LG]: 'LG',
  [TEAM_LOTTE]: '롯데',
  [TEAM_HANHWA]: '한화',
  [TEAM_NC]: 'NC',
  [TEAM_KIWOOM]: '키움',
}

export const TEAM_IDX_ARR = [TEAM_KT, TEAM_KIA, TEAM_SAMSUNG, TEAM_DOOSAN, TEAM_SSG, TEAM_LG, TEAM_LOTTE, TEAM_HANHWA, TEAM_NC, TEAM_KIWOOM]

export const MY_TEAM_IDX = TEAM_KT
export const MY_TEAM_NAME: CT.Type_Team = TEAM_NAME[MY_TEAM_IDX]
