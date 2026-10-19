import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as LT from '@localType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  getLeagueArr: () => Promise<LT.APIReturnType>,
}
// prettier-ignore
export const SettingCallbacksContext = createContext<ContextType>({
  getLeagueArr: () => Promise.resolve({isSuccess: false, errMsg: `getLeagueArr is not initialized`}),
})

export const useSettingCallbacksContext = () => useContext(SettingCallbacksContext)

export const SettingCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
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

  // prettier-ignore
  const value: ContextType = {
    getLeagueArr
  }
  return <SettingCallbacksContext.Provider value={value}>{children}</SettingCallbacksContext.Provider>
}
