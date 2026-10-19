import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {LeagueInfo} from './leagueInfoDB.entity'
import {Model} from 'mongoose'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

@Injectable()
export class LeagueInfoDBService {
  constructor(@InjectModel(LeagueInfo.name) private leagueInfoDBModel: Model<LeagueInfo>) {}

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
