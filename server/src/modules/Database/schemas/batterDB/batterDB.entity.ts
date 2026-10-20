import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as CT from '@commonType'

@Schema()
export class Batter extends Document {
  @Prop({type: String, required: true})
  batterClass!: CT.Type_BatterClass

  @Prop({type: String, required: true})
  batterHand!: CT.Type_BatterHand

  @Prop({type: Number, required: true})
  batterNum!: number

  @Prop({type: Boolean, required: true})
  hasPressureSkill!: boolean

  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: String, required: true})
  name!: string

  @Prop({type: String, required: true})
  teamName!: CT.Type_Team
}

@Schema()
export class BatterArr extends Document {
  @Prop({type: String, required: true})
  batterClass!: CT.Type_BatterClass

  @Prop({type: [String], required: true})
  batterOIdArr!: string[]

  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: String, required: true})
  teamName!: CT.Type_Team
}

export const BatterArrSchema = SchemaFactory.createForClass(BatterArr)
export const BatterSchema = SchemaFactory.createForClass(Batter)

BatterSchema.index({leagueNum: 1, teamName: 1, name: 1}, {unique: true})

BatterArrSchema.index({leagueNum: 1, teamName: 1, batterClass: 1}, {unique: true})
