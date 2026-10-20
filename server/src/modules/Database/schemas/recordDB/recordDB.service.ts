import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {RecordArr} from './recordDB.entity'
import {Model} from 'mongoose'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toRecordElementType = (record: OT.RecordElementType): OT.RecordElementType => {
  return {
    batterClass: record.batterClass,
    batterHand: record.batterHand,
    batterName: record.batterName,
    batterOId: record.batterOId || '',
    gameNum: record.gameNum,
    hasPressure: record.hasPressure,
    leagueNum: record.leagueNum,
    order: record.order,
    pitchArr: record.pitchArr || [],
    pitcherName: record.pitcherName,
    result: record.result ?? null,
    rotation: record.rotation,
  }
}

@Injectable()
export class RecordDBService {
  constructor(@InjectModel(RecordArr.name) private recordArrDBModel: Model<RecordArr>) {}

  async createRecordArr(where: string, dto: DTO.DTO_CreateRecordArr) {
    where = where + '/createRecordArr'

    const {gameNum, leagueNum, recordArr} = dto

    try {
      const newRecordArr = new this.recordArrDBModel({
        gameNum,
        leagueNum,
        recordArr: recordArr.map(record => toRecordElementType(record)),
      })
      await newRecordArr.save()
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readRecordArr(where: string, dto: DTO.DTO_ReadRecordArr) {
    where = where + '/readRecordArr'

    const {gameNum, leagueNum} = dto

    try {
      const recordArrDB = await this.recordArrDBModel.findOne({gameNum, leagueNum})

      if (!recordArrDB) {
        return {recordArr: []}
      }

      const recordArr = (recordArrDB.recordArr || []).map(record => toRecordElementType(record))
      return {recordArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateBatterInfoInRecordArr(where: string, dto: DTO.DTO_UpdateBatterInRecordArr) {
    where = where + '/updateBatterInfoInRecordArr'

    const {batterClass, batterHand, batterName, batterOId, gameNumArr, hasPressure, leagueNum, prevName} = dto

    try {
      if (gameNumArr.length === 0) {
        return
      }

      await this.recordArrDBModel.updateMany(
        {gameNum: {$in: gameNumArr}, leagueNum},
        {
          $set: {
            'recordArr.$[elem].batterClass': batterClass,
            'recordArr.$[elem].batterHand': batterHand,
            'recordArr.$[elem].batterName': batterName,
            'recordArr.$[elem].batterOId': batterOId,
            'recordArr.$[elem].hasPressure': hasPressure,
          },
        },
        {
          arrayFilters: [{$or: [{'elem.batterOId': batterOId}, {'elem.batterName': prevName}]}],
        }
      )
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
