import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'
import {SettingService} from './Setting.service'

@Controller('/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('/getLeagueArr')
  async getLeagueArr() {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.getLeagueArr()
    return {ok, body, gkdErrMsg, statusCode}
  }
}
