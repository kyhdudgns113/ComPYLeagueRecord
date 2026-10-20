import {Injectable} from '@nestjs/common'
import {BatterDBService, LeagueInfoDBService, RecordDBService} from '../Database'

import * as DTO from '@dtoType'
import * as HTTP from '@httpType'
import * as OT from '@objectTye'
import * as U from '@util'

@Injectable()
export class RecordService {
  constructor(
    private readonly batterDBService: BatterDBService,
    private readonly leagueInfoDBService: LeagueInfoDBService,
    private readonly recordDBService: RecordDBService
  ) {}

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

  async getRecordArr(leagueNumRaw: string, gameNumRaw: string) {
    const where = '/record/getRecordArr'
    try {
      const leagueNum = parseInt(leagueNumRaw)
      const gameNum = parseInt(gameNumRaw)
      if (isNaN(leagueNum) || isNaN(gameNum)) {
        throw {
          gkdErrMsg: `[${where}] leagueNum or gameNum is invalid: ${leagueNumRaw}, ${gameNumRaw}`,
          statusCode: 400,
        }
      }

      const {recordArr} = await this.recordDBService.readRecordArr(where, {gameNum, leagueNum})

      return {ok: true, body: {recordArr}, gkdErrMsg: '', statusCode: 200}
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

      const {batterArr} = await this.batterDBService.readBatterArr(where, {
        batterClass: '선발',
        leagueNum,
        teamName,
      })

      const recordArr: OT.RecordElementType[] = []
      Array.from({length: 9}, (_, orderIdx) => {
        const order = orderIdx + 1
        const batter = batterArr[orderIdx] || null

        Array.from({length: 6}, (_, rotationIdx) => {
          recordArr.push({
            batterClass: batter?.batterClass || '선발',
            batterHand: batter?.batterHand || '우타',
            batterName: batter?.name || '',
            batterOId: batter?.batterOId || '',
            gameNum,
            hasPressure: batter?.hasPressureSkill || false,
            isStealFail: false,
            leagueNum,
            order,
            pitchArr: [],
            pitcherName: SPName,
            result: null,
            rotation: rotationIdx + 1,
          })
        })
      })

      await this.recordDBService.createRecordArr(where, {gameNum, leagueNum, recordArr})
      const {gameArr} = await this.leagueInfoDBService.readGameInfoArr(where, {leagueNum})

      return {ok: true, body: {gameArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }

  // PUT AREA:
  async updateRecord(data: HTTP.HTTP_UpdateRecord) {
    const where = '/record/updateRecord'
    try {
      const {gameNum, leagueNum, order, record, rotation} = data
      const {recordArr} = await this.recordDBService.updateRecord(where, {gameNum, leagueNum, order, record, rotation})

      return {ok: true, body: {recordArr}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return U.getFailResponse(errObj)
    }
  }
}
