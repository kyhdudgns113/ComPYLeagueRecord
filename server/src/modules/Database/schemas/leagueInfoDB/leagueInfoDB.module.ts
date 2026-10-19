import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {LeagueInfo, LeagueInfoSchema} from './leagueInfoDB.entity'
import {LeagueInfoDBService} from './leagueInfoDB.service'

@Module({
  imports: [MongooseModule.forFeature([{name: LeagueInfo.name, schema: LeagueInfoSchema}])],
  providers: [LeagueInfoDBService],
  exports: [LeagueInfoDBService],
})
export class LeagueInfoDBModule {}
