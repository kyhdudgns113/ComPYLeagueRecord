import * as CT from '@commonType'
import * as OT from '@objectType'
import * as V from '@value'

export const canStealFail = (nextResult: CT.Type_Result) => V.ON_BASE_RESULT_ARR.includes(nextResult)

export const isRecordedAtBat = (record: OT.RecordElementType | null) => {
  if (!record) {
    return false
  }

  return record.pitchArr.length > 0 || record.result !== null || record.isStealFail
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
