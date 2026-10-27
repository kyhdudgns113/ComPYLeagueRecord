import * as OT from '@objectType'

export const NULL_BATTER_OBJ = () => {
  const ret: OT.BatterType = {
    batterClass: '선발',
    batterHand: '좌타',
    batterOId: '',
    hasPressureSkill: false,
    name: 'NULL VALUE',
    teamName: 'KT',
    leagueNum: 0,
  }
  return ret
}

export const NULL_GAME_INFO_OBJ = () => {
  const ret: OT.GameInfoType = {
    enemyTeam: 'KT',
    gameNum: 0,
    leagueNum: 0,
    SPName: 'NULL VALUE',
  }
  return ret
}

export const NULL_PITCHER_OBJ = () => {
  const ret: OT.PitcherType = {
    name: '빈 이름',
    pitcherHand: '우완',
    pitcherOId: '빈 OID',
    pitcherType: '선발',
    pitchTypeArr: [],
    teamName: 'KT',
    leagueNum: 0,
  }
  return ret
}
