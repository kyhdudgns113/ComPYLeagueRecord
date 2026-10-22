import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {UltiPitcherTable, UltiPitcherTableSchema} from './ultiPitcherTableDB.entity'
import {UltiPitcherTableDBService} from './ultiPitcherTableDB.service'

@Module({
  imports: [MongooseModule.forFeature([{name: UltiPitcherTable.name, schema: UltiPitcherTableSchema}])],
  providers: [UltiPitcherTableDBService],
  exports: [UltiPitcherTableDBService],
})
export class UltiPitcherTableDBModule {}
