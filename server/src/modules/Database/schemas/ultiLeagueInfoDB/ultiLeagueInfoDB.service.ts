import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {UltiLeagueInfo} from './ultiLeagueInfoDB.entity'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'

const toUltiLeagueInfoType = (league: UltiLeagueInfo): OT.UltiLeagueInfoType => {
  return {
    createdAtNum: league.createdAt.valueOf(),
    description: league.description,
    leagueNum: league.leagueNum,
  }
}

@Injectable()
export class UltiLeagueInfoDBService {
  constructor(@InjectModel(UltiLeagueInfo.name) private ultiLeagueInfoDBModel: Model<UltiLeagueInfo>) {}

  async createUltiLeagueInfo(where: string, dto: DTO.DTO_CreateUltiLeagueInfo) {
    where = where + '/createUltiLeagueInfo'

    const {description, leagueNum} = dto

    try {
      const newLeague = new this.ultiLeagueInfoDBModel({description, leagueNum})
      await newLeague.save()

      return {league: toUltiLeagueInfoType(newLeague)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async deleteUltiLeagueInfo(where: string, dto: DTO.DTO_DeleteUltiLeague) {
    where = where + '/deleteUltiLeagueInfo'

    const {leagueNum} = dto

    try {
      const deletedLeague = await this.ultiLeagueInfoDBModel.findOneAndDelete({leagueNum})
      if (!deletedLeague) {
        throw {gkdErrMsg: `[${where}] league is not found. leagueNum: ${leagueNum}`, statusCode: 404}
      }

      return {league: toUltiLeagueInfoType(deletedLeague)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readUltiLeagueInfoArr(where: string) {
    where = where + '/readUltiLeagueInfoArr'

    try {
      const leagueArrDB = await this.ultiLeagueInfoDBModel.find().sort({leagueNum: -1})

      if (!leagueArrDB) {
        return {leagueArr: []}
      }

      const leagueArr = leagueArrDB.map(league => toUltiLeagueInfoType(league))
      return {leagueArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
