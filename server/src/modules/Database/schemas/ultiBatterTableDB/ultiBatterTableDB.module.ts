import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'

import {UltiBatterTable, UltiBatterTableSchema} from './ultiBatterTableDB.entity'
import {UltiBatterTableDBService} from './ultiBatterTableDB.service'

@Module({
  imports: [MongooseModule.forFeature([{name: UltiBatterTable.name, schema: UltiBatterTableSchema}])],
  providers: [UltiBatterTableDBService],
  exports: [UltiBatterTableDBService],
})
export class UltiBatterTableDBModule {}
