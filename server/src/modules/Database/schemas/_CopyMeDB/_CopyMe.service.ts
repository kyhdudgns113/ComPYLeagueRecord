import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {___CopyMe} from './_CopyMe.entity'

@Injectable()
export class ___CopyMeService {
  constructor(@InjectModel(___CopyMe.name) private ___copyModel: Model<___CopyMe>) {}

  async copyMePost(copyData: any) {
    return 'CopyMe'
  }

  async copyMeGet() {
    return 'CopyMe'
  }

  async copyMeEtc() {
    return 'CopyMe'
  }
}
