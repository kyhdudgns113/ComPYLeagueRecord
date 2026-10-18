export type Type_BatterClass = '선발' | '후보'

export type Type_BatterHand = '좌타' | '우타' | '양타'

export type Type_Location =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'HL'
  | 'H1'
  | 'H2'
  | 'H3'
  | 'HR'
  | 'L1'
  | 'L4'
  | 'L7'
  | 'R3'
  | 'R6'
  | 'R9'
  | 'BL'
  | 'B7'
  | 'B8'
  | 'B9'
  | 'BR'

export type Type_Pitch = '직구' | '컷터' | '투심' | '싱커' | '스플리터' | '커브' | '포크' | '슬라이더' | '체인지업' | '써클 체인지업'

export type Type_Pitcher = '선발' | '중계' | '마무리'

export type Type_PitcherHand = '좌완' | '우완' | '좌사' | '우사' | '좌언' | '우언'

export type Type_Result = '1루타' | '2루타' | '3루타' | '홈런' | '삼진' | '뜬공' | '땅볼' | '직선타' | '병살' | '에러' | '도루실패' | null

export type Type_Team = 'KT' | '기아' | '삼성' | '두산' | 'SSG' | 'LG' | '롯데' | '한화' | 'NC' | '키움'
