import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as CT from '@commonType'

@Schema()
export class GameInfo extends Document {
  // 상대팀
  @Prop({type: String, required: true})
  enemyTeam!: CT.Type_Team

  // 리그에서 몇 번째 게임인지 (최대 144)
  @Prop({type: Number, required: true})
  gameNum!: number

  // 몇 번째 리그인지
  @Prop({type: Number, required: true})
  leagueNum!: number

  // 선발투수 이름
  @Prop({type: String, required: true})
  SPName!: string
}

@Schema()
export class LeagueInfo extends Document {
  @Prop({type: Date, default: new Date()})
  createdAt!: Date

  @Prop({type: String, default: ''})
  description: string = ''

  @Prop({type: Number, required: true, unique: true})
  leagueNum!: number
}

export const GameInfoSchema = SchemaFactory.createForClass(GameInfo)
export const LeagueInfoSchema = SchemaFactory.createForClass(LeagueInfo)

GameInfoSchema.index({gameNum: 1, leagueNum: 1}, {unique: true})
