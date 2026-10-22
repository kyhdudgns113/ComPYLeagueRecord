import {Module} from '@nestjs/common'
import {UltimateController} from './Ultimate.controller'
import {UltimateService} from './Ultimate.service'
import {DatabaseModule} from '../Database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UltimateController],
  providers: [UltimateService],
  exports: [UltimateService],
})
export class UltimateModule {}
