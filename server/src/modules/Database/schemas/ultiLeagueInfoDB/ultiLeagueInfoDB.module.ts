import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {UltiLeagueInfo, UltiLeagueInfoSchema} from './ultiLeagueInfoDB.entity'
import {UltiLeagueInfoDBService} from './ultiLeagueInfoDB.service'

@Module({
  imports: [MongooseModule.forFeature([{name: UltiLeagueInfo.name, schema: UltiLeagueInfoSchema}])],
  providers: [UltiLeagueInfoDBService],
  exports: [UltiLeagueInfoDBService],
})
export class UltiLeagueInfoDBModule {}
