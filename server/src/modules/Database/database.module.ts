import {Module} from '@nestjs/common'
import {BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule} from './schemas'

@Module({
  imports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule],
  controllers: [],
  providers: [],
  exports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule, RecordDBModule],
})
export class DatabaseModule {}
