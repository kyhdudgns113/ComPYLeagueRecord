import {Module} from '@nestjs/common'
import {RecordController} from './Record.controller'
import {RecordService} from './Record.service'
import {DatabaseModule} from '../Database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
