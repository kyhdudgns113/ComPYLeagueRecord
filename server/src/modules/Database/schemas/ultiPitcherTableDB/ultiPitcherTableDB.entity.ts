import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as OT from '@objectTye'

@Schema()
export class UltiPitcherTable extends Document {
  @Prop({type: Date, default: new Date()})
  createdAt!: Date

  @Prop({type: String, default: ''})
  desc: string = ''

  @Prop({type: Number, required: true})
  gameNum!: number

  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: Array, default: []})
  recordArr!: OT.UltiPitcherRecordType[]
}

export const UltiPitcherTableSchema = SchemaFactory.createForClass(UltiPitcherTable)
