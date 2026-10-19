import {Module} from '@nestjs/common'
import {SettingController} from './Setting.controller'
import {SettingService} from './Setting.service'
import {DatabaseModule} from '../Database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
