import {Body, Controller, Get, Post, Put} from '@nestjs/common'
import {SettingService} from './Setting.service'

import * as HTTP from '@httpType'

@Controller('/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get('/getLeagueArr')
  async getLeagueArr() {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.getLeagueArr()
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Get('/getBatter3DArrAll')
  async getBatter3DArrAll() {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.getBatter3DArrAll()
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Get('/getPitcher3DArrAll')
  async getPitcher3DArrAll() {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.getPitcher3DArrAll()
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addBatter')
  async addBatter(@Body() data: HTTP.HTTP_AddBatter) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.addBatter(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addLeague')
  async addLeague(@Body() data: HTTP.HTTP_AddLeague) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.addLeague(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addPitcher')
  async addPitcher(@Body() data: HTTP.HTTP_AddPitcher) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.addPitcher(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Put('/moveBatterInArr')
  async moveBatterInArr(@Body() data: HTTP.HTTP_MoveBatterInArr) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.moveBatterInArr(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Put('/movePitcherInArr')
  async movePitcherInArr(@Body() data: HTTP.HTTP_MovePitcherInArr) {
    const {ok, body, gkdErrMsg, statusCode} = await this.settingService.movePitcherInArr(data)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
