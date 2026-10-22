import {Injectable} from '@nestjs/common'
import {UltiLeagueInfoDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class UltimateService {
  constructor(private readonly ultiLeagueInfoDBService: UltiLeagueInfoDBService) {}

  // GET AREA:
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

  // POST AREA:
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
}
