import {Injectable} from '@nestjs/common'
import {LeagueInfoDBService, PitcherDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class SettingService {
  constructor(
    private readonly leagueInfoDBService: LeagueInfoDBService,
    private readonly pitcherDBService: PitcherDBService
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
  async addLeague(data: HTTP.HTTP_AddLeague) {
    const where = '/setting/addLeague'
    try {
      const dto: DTO.DTO_CreateLeagueInfo = {
        description: data.description,
        leagueNum: data.leagueNum,
      }

      await this.leagueInfoDBService.createLeagueInfo(where, dto)
      const {leagueArr} = await this.leagueInfoDBService.readLeagueInfoArr(where)

      return {ok: true, body: {leagueArr}, gkdErrMsg: '', statusCode: 200}
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
}
