import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as CT from '@commonType'

@Schema()
export class Pitcher extends Document {
  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: String, required: true})
  name!: string

  @Prop({type: String, required: true})
  pitcherHand!: CT.Type_PitcherHand

  @Prop({type: String, required: true})
  pitcherType!: CT.Type_Pitcher

  @Prop({type: String, required: true})
  teamName!: CT.Type_Team
}

@Schema()
export class PitcherArr extends Document {
  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: [String], required: true})
  pitcherOIdArr!: string[]

  @Prop({type: String, required: true})
  pitcherType!: CT.Type_Pitcher

  @Prop({type: String, required: true})
  teamName!: CT.Type_Team
}

export const PitcherArrSchema = SchemaFactory.createForClass(PitcherArr)
export const PitcherSchema = SchemaFactory.createForClass(Pitcher)

// 다른 팀에서 같은 선수를 쓸 수도 있다.
PitcherSchema.index({leagueNum: 1, teamName: 1, name: 1}, {unique: true})

PitcherArrSchema.index({leagueNum: 1, teamName: 1, pitcherType: 1}, {unique: true})
