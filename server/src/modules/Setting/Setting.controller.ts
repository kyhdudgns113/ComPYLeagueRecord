import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'
import {SettingService} from './Setting.service'

@Controller('/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('/copyGet/:testArg')
  async copyGet(@Param('testArg') testArg: any) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.copyMeGet(testArg)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
