import {Injectable} from '@nestjs/common'
import {LeagueInfoDBService} from '../Database'

@Injectable()
export class SettingService {
  constructor(private readonly leagueInfoDBService: LeagueInfoDBService) {}

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
}
