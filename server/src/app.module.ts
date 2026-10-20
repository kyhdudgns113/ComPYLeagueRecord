import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import * as M from './modules'
import * as S from '@secret'

@Module({
  imports: [
    // ::
    M.DatabaseModule,
    M.RecordModule,
    M.SettingModule,

    MongooseModule.forRoot(S.mongoDBUrl),
  ],
})
export class AppModule {}
