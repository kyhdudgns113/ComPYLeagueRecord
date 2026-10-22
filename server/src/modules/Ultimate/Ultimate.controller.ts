import {Body, Controller, Get, Post} from '@nestjs/common'
import {UltimateService} from './Ultimate.service'

import * as HTTP from '@httpType'

@Controller('/ultimate')
export class UltimateController {
  constructor(private readonly ultimateService: UltimateService) {}

  @Get('/getLeagueArr')
  async getLeagueArr() {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.getLeagueArr()
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addLeague')
  async addLeague(@Body() data: HTTP.HTTP_AddUltiLeague) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.addLeague(data)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
