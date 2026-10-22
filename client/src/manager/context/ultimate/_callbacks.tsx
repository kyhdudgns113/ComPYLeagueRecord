import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  getLeagueArr: () => Promise<LT.APIReturnType>,

  addLeague: (description: string, leagueNum: number) => Promise<LT.APIReturnType>,
}
// prettier-ignore
export const UltimateCallbacksContext = createContext<ContextType>({
  getLeagueArr: () => Promise.resolve({isSuccess: false, errMsg: `getLeagueArr is not initialized`}),

  addLeague: () => Promise.resolve({isSuccess: false, errMsg: `addLeague is not initialized`}),
})

export const useUltimateCallbacksContext = () => useContext(UltimateCallbacksContext)

export const UltimateCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // GET AREA:
  const getLeagueArr = useCallback(() => {
    const url = `/ultimate/getLeagueArr`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {leagueArr} = body

          if (!leagueArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nleagueArr: ${leagueArr}`} as LT.APIReturnType
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

  // POST AREA:
  const addLeague = useCallback(async (description: string, leagueNum: number) => {
    const url = `/ultimate/addLeague`
    const data: HTTP.HTTP_AddUltiLeague = {
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
            return {isSuccess: false, errMsg: `Some arr is falsy\nleagueArr: ${leagueArr}`} as LT.APIReturnType
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

  // prettier-ignore
  const value: ContextType = {
    getLeagueArr,

    addLeague,
  }

  return <UltimateCallbacksContext.Provider value={value}>{children}</UltimateCallbacksContext.Provider>
}
