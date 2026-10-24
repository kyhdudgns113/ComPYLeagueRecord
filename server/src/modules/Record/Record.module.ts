import {Module} from '@nestjs/common'

import {DatabaseModule} from '../Database/database.module'
import {RecordController} from './Record.controller'
import {RecordService} from './Record.service'

@Module({
  imports: [DatabaseModule],
  controllers: [RecordController],
  providers: [RecordService],
  exports: [RecordService],
})
export class RecordModule {}
