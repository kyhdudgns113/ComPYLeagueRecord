import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {RecordService} from './Record.service'

import * as HTTP from '@httpType'

@Controller('/record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get('/getGameArr/:leagueNum')
  async getGameArr(@Param('leagueNum') leagueNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.getGameArr(leagueNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addGame')
  async addGame(@Body() data: HTTP.HTTP_AddGame) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.addGame(data)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
