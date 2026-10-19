import {Injectable} from '@nestjs/common'
import {LeagueInfoDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class SettingService {
  constructor(private readonly leagueInfoDBService: LeagueInfoDBService) {}

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
}
