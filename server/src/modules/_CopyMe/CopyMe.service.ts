import {Injectable} from '@nestjs/common'

@Injectable()
export class CopyMeService {
  constructor() {}

  async copyMeGet(testArg: any) {
    try {
      return {ok: true, body: {}, gkdErrMsg: '', statusCode: 200}
      // ::
    } catch (errObj) {
      // ::
      return {ok: false, body: {}, gkdErrMsg: '', statusCode: 200}
    }
  }
}
