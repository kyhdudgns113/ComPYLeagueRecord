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
}
