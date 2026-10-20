import {Module} from '@nestjs/common'
import {MongooseModule} from '@nestjs/mongoose'
import {RecordArr, RecordArrSchema} from './recordDB.entity'
import {RecordDBService} from './recordDB.service'

@Module({
  imports: [MongooseModule.forFeature([{name: RecordArr.name, schema: RecordArrSchema}])],
  providers: [RecordDBService],
  exports: [RecordDBService],
})
export class RecordDBModule {}
