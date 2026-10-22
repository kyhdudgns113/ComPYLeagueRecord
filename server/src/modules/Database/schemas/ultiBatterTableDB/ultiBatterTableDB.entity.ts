import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as OT from '@objectTye'

@Schema()
export class UltiBatterTable extends Document {
  @Prop({type: String, default: ''})
  desc: string = ''

  @Prop({type: Number, required: true})
  gameNum!: number

  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: Array, default: []})
  recordArr!: OT.UltiBatterRecordType[]
}

export const UltiBatterTableSchema = SchemaFactory.createForClass(UltiBatterTable)
