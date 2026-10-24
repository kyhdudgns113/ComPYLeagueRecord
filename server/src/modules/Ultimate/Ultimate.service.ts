import {Injectable} from '@nestjs/common'

import {UltiBatterTableDBService, UltiLeagueInfoDBService, UltiPitcherTableDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class UltimateService {
  constructor(
    private readonly ultiBatterTableDBService: UltiBatterTableDBService,
    private readonly ultiLeagueInfoDBService: UltiLeagueInfoDBService,
    private readonly ultiPitcherTableDBService: UltiPitcherTableDBService
  ) {}

  // GET AREA:
  async getBatterTableArr(leagueNumRaw: string) {
    const where = '/ultimate/getBatterTableArr'
    try {
      const leagueNum = parseInt(leagueNumRaw)
      if (isNaN(leagueNum)) {
        throw {gkdErrMsg: `[${where}] leagueNum is invalid: ${leagueNumRaw}`, statusCode: 400}
      }

      const {batterTableArr} = await this.ultiBatterTableDBService.readUltiBatterTableArr(where, {leagueNum})

      return {ok: true, body: {batterTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async getLeagueArr() {
    const where = '/ultimate/getLeagueArr'
    try {
      const {leagueArr} = await this.ultiLeagueInfoDBService.readUltiLeagueInfoArr(where)

      return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async getPitcherTableArr(leagueNumRaw: string) {
    const where = '/ultimate/getPitcherTableArr'
    try {
      const leagueNum = parseInt(leagueNumRaw)
      if (isNaN(leagueNum)) {
        throw {gkdErrMsg: `[${where}] leagueNum is invalid: ${leagueNumRaw}`, statusCode: 400}
      }

      const {pitcherTableArr} = await this.ultiPitcherTableDBService.readUltiPitcherTableArr(where, {leagueNum})

      return {ok: true, body: {pitcherTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // POST AREA:
  async addBatterRecord(data: HTTP.HTTP_AddUltiBatterRecord) {
    const where = '/ultimate/addBatterRecord'
    try {
      const name = data.name.trim()
      if (!name) {
        throw {gkdErrMsg: `[${where}] name is empty`, statusCode: 400}
      }

      const dto: DTO.DTO_AddUltiBatterRecord = {
        name,
        tableOId: data.tableOId,
      }

      const {batterTable} = await this.ultiBatterTableDBService.addUltiBatterRecord(where, dto)
      const {batterTableArr} = await this.ultiBatterTableDBService.readUltiBatterTableArr(where, {leagueNum: batterTable.leagueNum})

      return {ok: true, body: {batterTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addBatterTable(data: HTTP.HTTP_AddUltiBatterTable) {
    const where = '/ultimate/addBatterTable'
    try {
      const dto: DTO.DTO_CreateUltiBatterTable = {
        gameNum: data.gameNum,
        leagueNum: data.leagueNum,
      }

      await this.ultiBatterTableDBService.createUltiBatterTable(where, dto)
      const {batterTableArr} = await this.ultiBatterTableDBService.readUltiBatterTableArr(where, {leagueNum: data.leagueNum})

      return {ok: true, body: {batterTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addLeague(data: HTTP.HTTP_AddUltiLeague) {
    const where = '/ultimate/addLeague'
    try {
      const dto: DTO.DTO_CreateUltiLeagueInfo = {
        description: data.description,
        leagueNum: data.leagueNum,
      }

      await this.ultiLeagueInfoDBService.createUltiLeagueInfo(where, dto)
      const {leagueArr} = await this.ultiLeagueInfoDBService.readUltiLeagueInfoArr(where)

      return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addPitcherRecord(data: HTTP.HTTP_AddUltiPitcherRecord) {
    const where = '/ultimate/addPitcherRecord'
    try {
      const name = data.name.trim()
      if (!name) {
        throw {gkdErrMsg: `[${where}] name is empty`, statusCode: 400}
      }

      const dto: DTO.DTO_AddUltiPitcherRecord = {
        name,
        tableOId: data.tableOId,
      }

      const {pitcherTable} = await this.ultiPitcherTableDBService.addUltiPitcherRecord(where, dto)
      const {pitcherTableArr} = await this.ultiPitcherTableDBService.readUltiPitcherTableArr(where, {leagueNum: pitcherTable.leagueNum})

      return {ok: true, body: {pitcherTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async updateBatterTable(data: HTTP.HTTP_UpdateUltiBatterTable) {
    const where = '/ultimate/updateBatterTable'
    try {
      if (!data.tableOId) {
        throw {gkdErrMsg: `[${where}] tableOId is empty`, statusCode: 400}
      }
      if (!data.recordArr) {
        throw {gkdErrMsg: `[${where}] recordArr is falsy`, statusCode: 400}
      }

      const dto: DTO.DTO_UpdateUltiBatterTable = {
        recordArr: data.recordArr,
        tableOId: data.tableOId,
      }

      const {batterTable} = await this.ultiBatterTableDBService.updateUltiBatterTable(where, dto)
      const {batterTableArr} = await this.ultiBatterTableDBService.readUltiBatterTableArr(where, {leagueNum: batterTable.leagueNum})

      return {ok: true, body: {batterTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async updatePitcherTable(data: HTTP.HTTP_UpdateUltiPitcherTable) {
    const where = '/ultimate/updatePitcherTable'
    try {
      if (!data.tableOId) {
        throw {gkdErrMsg: `[${where}] tableOId is empty`, statusCode: 400}
      }
      if (!data.recordArr) {
        throw {gkdErrMsg: `[${where}] recordArr is falsy`, statusCode: 400}
      }

      const dto: DTO.DTO_UpdateUltiPitcherTable = {
        recordArr: data.recordArr,
        tableOId: data.tableOId,
      }

      const {pitcherTable} = await this.ultiPitcherTableDBService.updateUltiPitcherTable(where, dto)
      const {pitcherTableArr} = await this.ultiPitcherTableDBService.readUltiPitcherTableArr(where, {leagueNum: pitcherTable.leagueNum})

      return {ok: true, body: {pitcherTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async deleteLeague(leagueNumRaw: string) {
    const where = '/ultimate/deleteLeague'
    try {
      const leagueNum = parseInt(leagueNumRaw)
      if (isNaN(leagueNum)) {
        throw {gkdErrMsg: `[${where}] leagueNum is invalid: ${leagueNumRaw}`, statusCode: 400}
      }

      const dto: DTO.DTO_DeleteUltiLeague = {leagueNum}
      await this.ultiPitcherTableDBService.deleteUltiPitcherTableArrByLeagueNum(where, leagueNum)
      await this.ultiBatterTableDBService.deleteUltiBatterTableArrByLeagueNum(where, leagueNum)
      await this.ultiLeagueInfoDBService.deleteUltiLeagueInfo(where, dto)
      const {leagueArr} = await this.ultiLeagueInfoDBService.readUltiLeagueInfoArr(where)

      return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async deleteBatterTable(tableOId: string) {
    const where = '/ultimate/deleteBatterTable'
    try {
      if (!tableOId) {
        throw {gkdErrMsg: `[${where}] tableOId is empty`, statusCode: 400}
      }

      const dto: DTO.DTO_DeleteUltiBatterTable = {tableOId}
      const {leagueNum} = await this.ultiBatterTableDBService.deleteUltiBatterTable(where, dto)
      const {batterTableArr} = await this.ultiBatterTableDBService.readUltiBatterTableArr(where, {leagueNum})

      return {ok: true, body: {batterTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async deletePitcherTable(tableOId: string) {
    const where = '/ultimate/deletePitcherTable'
    try {
      if (!tableOId) {
        throw {gkdErrMsg: `[${where}] tableOId is empty`, statusCode: 400}
      }

      const dto: DTO.DTO_DeleteUltiPitcherTable = {tableOId}
      const {leagueNum} = await this.ultiPitcherTableDBService.deleteUltiPitcherTable(where, dto)
      const {pitcherTableArr} = await this.ultiPitcherTableDBService.readUltiPitcherTableArr(where, {leagueNum})

      return {ok: true, body: {pitcherTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addPitcherTable(data: HTTP.HTTP_AddUltiPitcherTable) {
    const where = '/ultimate/addPitcherTable'
    try {
      const dto: DTO.DTO_CreateUltiPitcherTable = {
        gameNum: data.gameNum,
        leagueNum: data.leagueNum,
      }

      await this.ultiPitcherTableDBService.createUltiPitcherTable(where, dto)
      const {pitcherTableArr} = await this.ultiPitcherTableDBService.readUltiPitcherTableArr(where, {leagueNum: data.leagueNum})

      return {ok: true, body: {pitcherTableArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
