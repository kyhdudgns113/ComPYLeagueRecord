import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

@Schema()
export class UltiLeagueInfo extends Document {
  @Prop({type: Date, default: new Date()})
  createdAt!: Date

  @Prop({type: String, default: ''})
  description: string = ''

  @Prop({type: Number, required: true, unique: true})
  leagueNum!: number
}

export const UltiLeagueInfoSchema = SchemaFactory.createForClass(UltiLeagueInfo)
