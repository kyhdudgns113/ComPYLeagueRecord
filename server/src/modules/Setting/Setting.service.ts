import {Injectable} from '@nestjs/common'
import {BatterDBService, LeagueInfoDBService, PitcherDBService, RecordDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class SettingService {
  constructor(
    private readonly batterDBService: BatterDBService,
    private readonly leagueInfoDBService: LeagueInfoDBService,
    private readonly pitcherDBService: PitcherDBService,
    private readonly recordDBService: RecordDBService
  ) {}

  // GET AREA:
  async getLeagueArr() {
    const where = '/setting/getLeagueArr'
    try {
      const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)

      return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return {ok: false, body: {}, gkdErrMsg: '', statusCode: 200}
    }
  }

  async getBatter3DArrAll() {
    const where = '/setting/getBatter3DArrAll'
    try {
      const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)
      const maxLeagueNum = Math.max(0, ...leagueArr.map(league => league.leagueNum))
      const {MainBatter3DArr, SubBatter3DArr} = await this.batterDBService.readBatter3DArrAll(where, {maxLeagueNum})

      return {ok: true, body: {MainBatter3DArr, SubBatter3DArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async getPitcher3DArrAll() {
    const where = '/setting/getPitcher3DArrAll'
    try {
      const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)
      const maxLeagueNum = Math.max(0, ...leagueArr.map(league => league.leagueNum))
      const {CP3DArr, RP3DArr, SP3DArr} = await this.pitcherDBService.readPitcher3DArrAll(where, {maxLeagueNum})

      return {ok: true, body: {CP3DArr, RP3DArr, SP3DArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // POST AREA:
  async addBatter(data: HTTP.HTTP_AddBatter) {
    const where = '/setting/addBatter'
    try {
      const dto: DTO.DTO_CreateBatter = {
        batterClass: data.batterClass,
        batterHand: data.batterHand,
        batterNum: data.batterNum,
        hasPressureSkill: data.hasPressureSkill,
        leagueNum: data.leagueNum,
        name: data.name,
        teamName: data.teamName,
      }

      await this.batterDBService.createBatter(where, dto)
      const {batterArr} = await this.batterDBService.readBatterArr(where, {
        batterClass: data.batterClass,
        leagueNum: data.leagueNum,
        teamName: data.teamName,
      })

      return {ok: true, body: {batterArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addLeague(data: HTTP.HTTP_AddLeague) {
    const where = '/setting/addLeague'
    try {
      const dto: DTO.DTO_CreateLeagueInfo = {
        description: data.description,
        leagueNum: data.leagueNum,
      }

      await this.leagueInfoDBService.createLeagueInfo(where, dto)
      await this.batterDBService.createDummyBatters(where, data.leagueNum)
      await this.pitcherDBService.createDummyPitchers(where, data.leagueNum)

      const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)
      const {MainBatter3DArr, SubBatter3DArr} = await this.batterDBService.readBatter3DArrAll(where, {maxLeagueNum: data.leagueNum})
      const {CP3DArr, RP3DArr, SP3DArr} = await this.pitcherDBService.readPitcher3DArrAll(where, {maxLeagueNum: data.leagueNum})

      return {ok: true, body: {CP3DArr, leagueArr, MainBatter3DArr, RP3DArr, SP3DArr, SubBatter3DArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async addPitcher(data: HTTP.HTTP_AddPitcher) {
    const where = '/setting/addPitcher'
    try {
      const dto: DTO.DTO_CreatePitcher = {
        leagueNum: data.leagueNum,
        name: data.name,
        pitcherHand: data.pitcherHand,
        pitcherType: data.pitcherType,
        teamName: data.teamName,
      }

      await this.pitcherDBService.createPitcher(where, dto)
      const {pitcherArr} = await this.pitcherDBService.readPitcherArr(where, {
        leagueNum: data.leagueNum,
        pitcherType: data.pitcherType,
        teamName: data.teamName,
      })

      return {ok: true, body: {pitcherArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:
  async modifyBatter(data: HTTP.HTTP_ModifyBatter) {
    const where = '/setting/modifyBatter'
    try {
      const dto: DTO.DTO_UpdateBatter = {
        batterHand: data.batterHand,
        batterOId: data.batterOId,
        hasPressureSkill: data.hasPressureSkill,
        name: data.name,
      }

      const {batter: prevBatter} = await this.batterDBService.readBatterByOId(where, data.batterOId)
      const {batter} = await this.batterDBService.updateBatter(where, dto)
      const {batterArr} = await this.batterDBService.readBatterArr(where, {
        batterClass: batter.batterClass,
        leagueNum: batter.leagueNum,
        teamName: batter.teamName,
      })

      const {gameArr} = await this.leagueInfoDBService.readGameInfoArr(where, {
        enemyTeam: batter.teamName,
        leagueNum: batter.leagueNum,
      })
      await this.recordDBService.updateBatterInfoInRecordArr(where, {
        batterClass: batter.batterClass,
        batterHand: batter.batterHand,
        batterName: batter.name,
        batterOId: batter.batterOId,
        gameNumArr: gameArr.map(game => game.gameNum),
        hasPressure: batter.hasPressureSkill,
        leagueNum: batter.leagueNum,
        prevName: prevBatter.name,
      })

      return {ok: true, body: {batterArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async modifyPitcher(data: HTTP.HTTP_ModifyPitcher) {
    const where = '/setting/modifyPitcher'
    try {
      const dto: DTO.DTO_UpdatePitcher = {
        name: data.name,
        pitcherHand: data.pitcherHand,
        pitcherOId: data.pitcherOId,
      }

      const {pitcher} = await this.pitcherDBService.updatePitcher(where, dto)
      const {pitcherArr} = await this.pitcherDBService.readPitcherArr(where, {
        leagueNum: pitcher.leagueNum,
        pitcherType: pitcher.pitcherType,
        teamName: pitcher.teamName,
      })

      return {ok: true, body: {pitcherArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async moveBatterInArr(data: HTTP.HTTP_MoveBatterInArr) {
    const where = '/setting/moveBatterInArr'
    try {
      const dto: DTO.DTO_MoveBatterInArr = {
        batterClass: data.batterClass,
        batterOId: data.batterOId,
        leagueNum: data.leagueNum,
        targetBatterClass: data.targetBatterClass,
        targetIdx: data.targetIdx,
        teamName: data.teamName,
      }

      await this.batterDBService.updateBatterInArr(where, dto)

      const readDto = {leagueNum: data.leagueNum, teamName: data.teamName}
      const {batterArr: MainBatterArr} = await this.batterDBService.readBatterArr(where, {...readDto, batterClass: '선발'})
      const {batterArr: SubBatterArr} = await this.batterDBService.readBatterArr(where, {...readDto, batterClass: '후보'})

      return {ok: true, body: {MainBatterArr, SubBatterArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  async movePitcherInArr(data: HTTP.HTTP_MovePitcherInArr) {
    const where = '/setting/movePitcherInArr'
    try {
      const dto: DTO.DTO_MovePitcherInArr = {
        leagueNum: data.leagueNum,
        pitcherOId: data.pitcherOId,
        pitcherType: data.pitcherType,
        targetIdx: data.targetIdx,
        targetPitcherType: data.targetPitcherType,
        teamName: data.teamName,
      }

      await this.pitcherDBService.updatePitcherInArr(where, dto)

      const readDto = {leagueNum: data.leagueNum, teamName: data.teamName}
      const {pitcherArr: SPArr} = await this.pitcherDBService.readPitcherArr(where, {...readDto, pitcherType: '선발'})
      const {pitcherArr: RPArr} = await this.pitcherDBService.readPitcherArr(where, {...readDto, pitcherType: '중계'})
      const {pitcherArr: CPArr} = await this.pitcherDBService.readPitcherArr(where, {...readDto, pitcherType: '마무리'})

      return {ok: true, body: {CPArr, RPArr, SPArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
