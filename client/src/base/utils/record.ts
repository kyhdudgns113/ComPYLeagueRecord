import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const canStealFail = (nextResult: CT.Type_Result) => V.ON_BASE_RESULT_ARR.includes(nextResult)

export const buildRecordElement = (params: {
  batter: OT.BatterType | null
  gameNum: number
  isStealFail: boolean
  leagueNum: number
  order: number
  pitchArr: OT.PitchType[]
  pitcherName: string
  record: OT.RecordElementType | null
  result: CT.Type_Result
  rotation: number
}): OT.RecordElementType => {
  const {batter, gameNum, isStealFail, leagueNum, order, pitchArr, pitcherName, record, result, rotation} = params

  return {
    batterClass: batter?.batterClass || record?.batterClass || '선발',
    batterHand: batter?.batterHand || record?.batterHand || '우타',
    batterName: batter?.name || record?.batterName || '',
    batterOId: batter?.batterOId || record?.batterOId || '',
    gameNum,
    hasPressure: batter?.hasPressureSkill ?? record?.hasPressure ?? false,
    isStealFail: canStealFail(result) && isStealFail,
    leagueNum,
    order,
    pitchArr,
    pitcherName,
    result,
    rotation,
  }
}

export const isRecordedAtBat = (record: OT.RecordElementType | null) => {
  if (!record) {
    return false
  }

  return record.pitchArr.length > 0 || record.result !== null || record.isStealFail
}

/** 현재 타석보다 앞선, 해당 경기·해당 타자의 기록만 */
export const getPrevGameRecordArr = (
  recordArr: OT.RecordElementType[],
  current: {order: number; rotation: number} | null,
  gameNum: number | null,
  batterOId: string
) => {
  if (gameNum === null || !batterOId) {
    return []
  }

  return recordArr
    .filter(item => item.gameNum === gameNum && item.batterOId === batterOId && isRecordedAtBat(item))
    .filter(item => {
      if (!current) {
        return true
      }

      if (item.rotation < current.rotation) {
        return true
      }

      return item.rotation === current.rotation && item.order < current.order
    })
    .sort((a, b) => a.rotation - b.rotation || a.order - b.order)
}

export const getRecentPitcherName = (
  recordArr: OT.RecordElementType[],
  current: {order: number; rotation: number} | null,
  fallback: string
) => {
  if (!current) {
    return fallback
  }

  let recentPitcherName = fallback
  const maxRotation = Math.max(current.rotation, ...recordArr.map(record => record.rotation || 0))

  for (let rotation = 1; rotation <= maxRotation; rotation++) {
    for (const order of V.ORDER_ARR) {
      if (rotation === current.rotation && order === current.order) {
        return recentPitcherName
      }

      const item = recordArr.find(record => record.order === order && record.rotation === rotation) || null
      if (isRecordedAtBat(item) && item?.pitcherName) {
        recentPitcherName = item.pitcherName
      }
    }
  }

  return recentPitcherName
}
