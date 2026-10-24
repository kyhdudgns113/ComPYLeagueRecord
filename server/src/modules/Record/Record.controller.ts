import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common'

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

  @Get('/getRecordArr/:leagueNum/:gameNum')
  async getRecordArr(@Param('leagueNum') leagueNum: string, @Param('gameNum') gameNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.getRecordArr(leagueNum, gameNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addGame')
  async addGame(@Body() data: HTTP.HTTP_AddGame) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.addGame(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Delete('/deleteGame/:leagueNum/:gameNum')
  async deleteGame(@Param('leagueNum') leagueNum: string, @Param('gameNum') gameNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.deleteGame(leagueNum, gameNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Put('/updateRecord')
  async updateRecord(@Body() data: HTTP.HTTP_UpdateRecord) {
    const {ok, body, gkdErrMsg, statusCode} = await this.recordService.updateRecord(data)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
