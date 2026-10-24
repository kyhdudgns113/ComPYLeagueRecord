import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {GameInfo, LeagueInfo} from './leagueInfoDB.entity'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toGameInfoType = (game: GameInfo): OT.GameInfoType => {
  return {
    enemyTeam: game.enemyTeam,
    gameNum: game.gameNum,
    leagueNum: game.leagueNum,
    SPName: game.SPName,
  }
}

@Injectable()
export class LeagueInfoDBService {
  constructor(
    @InjectModel(GameInfo.name) private gameInfoDBModel: Model<GameInfo>,
    @InjectModel(LeagueInfo.name) private leagueInfoDBModel: Model<LeagueInfo>
  ) {}

  async createGameInfo(where: string, dto: DTO.DTO_CreateGameInfo) {
    where = where + '/createGameInfo'

    const {enemyTeam, gameNum, leagueNum, SPName} = dto

    try {
      if (gameNum < 1 || gameNum > 144) {
        throw {gkdErrMsg: `[${where}] gameNum 은 1~144 이어야 합니다. gameNum: ${gameNum}`, statusCode: 400}
      }

      const newGame = new this.gameInfoDBModel({enemyTeam, gameNum, leagueNum, SPName})
      await newGame.save()

      return {game: toGameInfoType(newGame)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async createLeagueInfo(where: string, dto: DTO.DTO_CreateLeagueInfo) {
    where = where + '/createLeagueInfo'

    const {description, leagueNum} = dto

    try {
      const newLeague = new this.leagueInfoDBModel({description, leagueNum})
      await newLeague.save()
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteGameInfo(where: string, dto: DTO.DTO_DeleteGameInfo) {
    where = where + '/deleteGameInfo'

    const {gameNum, leagueNum} = dto

    try {
      const deletedGame = await this.gameInfoDBModel.findOneAndDelete({gameNum, leagueNum})
      if (!deletedGame) {
        throw {gkdErrMsg: `[${where}] game is not found. leagueNum: ${leagueNum}, gameNum: ${gameNum}`, statusCode: 404}
      }

      return {game: toGameInfoType(deletedGame)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readGameInfoArr(where: string, dto: DTO.DTO_ReadGameInfoArr) {
    where = where + '/readGameInfoArr'

    try {
      const filter: any = {}
      if (dto.leagueNum !== undefined) {
        filter.leagueNum = dto.leagueNum
      }
      if (dto.gameNum !== undefined) {
        filter.gameNum = dto.gameNum
      }
      if (dto.enemyTeam) {
        filter.enemyTeam = dto.enemyTeam
      }
      if (dto.SPName) {
        filter.SPName = dto.SPName
      }

      const gameArrDB = await this.gameInfoDBModel.find(filter).sort({gameNum: 1})

      if (!gameArrDB) {
        return {gameArr: []}
      }

      const gameArr = gameArrDB.map(game => toGameInfoType(game))
      return {gameArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readLeagueInfoArr(where: string) {
    where = where + '/readLeagueInfoArr'

    try {
      const leagueArrDB = await this.leagueInfoDBModel.find().sort({leagueNum: -1})

      if (!leagueArrDB) {
        return {leagueArr: []}
      }

      const leagueArr = leagueArrDB.map(league => {
        const ret: OT.LeagueInfoType = {
          description: league.description,
          leagueNum: league.leagueNum,
          createdAtNum: league.createdAt.valueOf(),
        }
        return ret
      })

      return {leagueArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateLeagueInfo(where: string, dto: DTO.DTO_UpdateLeagueInfo) {
    where = where + '/updateLeagueInfo'

    const {leagueNum, league} = dto
    const {description} = league

    try {
      const updateResult = await this.leagueInfoDBModel.updateOne({leagueNum}, {$set: {description}})

      if (updateResult.modifiedCount === 0) {
        console.log(`[${where}] 수정이 되지 않았어요`)
      }
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
