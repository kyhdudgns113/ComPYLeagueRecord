import {Module} from '@nestjs/common'

import {DatabaseModule} from '../Database/database.module'
import {SettingController} from './Setting.controller'
import {SettingService} from './Setting.service'

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
