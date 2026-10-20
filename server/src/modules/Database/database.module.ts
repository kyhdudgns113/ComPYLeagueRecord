import {Module} from '@nestjs/common'
import {BatterDBModule, LeagueInfoDBModule, PitcherDBModule} from './schemas'

@Module({
  imports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule],
  controllers: [],
  providers: [],
  exports: [BatterDBModule, LeagueInfoDBModule, PitcherDBModule],
})
export class DatabaseModule {}
