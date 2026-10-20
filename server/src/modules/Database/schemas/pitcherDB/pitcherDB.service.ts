import {Injectable} from '@nestjs/common'
import {InjectModel} from '@nestjs/mongoose'
import {Pitcher, PitcherArr} from './pitcherDB.entity'
import {Model} from 'mongoose'

import * as DTO from '@dtoType'
import * as OT from '@objectTye'
import * as V from '@value'

const toPitcherType = (pitcher: Pitcher): OT.PitcherType => {
  return {
    leagueNum: pitcher.leagueNum,
    name: pitcher.name,
    pitcherHand: pitcher.pitcherHand,
    pitcherOId: pitcher._id.toString(),
    pitcherType: pitcher.pitcherType,
    teamName: pitcher.teamName,
  }
}

@Injectable()
export class PitcherDBService {
  constructor(
    @InjectModel(Pitcher.name) private pitcherDBModel: Model<Pitcher>,
    @InjectModel(PitcherArr.name) private pitcherArrDBModel: Model<PitcherArr>
  ) {}

  async createDummyPitchers(where: string, leagueNum: number) {
    where = where + '/createDummyPitchers'

    try {
      const pitcherDocs: {
        leagueNum: number
        name: string
        pitcherHand: OT.PitcherType['pitcherHand']
        pitcherType: OT.PitcherType['pitcherType']
        teamName: OT.PitcherType['teamName']
      }[] = []

      V.TEAM_IDX_ARR.forEach(teamIdx => {
        const teamName = V.TEAM_NAME[teamIdx]

        Array.from({length: 5}, (_, idx) => {
          pitcherDocs.push({
            leagueNum,
            name: `${idx + 1}번 선발`,
            pitcherHand: '우완',
            pitcherType: '선발',
            teamName,
          })
        })

        Array.from({length: 5}, (_, idx) => {
          pitcherDocs.push({
            leagueNum,
            name: `${idx + 1}번 중계`,
            pitcherHand: '우완',
            pitcherType: '중계',
            teamName,
          })
        })

        pitcherDocs.push({
          leagueNum,
          name: `1번 마무리`,
          pitcherHand: '우완',
          pitcherType: '마무리',
          teamName,
        })
      })

      const insertedPitcherArr = await this.pitcherDBModel.insertMany(pitcherDocs)

      const pitcherArrDocs = V.TEAM_IDX_ARR.flatMap(teamIdx => {
        const teamName = V.TEAM_NAME[teamIdx]
        const teamPitcherArr = insertedPitcherArr.filter(pitcher => pitcher.teamName === teamName)

        return [
          {
            leagueNum,
            pitcherOIdArr: teamPitcherArr.filter(pitcher => pitcher.pitcherType === '선발').map(pitcher => pitcher._id.toString()),
            pitcherType: '선발' as const,
            teamName,
          },
          {
            leagueNum,
            pitcherOIdArr: teamPitcherArr.filter(pitcher => pitcher.pitcherType === '중계').map(pitcher => pitcher._id.toString()),
            pitcherType: '중계' as const,
            teamName,
          },
          {
            leagueNum,
            pitcherOIdArr: teamPitcherArr.filter(pitcher => pitcher.pitcherType === '마무리').map(pitcher => pitcher._id.toString()),
            pitcherType: '마무리' as const,
            teamName,
          },
        ]
      })

      await this.pitcherArrDBModel.insertMany(pitcherArrDocs)
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async createPitcher(where: string, dto: DTO.DTO_CreatePitcher) {
    where = where + '/createPitcher'

    const {leagueNum, name, pitcherHand, pitcherType, teamName} = dto

    try {
      const newPitcher = new this.pitcherDBModel({leagueNum, name, pitcherHand, pitcherType, teamName})
      await newPitcher.save()

      const pitcherOId = newPitcher._id.toString()
      await this.pitcherArrDBModel.updateOne({leagueNum, pitcherType, teamName}, {$push: {pitcherOIdArr: pitcherOId}}, {upsert: true})

      return {pitcher: toPitcherType(newPitcher)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readPitcherArr(where: string, dto: DTO.DTO_ReadPitcherArr) {
    where = where + '/readPitcherArr'

    try {
      const filter: any = {}
      if (dto.leagueNum) {
        filter.leagueNum = dto.leagueNum
      }
      if (dto.pitcherType) {
        filter.pitcherType = dto.pitcherType
      }
      if (dto.teamName) {
        filter.teamName = dto.teamName
      }

      const pitcherArrDB = await this.pitcherArrDBModel.findOne(filter)

      if (!pitcherArrDB) {
        return {pitcherArr: []}
      }

      const pitcherOIdArr = pitcherArrDB.pitcherOIdArr
      const pitcherDBArr = await this.pitcherDBModel.find(filter)
      const pitcherArr =
        pitcherOIdArr
          .map(pitcherOId => {
            const pitcherDB = pitcherDBArr.find(pitcher => pitcher._id.toString() === pitcherOId)
            if (!pitcherDB) {
              return null
            }
            const pitcher: OT.PitcherType = {
              leagueNum: pitcherDB.leagueNum,
              name: pitcherDB.name,
              pitcherHand: pitcherDB.pitcherHand,
              pitcherOId: pitcherDB._id.toString(),
              pitcherType: pitcherDB.pitcherType,
              teamName: pitcherDB.teamName,
            }
            return pitcher
          })
          .filter(pitcher => pitcher !== null) || []

      return {pitcherArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async readPitcher3DArrAll(where: string, dto: DTO.DTO_ReadPitcher3DArrAll) {
    where = where + '/readPitcher3DArrAll'

    const {maxLeagueNum} = dto

    try {
      const pitcherArrDBArr = await this.pitcherArrDBModel.find()
      const pitcherDBArr = await this.pitcherDBModel.find()
      const pitcherDBMap = new Map(pitcherDBArr.map(pitcher => [pitcher._id.toString(), pitcher]))

      const leagueLen =
        Math.max(maxLeagueNum, ...pitcherArrDBArr.map(pitcherArrDB => pitcherArrDB.leagueNum), ...pitcherDBArr.map(pitcher => pitcher.leagueNum), 0) +
        1
      const emptyMatrix = (): OT.PitcherType[][] => Array.from({length: V.TEAM_IDX_ARR.length}, () => [])
      const CP3DArr = Array.from({length: leagueLen}, emptyMatrix)
      const RP3DArr = Array.from({length: leagueLen}, emptyMatrix)
      const SP3DArr = Array.from({length: leagueLen}, emptyMatrix)

      pitcherArrDBArr.forEach(pitcherArrDB => {
        const {leagueNum, pitcherType, teamName} = pitcherArrDB
        const teamIdx = V.TEAM_IDX_ARR.find(idx => V.TEAM_NAME[idx] === teamName)
        if (teamIdx === undefined) {
          return
        }

        const pitcherArr = pitcherArrDB.pitcherOIdArr.flatMap(pitcherOId => {
          const pitcher = pitcherDBMap.get(pitcherOId)
          if (!pitcher) {
            return []
          }
          return [toPitcherType(pitcher)]
        })

        switch (pitcherType) {
          case '선발':
            SP3DArr[leagueNum][teamIdx] = pitcherArr
            break
          case '중계':
            RP3DArr[leagueNum][teamIdx] = pitcherArr
            break
          case '마무리':
            CP3DArr[leagueNum][teamIdx] = pitcherArr
            break
        }
      })

      return {CP3DArr, RP3DArr, SP3DArr}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updatePitcher(where: string, dto: DTO.DTO_UpdatePitcher) {
    where = where + '/updatePitcher'

    const {name, pitcherHand, pitcherOId} = dto

    try {
      const pitcherDB = await this.pitcherDBModel.findByIdAndUpdate(pitcherOId, {$set: {name, pitcherHand}}, {new: true})

      if (!pitcherDB) {
        console.log(`[${where}] 수정이 되지 않았어요`)
        throw {gkdErrMsg: `[${where}] pitcher is missing`}
      }

      return {pitcher: toPitcherType(pitcherDB)}
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }

  async updatePitcherInArr(where: string, dto: DTO.DTO_MovePitcherInArr) {
    where = where + '/updatePitcherInArr'

    const {leagueNum, pitcherOId, pitcherType, targetIdx, targetPitcherType, teamName} = dto

    try {
      if (pitcherType !== targetPitcherType) {
        const srcArrDB = await this.pitcherArrDBModel.findOne({leagueNum, pitcherType, teamName})
        if (srcArrDB) {
          await this.pitcherArrDBModel.updateOne({_id: srcArrDB._id}, {$set: {pitcherOIdArr: srcArrDB.pitcherOIdArr.filter(id => id !== pitcherOId)}})
        }

        await this.pitcherDBModel.updateOne({_id: pitcherOId}, {$set: {pitcherType: targetPitcherType}})
      }

      const dstArrDB = await this.pitcherArrDBModel.findOne({leagueNum, pitcherType: targetPitcherType, teamName})
      const pitcherOIdArr = (dstArrDB?.pitcherOIdArr ?? []).filter(id => id !== pitcherOId)
      const insertIdx = Math.max(0, Math.min(targetIdx, pitcherOIdArr.length))
      pitcherOIdArr.splice(insertIdx, 0, pitcherOId)

      await this.pitcherArrDBModel.updateOne({leagueNum, pitcherType: targetPitcherType, teamName}, {$set: {pitcherOIdArr}}, {upsert: true})
      // ::
    } catch (errObj) {
      // ::
      throw errObj
    }
  }
}
