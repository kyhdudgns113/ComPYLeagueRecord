import {Module} from '@nestjs/common'
import {LeagueInfoDBModule, PitcherDBModule} from './schemas'

@Module({
  imports: [LeagueInfoDBModule, PitcherDBModule],
  controllers: [],
  providers: [],
  exports: [LeagueInfoDBModule, PitcherDBModule],
})
export class DatabaseModule {}
