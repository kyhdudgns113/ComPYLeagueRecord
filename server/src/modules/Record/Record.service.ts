import {Injectable} from '@nestjs/common'
import {LeagueInfoDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as U from '@util'

@Injectable()
export class RecordService {
  constructor(private readonly leagueInfoDBService: LeagueInfoDBService) {}

  // GET AREA:
  async getGameArr(leagueNumRaw: string) {
    const where = '/record/getGameArr'
    try {
      const leagueNum = parseInt(leagueNumRaw)
      if (isNaN(leagueNum)) {
        throw {gkdErrMsg: `[${where}] leagueNum is invalid: ${leagueNumRaw}`, statusCode: 400}
      }

      const {gameArr} = await this.leagueInfoDBService.readGameInfoArr(where, {leagueNum})

      return {ok: true, body: {gameArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // POST AREA:
  async addGame(data: HTTP.HTTP_AddGame) {
    const where = '/record/addGame'
    try {
      const {arrLen, leagueNum, SPName, teamName} = data
      const gameNum = arrLen + 1

      const {gameArr: prevGameArr} = await this.leagueInfoDBService.readGameInfoArr(where, {leagueNum})
      if (prevGameArr.length !== arrLen) {
        throw {
          gkdErrMsg: `[${where}] 게임 개수가 맞지 않습니다. arrLen: ${arrLen}, length: ${prevGameArr.length}`,
          statusCode: 400,
        }
      }

      const dto: DTO.DTO_CreateGameInfo = {
        enemyTeam: teamName,
        gameNum,
        leagueNum,
        SPName,
      }

      await this.leagueInfoDBService.createGameInfo(where, dto)
      const {gameArr} = await this.leagueInfoDBService.readGameInfoArr(where, {leagueNum})

      return {ok: true, body: {gameArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
