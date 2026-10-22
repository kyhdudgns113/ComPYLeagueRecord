import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common'
import {UltimateService} from './Ultimate.service'

import * as HTTP from '@httpType'

@Controller('/ultimate')
export class UltimateController {
  constructor(private readonly ultimateService: UltimateService) {}

  @Get('/getBatterTableArr/:leagueNum')
  async getBatterTableArr(@Param('leagueNum') leagueNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.getBatterTableArr(leagueNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Get('/getLeagueArr')
  async getLeagueArr() {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.getLeagueArr()
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Get('/getPitcherTableArr/:leagueNum')
  async getPitcherTableArr(@Param('leagueNum') leagueNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.getPitcherTableArr(leagueNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addBatterTable')
  async addBatterTable(@Body() data: HTTP.HTTP_AddUltiBatterTable) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.addBatterTable(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addLeague')
  async addLeague(@Body() data: HTTP.HTTP_AddUltiLeague) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.addLeague(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addPitcherRecord')
  async addPitcherRecord(@Body() data: HTTP.HTTP_AddUltiPitcherRecord) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.addPitcherRecord(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Post('/addPitcherTable')
  async addPitcherTable(@Body() data: HTTP.HTTP_AddUltiPitcherTable) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.addPitcherTable(data)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Delete('/deleteLeague/:leagueNum')
  async deleteLeague(@Param('leagueNum') leagueNum: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.deleteLeague(leagueNum)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Delete('/deletePitcherTable/:tableOId')
  async deletePitcherTable(@Param('tableOId') tableOId: string) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.deletePitcherTable(tableOId)
    return {ok, body, gkdErrMsg, statusCode}
  }

  @Put('/updatePitcherTable')
  async updatePitcherTable(@Body() data: HTTP.HTTP_UpdateUltiPitcherTable) {
    const {ok, body, gkdErrMsg, statusCode} = await this.ultimateService.updatePitcherTable(data)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
