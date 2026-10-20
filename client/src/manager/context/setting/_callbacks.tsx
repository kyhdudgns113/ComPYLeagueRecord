import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as CT from '@commonType'
import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as OT from '@objectType'
import * as U from '@util'
import * as V from '@value'

// prettier-ignore
type ContextType = {
  getBatter3DArrAll: () => Promise<LT.APIReturnType>,
  getLeagueArr: () => Promise<LT.APIReturnType>,
  getPitcher3DArrAll: () => Promise<LT.APIReturnType>,

  addBatter: (data: HTTP.HTTP_AddBatter) => Promise<LT.APIReturnType>,
  addLeague: (description: string, leagueNum: number) => Promise<LT.APIReturnType>,
  addPitcher: (data: HTTP.HTTP_AddPitcher) => Promise<LT.APIReturnType>,

  moveBatterInArr: (moveBatter: OT.BatterType, targetIdx: number, targetBatterClass: CT.Type_BatterClass, teamName: CT.Type_Team) => Promise<LT.APIReturnType>,
  movePitcherInArr: (movePitcher: OT.PitcherType, targetIdx: number, targetPitcherType: CT.Type_Pitcher, teamName: CT.Type_Team) => Promise<LT.APIReturnType>,
}
// prettier-ignore
export const SettingCallbacksContext = createContext<ContextType>({
  getBatter3DArrAll: () => Promise.resolve({isSuccess: false, errMsg: `getBatter3DArrAll is not initialized`}),
  getLeagueArr: () => Promise.resolve({isSuccess: false, errMsg: `getLeagueArr is not initialized`}),
  getPitcher3DArrAll: () => Promise.resolve({isSuccess: false, errMsg: `getPitcher3DArrAll is not initialized`}),

  addBatter: () => Promise.resolve({isSuccess: false, errMsg: `addBatter is not initialized`}),
  addLeague: () => Promise.resolve({isSuccess: false, errMsg: `addLeague is not initialized`}),
  addPitcher: () => Promise.resolve({isSuccess: false, errMsg: `addPitcher is not initialized`}),

  moveBatterInArr: () => Promise.resolve({isSuccess: false, errMsg: `moveBatterInArr is not initialized`}),
  movePitcherInArr: () => Promise.resolve({isSuccess: false, errMsg: `movePitcherInArr is not initialized`}),
})

export const useSettingCallbacksContext = () => useContext(SettingCallbacksContext)

export const SettingCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // GET AREA:
  const getBatter3DArrAll = useCallback(async () => {
    const url = `/setting/getBatter3DArrAll`
    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {MainBatter3DArr, SubBatter3DArr} = body
          if (!MainBatter3DArr || !SubBatter3DArr) {
            return {
              isSuccess: false,
              errMsg: `Some 3DArr is falsy\MainBatter3DArr: ${MainBatter3DArr}, SubBatter3DArr: ${SubBatter3DArr}`,
            } as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, MainBatter3DArr, SubBatter3DArr} as LT.APIReturnType
          }
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  const getLeagueArr = useCallback(() => {
    const url = `/setting/getLeagueArr`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {leagueArr} = body

          if (!leagueArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\leagueArr: ${leagueArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, leagueArr} as LT.APIReturnType
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  const getPitcher3DArrAll = useCallback(async () => {
    const url = `/setting/getPitcher3DArrAll`
    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {CP3DArr, RP3DArr, SP3DArr} = body
          if (!CP3DArr || !RP3DArr || !SP3DArr) {
            return {
              isSuccess: false,
              errMsg: `Some 3DArr is falsy\CP3DArr: ${CP3DArr}, RP3DArr: ${RP3DArr}, SP3DArr: ${SP3DArr}`,
            } as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, CP3DArr, RP3DArr, SP3DArr} as LT.APIReturnType
          }
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  // POST AREA:
  const addBatter = useCallback(async (data: HTTP.HTTP_AddBatter) => {
    const url = `/setting/addBatter`

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {batterArr} = body

          if (!batterArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\batterArr: ${batterArr}`} as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, batterArr} as LT.APIReturnType
          }
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  const addLeague = useCallback(async (description: string, leagueNum: number) => {
    const url = `/setting/addLeague`
    const data: HTTP.HTTP_AddLeague = {
      description,
      leagueNum,
    }

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {leagueArr} = body

          if (!leagueArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\leagueArr: ${leagueArr}`} as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, leagueArr} as LT.APIReturnType
          }
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  const addPitcher = useCallback(async (data: HTTP.HTTP_AddPitcher) => {
    const url = `/setting/addPitcher`

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {pitcherArr} = body

          if (!pitcherArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\pitcherArr: ${pitcherArr}`} as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, pitcherArr} as LT.APIReturnType
          }
        } // ::
        else {
          U.alertErrMsg(url, statusCode, gkdErrMsg, message)
          return {isSuccess: false} as LT.APIReturnType
        }
      })
      .catch(errObj => {
        U.alertErrors(url, errObj)
        return {isSuccess: false} as LT.APIReturnType
      })
  }, [])

  // PUT AREA:
  const moveBatterInArr = useCallback(
    async (moveBatter: OT.BatterType, targetIdx: number, targetBatterClass: CT.Type_BatterClass, teamName: CT.Type_Team) => {
      const url = `/setting/moveBatterInArr`

      const {leagueNum} = moveBatter

      const data: HTTP.HTTP_MoveBatterInArr = {
        batterClass: moveBatter.batterClass,
        batterOId: moveBatter.batterOId,
        leagueNum,
        targetBatterClass,
        targetIdx,
        teamName,
      }

      const teamIdx = V.TEAM_IDX_MAP[teamName]

      return F.put(url, data, null)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {MainBatterArr, SubBatterArr} = body

            if (!MainBatterArr || !SubBatterArr) {
              return {
                isSuccess: false,
                errMsg: `Some arr is falsy\MainBatterArr: ${MainBatterArr}, SubBatterArr: ${SubBatterArr}`,
              } as LT.APIReturnType
            } // ::
            else {
              return {isSuccess: true, leagueNum, teamIdx, MainBatterArr, SubBatterArr} as LT.APIReturnType
            }
          } // ::
          else {
            U.alertErrMsg(url, statusCode, gkdErrMsg, message)
            return {isSuccess: false} as LT.APIReturnType
          }
        })
        .catch(errObj => {
          U.alertErrors(url, errObj)
          return {isSuccess: false} as LT.APIReturnType
        })
    },
    []
  )

  const movePitcherInArr = useCallback(
    async (movePitcher: OT.PitcherType, targetIdx: number, targetPitcherType: CT.Type_Pitcher, teamName: CT.Type_Team) => {
      const url = `/setting/movePitcherInArr`

      const {leagueNum} = movePitcher

      const data: HTTP.HTTP_MovePitcherInArr = {
        leagueNum: leagueNum,
        pitcherOId: movePitcher.pitcherOId,
        pitcherType: movePitcher.pitcherType,
        targetIdx,
        targetPitcherType,
        teamName,
      }

      const teamIdx = V.TEAM_IDX_MAP[teamName]

      return F.put(url, data, null)
        .then(res => res.json())
        .then(res => {
          const {ok, body, statusCode, gkdErrMsg, message} = res
          if (ok) {
            const {CPArr, RPArr, SPArr} = body

            if (!CPArr || !RPArr || !SPArr) {
              return {isSuccess: false, errMsg: `Some arr is falsy\CPArr: ${CPArr}, RPArr: ${RPArr}, SPArr: ${SPArr}`} as LT.APIReturnType
            } // ::
            else {
              return {isSuccess: true, leagueNum, teamIdx, CPArr, RPArr, SPArr} as LT.APIReturnType
            }
          } // ::
          else {
            U.alertErrMsg(url, statusCode, gkdErrMsg, message)
            return {isSuccess: false} as LT.APIReturnType
          }
        })
        .catch(errObj => {
          U.alertErrors(url, errObj)
          return {isSuccess: false} as LT.APIReturnType
        })
    },
    []
  )

  // prettier-ignore
  const value: ContextType = {
    getBatter3DArrAll,
    getLeagueArr,
    getPitcher3DArrAll,

    addBatter,
    addLeague,
    addPitcher,

    moveBatterInArr,
    movePitcherInArr,
  }
  return <SettingCallbacksContext.Provider value={value}>{children}</SettingCallbacksContext.Provider>
}
