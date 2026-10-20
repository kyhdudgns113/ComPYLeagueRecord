import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {Batter, BatterArr, BatterArrSchema, BatterSchema} from './batterDB.entity'
import {BatterDBService} from './batterDB.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Batter.name, schema: BatterSchema},
      {name: BatterArr.name, schema: BatterArrSchema},
    ]),
  ],
  providers: [BatterDBService],
  exports: [BatterDBService],
})
export class BatterDBModule {}
