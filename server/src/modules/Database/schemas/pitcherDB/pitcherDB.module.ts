import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Pitcher, PitcherArr, PitcherArrSchema, PitcherSchema} from './pitcherDB.entity'
import {PitcherDBService} from './pitcherDB.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Pitcher.name, schema: PitcherSchema},
      {name: PitcherArr.name, schema: PitcherArrSchema},
    ]),
  ],
  providers: [PitcherDBService],
  exports: [PitcherDBService],
})
export class PitcherDBModule {}
