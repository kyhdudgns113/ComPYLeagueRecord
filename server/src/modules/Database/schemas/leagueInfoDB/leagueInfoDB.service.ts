import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {LeagueInfo} from './leagueInfoDB.entity'
import {Model} from 'mongoose'

@Injectable()
export class LeagueInfoDBService {
  constructor(@InjectModel(LeagueInfo.name) private leagueInfoDBModel: Model<LeagueInfo>) {}

  async copyMePost(copyData: any) {
    return 'CopyMe'
  }

  async copyMeGet() {
    return 'CopyMe'
  }

  async copyMeEtc() {
    return 'CopyMe'
  }
}
