import {Module} from '@nestjs/common'

import {DatabaseModule} from '../Database/database.module'
import {UltimateController} from './Ultimate.controller'
import {UltimateService} from './Ultimate.service'

@Module({
  imports: [DatabaseModule],
  controllers: [UltimateController],
  providers: [UltimateService],
  exports: [UltimateService],
})
export class UltimateModule {}
