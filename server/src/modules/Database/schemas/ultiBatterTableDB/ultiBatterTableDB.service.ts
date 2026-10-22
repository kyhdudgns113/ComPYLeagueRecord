import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {UltiBatterTable} from './ultiBatterTableDB.entity'
import {Model} from 'mongoose'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toUltiBatterTableType = (table: UltiBatterTable): OT.UltiBatterTableType => {
  return {
    desc: table.desc,
    gameNum: table.gameNum,
    leagueNum: table.leagueNum,
    recordArr: table.recordArr || [],
  }
}

@Injectable()
export class UltiBatterTableDBService {
  constructor(@InjectModel(UltiBatterTable.name) private ultiBatterTableDBModel: Model<UltiBatterTable>) {}

  async createUltiBatterTable(where: string, dto: DTO.DTO_CreateUltiBatterTable) {
    where = where + '/createUltiBatterTable'

    const {gameNum, leagueNum} = dto

    try {
      if (gameNum < 1) {
        throw {gkdErrMsg: `[${where}] gameNum 은 1 이상이어야 합니다. gameNum: ${gameNum}`, statusCode: 400}
      }

      const newTable = new this.ultiBatterTableDBModel({desc: '', gameNum, leagueNum, recordArr: []})
      await newTable.save()

      return {batterTable: toUltiBatterTableType(newTable)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteUltiBatterTableArrByLeagueNum(where: string, leagueNum: number) {
    where = where + '/deleteUltiBatterTableArrByLeagueNum'

    try {
      await this.ultiBatterTableDBModel.deleteMany({leagueNum})
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readUltiBatterTableArr(where: string, dto: DTO.DTO_ReadUltiBatterTableArr) {
    where = where + '/readUltiBatterTableArr'

    try {
      const tableArrDB = await this.ultiBatterTableDBModel.find({leagueNum: dto.leagueNum}).sort({gameNum: -1})

      if (!tableArrDB) {
        return {batterTableArr: []}
      }

      const batterTableArr = tableArrDB.map(table => toUltiBatterTableType(table))
      return {batterTableArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
