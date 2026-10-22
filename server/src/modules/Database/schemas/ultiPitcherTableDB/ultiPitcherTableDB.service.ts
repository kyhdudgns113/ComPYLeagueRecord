import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {UltiPitcherTable} from './ultiPitcherTableDB.entity'
import {Model} from 'mongoose'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toUltiPitcherTableType = (table: UltiPitcherTable): OT.UltiPitcherTableType => {
  return {
    desc: table.desc,
    gameNum: table.gameNum,
    leagueNum: table.leagueNum,
    recordArr: table.recordArr || [],
    tableOId: table._id.toString(),
  }
}

const makeEmptyPitcherRecord = (name: string, gameNum: number): OT.UltiPitcherRecordType => {
  return {
    name,
    gameNum,
    playNum: 0,
    inning: 0,
    era: 0,
    win: 0,
    lose: 0,
    save: 0,
    hold: 0,
    blown: 0,
    wanBong: 0,
    wanTo: 0,
    strikeOut: 0,
    whip: 0,
    homeRun: 0,
    ownLoseScore: 0,
    kPer9: 0,
    homeRunPer9: 0,
    desc: '',
  }
}

@Injectable()
export class UltiPitcherTableDBService {
  constructor(@InjectModel(UltiPitcherTable.name) private ultiPitcherTableDBModel: Model<UltiPitcherTable>) {}

  async createUltiPitcherTable(where: string, dto: DTO.DTO_CreateUltiPitcherTable) {
    where = where + '/createUltiPitcherTable'

    const {gameNum, leagueNum} = dto

    try {
      if (gameNum < 1) {
        throw {gkdErrMsg: `[${where}] gameNum 은 1 이상이어야 합니다. gameNum: ${gameNum}`, statusCode: 400}
      }

      const latestTable = await this.ultiPitcherTableDBModel.findOne({leagueNum}).sort({gameNum: -1})
      const recordArr = (latestTable?.recordArr || []).map(record => makeEmptyPitcherRecord(record.name, gameNum))

      const newTable = new this.ultiPitcherTableDBModel({desc: '', gameNum, leagueNum, recordArr})
      await newTable.save()

      return {pitcherTable: toUltiPitcherTableType(newTable)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async addUltiPitcherRecord(where: string, dto: DTO.DTO_AddUltiPitcherRecord) {
    where = where + '/addUltiPitcherRecord'

    const {name, tableOId} = dto

    try {
      const table = await this.ultiPitcherTableDBModel.findById(tableOId)
      if (!table) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      const nextRecord = makeEmptyPitcherRecord(name, table.gameNum)
      const updatedTable = await this.ultiPitcherTableDBModel.findByIdAndUpdate(
        tableOId,
        {$push: {recordArr: nextRecord}},
        {returnDocument: 'after'}
      )
      if (!updatedTable) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      return {pitcherTable: toUltiPitcherTableType(updatedTable)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteUltiPitcherTableArrByLeagueNum(where: string, leagueNum: number) {
    where = where + '/deleteUltiPitcherTableArrByLeagueNum'

    try {
      await this.ultiPitcherTableDBModel.deleteMany({leagueNum})
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteUltiPitcherTable(where: string, dto: DTO.DTO_DeleteUltiPitcherTable) {
    where = where + '/deleteUltiPitcherTable'

    const {tableOId} = dto

    try {
      const table = await this.ultiPitcherTableDBModel.findById(tableOId)
      if (!table) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      const leagueNum = table.leagueNum
      await this.ultiPitcherTableDBModel.findByIdAndDelete(tableOId)

      return {leagueNum}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateUltiPitcherTable(where: string, dto: DTO.DTO_UpdateUltiPitcherTable) {
    where = where + '/updateUltiPitcherTable'

    const {recordArr, tableOId} = dto

    try {
      const updatedTable = await this.ultiPitcherTableDBModel.findByIdAndUpdate(tableOId, {$set: {recordArr}}, {returnDocument: 'after'})
      if (!updatedTable) {
        throw {gkdErrMsg: `[${where}] table is not found. tableOId: ${tableOId}`, statusCode: 404}
      }

      return {pitcherTable: toUltiPitcherTableType(updatedTable)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readUltiPitcherTableArr(where: string, dto: DTO.DTO_ReadUltiPitcherTableArr) {
    where = where + '/readUltiPitcherTableArr'

    try {
      const tableArrDB = await this.ultiPitcherTableDBModel.find({leagueNum: dto.leagueNum}).sort({gameNum: -1})

      if (!tableArrDB) {
        return {pitcherTableArr: []}
      }

      const pitcherTableArr = tableArrDB.map(table => toUltiPitcherTableType(table))
      return {pitcherTableArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
