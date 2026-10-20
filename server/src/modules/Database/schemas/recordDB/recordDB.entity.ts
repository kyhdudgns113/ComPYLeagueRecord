import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose'

import * as OT from '@objectTye'

@Schema()
export class RecordArr extends Document {
  @Prop({type: Number, required: true})
  gameNum!: number

  @Prop({type: Number, required: true})
  leagueNum!: number

  @Prop({type: Array, default: []})
  recordArr!: OT.RecordElementType[]
}

export const RecordArrSchema = SchemaFactory.createForClass(RecordArr)

RecordArrSchema.index({gameNum: 1, leagueNum: 1}, {unique: true})
