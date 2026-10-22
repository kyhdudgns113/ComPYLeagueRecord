import {Module} from '@nestjs/common'
import {BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule, UltiLeagueInfoDBModule} from './schemas'

@Module({
  imports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule, UltiLeagueInfoDBModule],
  controllers: [],
  providers: [],
  exports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule, UltiLeagueInfoDBModule],
})
export class DatabaseModule {}
