import {Module} from '@nestjs/common'
import {
  BatterDBModule,
  LeagueInfoDBModule,
  PitcherDBModule,
  RecordDBModule,
  UltiBatterTableDBModule,
  UltiLeagueInfoDBModule,
  UltiPitcherTableDBModule,
} from './schemas'

@Module({
  imports: [
    BatterDBModule,
    LeagueInfoDBModule,
    PitcherDBModule,
    RecordDBModule,
    UltiBatterTableDBModule,
    UltiLeagueInfoDBModule,
    UltiPitcherTableDBModule,
  ],
  controllers: [],
  providers: [],
  exports: [
    BatterDBModule,
    LeagueInfoDBModule,
    PitcherDBModule,
    RecordDBModule,
    UltiBatterTableDBModule,
    UltiLeagueInfoDBModule,
    UltiPitcherTableDBModule,
  ],
})
export class DatabaseModule {}
