import {Body, Controller, Get, Headers, Param, Post} from '@nestjs/common'

import {CopyMeService} from './CopyMe.service'

@Controller('/copyMe')
export class CopyMeController {
  constructor(private readonly copyMeService: CopyMeService) {}

  @Get('/copyGet/:testArg')
  async copyGet(@Param('testArg') testArg: any) {
    const {ok, body, gkdErrMsg, statusCode} = await this.copyMeService.copyMeGet(testArg)
    return {ok, body, gkdErrMsg, statusCode}
  }
}
