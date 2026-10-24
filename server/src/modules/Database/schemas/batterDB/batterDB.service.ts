import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Model} from 'mongoose'

import {Batter, BatterArr} from './batterDB.entity'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'
import * as V from '@value'

const toBatterType = (batter: Batter): OT.BatterType => {
  return {
    batterClass: batter.batterClass,
    batterHand: batter.batterHand,
    batterOId: batter._id.toString(),
    hasPressureSkill: batter.hasPressureSkill,
    leagueNum: batter.leagueNum,
    name: batter.name,
    teamName: batter.teamName,
  }
}

@Injectable()
export class BatterDBService {
  constructor(
    @InjectModel(Batter.name) private batterDBModel: Model<Batter>,
    @InjectModel(BatterArr.name) private batterArrDBModel: Model<BatterArr>
  ) {}

  async createDummyBatters(where: string, leagueNum: number) {
    where = where + '/createDummyBatters'

    try {
      const batterDocs: {
        batterClass: OT.BatterType['batterClass']
        batterHand: OT.BatterType['batterHand']
        batterNum: number
        hasPressureSkill: boolean
        leagueNum: number
        name: string
        teamName: OT.BatterType['teamName']
      }[] = []

      V.TEAM_IDX_ARR.forEach(teamIdx => {
        const teamName = V.TEAM_NAME[teamIdx]

        Array.from({length: 9}, (_, idx) => {
          batterDocs.push({
            batterClass: '선발',
            batterHand: '우타',
            batterNum: idx + 1,
            hasPressureSkill: false,
            leagueNum,
            name: `${idx + 1}번 선발`,
            teamName,
          })
        })

        Array.from({length: 5}, (_, idx) => {
          batterDocs.push({
            batterClass: '후보',
            batterHand: '우타',
            batterNum: idx + 1,
            hasPressureSkill: false,
            leagueNum,
            name: `${idx + 1}번 후보`,
            teamName,
          })
        })
      })

      const insertedBatterArr = await this.batterDBModel.insertMany(batterDocs)

      const batterArrDocs = V.TEAM_IDX_ARR.flatMap(teamIdx => {
        const teamName = V.TEAM_NAME[teamIdx]
        const teamBatterArr = insertedBatterArr.filter(batter => batter.teamName === teamName)

        return [
          {
            batterClass: '선발' as const,
            batterOIdArr: teamBatterArr.filter(batter => batter.batterClass === '선발').map(batter => batter._id.toString()),
            leagueNum,
            teamName,
          },
          {
            batterClass: '후보' as const,
            batterOIdArr: teamBatterArr.filter(batter => batter.batterClass === '후보').map(batter => batter._id.toString()),
            leagueNum,
            teamName,
          },
        ]
      })

      await this.batterArrDBModel.insertMany(batterArrDocs)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async createBatter(where: string, dto: DTO.DTO_CreateBatter) {
    where = where + '/createBatter'

    const {batterClass, batterHand, batterNum, hasPressureSkill, leagueNum, name, teamName} = dto

    try {
      const newBatter = new this.batterDBModel({batterClass, batterHand, batterNum, hasPressureSkill, leagueNum, name, teamName})
      await newBatter.save()

      const batterOId = newBatter._id.toString()
      await this.batterArrDBModel.updateOne({batterClass, leagueNum, teamName}, {$push: {batterOIdArr: batterOId}}, {upsert: true})

      return {batter: toBatterType(newBatter)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readBatterByOId(where: string, batterOId: string) {
    where = where + '/readBatterByOId'

    try {
      const batterDB = await this.batterDBModel.findById(batterOId)

      if (!batterDB) {
        throw {gkdErrMsg: `[${where}] batter is missing`, statusCode: 400}
      }

      return {batter: toBatterType(batterDB)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readBatterArr(where: string, dto: DTO.DTO_ReadBatterArr) {
    where = where + '/readBatterArr'

    const {batterClass, leagueNum, teamName} = dto

    try {
      const batterArrDB = await this.batterArrDBModel.findOne({batterClass, leagueNum, teamName})

      if (!batterArrDB) {
        return {batterArr: []}
      }

      const batterOIdArr = batterArrDB.batterOIdArr
      const batterDBArr = await this.batterDBModel.find({batterClass, leagueNum, teamName})
      const batterArr = batterOIdArr.flatMap(batterOId => {
        const batter = batterDBArr.find(item => item._id.toString() === batterOId)
        if (!batter) {
          return []
        }
        return [toBatterType(batter)]
      })

      return {batterArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readBatter3DArrAll(where: string, dto: DTO.DTO_ReadBatter3DArrAll) {
    where = where + '/readBatter3DArrAll'

    const {maxLeagueNum} = dto

    try {
      const batterArrDBArr = await this.batterArrDBModel.find()
      const batterDBArr = await this.batterDBModel.find()
      const batterDBMap = new Map(batterDBArr.map(batter => [batter._id.toString(), batter]))

      const leagueLen =
        Math.max(maxLeagueNum, ...batterArrDBArr.map(batterArrDB => batterArrDB.leagueNum), ...batterDBArr.map(batter => batter.leagueNum), 0) + 1
      const emptyMatrix = (): OT.BatterType[][] => Array.from({length: V.TEAM_IDX_ARR.length}, () => [])
      const MainBatter3DArr = Array.from({length: leagueLen}, emptyMatrix)
      const SubBatter3DArr = Array.from({length: leagueLen}, emptyMatrix)

      batterArrDBArr.forEach(batterArrDB => {
        const {batterClass, leagueNum, teamName} = batterArrDB
        const teamIdx = V.TEAM_IDX_ARR.find(idx => V.TEAM_NAME[idx] === teamName)
        if (teamIdx === undefined) {
          return
        }

        const batterArr = batterArrDB.batterOIdArr.flatMap(batterOId => {
          const batter = batterDBMap.get(batterOId)
          if (!batter) {
            return []
          }
          return [toBatterType(batter)]
        })

        switch (batterClass) {
          case '선발':
            MainBatter3DArr[leagueNum][teamIdx] = batterArr
            break
          case '후보':
            SubBatter3DArr[leagueNum][teamIdx] = batterArr
            break
        }
      })

      return {MainBatter3DArr, SubBatter3DArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateBatter(where: string, dto: DTO.DTO_UpdateBatter) {
    where = where + '/updateBatter'

    const {batterHand, batterOId, hasPressureSkill, name} = dto

    try {
      const batterDB = await this.batterDBModel.findByIdAndUpdate(batterOId, {$set: {batterHand, hasPressureSkill, name}}, {returnDocument: 'after'})

      if (!batterDB) {
        console.log(`[${where}] 수정이 되지 않았어요`)
        throw {gkdErrMsg: `[${where}] batter is missing`}
      }

      return {batter: toBatterType(batterDB)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updateBatterInArr(where: string, dto: DTO.DTO_MoveBatterInArr) {
    where = where + '/updateBatterInArr'

    const {batterClass, batterOId, leagueNum, targetBatterClass, targetIdx, teamName} = dto

    try {
      if (batterClass !== targetBatterClass) {
        const srcArrDB = await this.batterArrDBModel.findOne({batterClass, leagueNum, teamName})
        if (srcArrDB) {
          await this.batterArrDBModel.updateOne(
            {_id: srcArrDB._id},
            {$set: {batterOIdArr: srcArrDB.batterOIdArr.filter(id => id !== batterOId)}}
          )
        }

        await this.batterDBModel.updateOne({_id: batterOId}, {$set: {batterClass: targetBatterClass}})
      }

      const dstArrDB = await this.batterArrDBModel.findOne({batterClass: targetBatterClass, leagueNum, teamName})
      const batterOIdArr = (dstArrDB?.batterOIdArr ?? []).filter(id => id !== batterOId)
      const insertIdx = Math.max(0, Math.min(targetIdx, batterOIdArr.length))
      batterOIdArr.splice(insertIdx, 0, batterOId)

      await this.batterArrDBModel.updateOne(
        {batterClass: targetBatterClass, leagueNum, teamName},
        {$set: {batterClass: targetBatterClass, batterOIdArr, leagueNum, teamName}},
        {upsert: true}
      )
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
