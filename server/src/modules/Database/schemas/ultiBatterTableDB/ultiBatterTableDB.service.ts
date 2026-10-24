import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {UltiBatterTable} from './ultiBatterTableDB.entity'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toUltiBatterTableType = (table: UltiBatterTable): OT.UltiBatterTableType => {
  return {
    createdAtNum: table.createdAt.valueOf(),
    desc: table.desc,
    gameNum: table.gameNum,
    leagueNum: table.leagueNum,
    recordArr: table.recordArr || [],
    tableOId: table._id.toString(),
  }
}

const makeEmptyBatterRecord = (name: string, gameNum: number): OT.UltiBatterRecordType => {
  return {
    name,
    gameNum,
    playNum: 0,
    atBat: 0,
    avg: 0,
    hit1: 0,
    hit2: 0,
    hit3: 0,
    hit4: 0,
    steal: 0,
    slg: 0,
    ops: 0,
    desc: '',
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

      const latestTable = await this.ultiBatterTableDBModel.findOne({leagueNum}).sort({gameNum: -1})
      const recordArr = (latestTable?.recordArr || []).map(record => makeEmptyBatterRecord(record.name, gameNum))

      const newTable = new this.ultiBatterTableDBModel({desc: '', gameNum, leagueNum, recordArr})
      await newTable.save()

      return {batterTable: toUltiBatterTableType(newTable)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async addUltiBatterRecord(where: string, dto: DTO.DTO_AddUltiBatterRecord) {
    where = where + '/addUltiBatterRecord'

    const {name, tableOId} = dto

    try {
      const table = await this.ultiBatterTableDBModel.findById(tableOId)
      if (!table) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      const nextRecord = makeEmptyBatterRecord(name, table.gameNum)
      const updatedTable = await this.ultiBatterTableDBModel.findByIdAndUpdate(tableOId, {$push: {recordArr: nextRecord}}, {returnDocument: 'after'})
      if (!updatedTable) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      return {batterTable: toUltiBatterTableType(updatedTable)}
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

  async deleteUltiBatterTable(where: string, dto: DTO.DTO_DeleteUltiBatterTable) {
    where = where + '/deleteUltiBatterTable'

    const {tableOId} = dto

    try {
      const table = await this.ultiBatterTableDBModel.findById(tableOId)
      if (!table) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      const leagueNum = table.leagueNum
      await this.ultiBatterTableDBModel.findByIdAndDelete(tableOId)

      return {leagueNum}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateUltiBatterTable(where: string, dto: DTO.DTO_UpdateUltiBatterTable) {
    where = where + '/updateUltiBatterTable'

    const {recordArr, tableOId} = dto

    try {
      const updatedTable = await this.ultiBatterTableDBModel.findByIdAndUpdate(tableOId, {$set: {recordArr}}, {returnDocument: 'after'})
      if (!updatedTable) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      return {batterTable: toUltiBatterTableType(updatedTable)}
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
