import {Module} from '@nestjs/common'
import {LeagueInfoDBModule} from './schemas'

@Module({
  imports: [LeagueInfoDBModule],
  controllers: [],
  providers: [],
  exports: [LeagueInfoDBModule],
})
export class DatabaseModule {}
