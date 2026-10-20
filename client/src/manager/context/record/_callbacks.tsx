import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  getGameArr: (leagueNum: number) => Promise<LT.APIReturnType>,
  getRecordArr: (gameNum: number, leagueNum: number) => Promise<LT.APIReturnType>,

  addGame: (data: HTTP.HTTP_AddGame) => Promise<LT.APIReturnType>,

  updateRecord: (data: HTTP.HTTP_UpdateRecord) => Promise<LT.APIReturnType>,
}
// prettier-ignore
export const RecordCallbacksContext = createContext<ContextType>({
  getGameArr: () => Promise.resolve({isSuccess: false, errMsg: `getGameArr is not initialized`}),
  getRecordArr: () => Promise.resolve({isSuccess: false, errMsg: `getRecordArr is not initialized`}),

  addGame: () => Promise.resolve({isSuccess: false, errMsg: `addGame is not initialized`}),

  updateRecord: () => Promise.resolve({isSuccess: false, errMsg: `updateRecord is not initialized`}),
})

export const useRecordCallbacksContext = () => useContext(RecordCallbacksContext)

export const RecordCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // GET AREA:
  const getGameArr = useCallback(async (leagueNum: number) => {
    const url = `/record/getGameArr/${leagueNum}`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {gameArr} = body

          if (!gameArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\gameArr: ${gameArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, gameArr} as LT.APIReturnType
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

  const getRecordArr = useCallback(async (gameNum: number, leagueNum: number) => {
    const url = `/record/getRecordArr/${leagueNum}/${gameNum}`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {recordArr} = body

          if (!recordArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\recordArr: ${recordArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, recordArr} as LT.APIReturnType
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
  const addGame = useCallback(async (data: HTTP.HTTP_AddGame) => {
    const url = `/record/addGame`

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {gameArr} = body

          if (!gameArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\gameArr: ${gameArr}`} as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, gameArr} as LT.APIReturnType
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
  const updateRecord = useCallback(async (data: HTTP.HTTP_UpdateRecord) => {
    const url = `/record/updateRecord`

    return F.put(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {recordArr} = body

          if (!recordArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nrecordArr: ${recordArr}`} as LT.APIReturnType
          } // ::
          else {
            return {isSuccess: true, recordArr} as LT.APIReturnType
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

  // prettier-ignore
  const value: ContextType = {
    getGameArr,
    getRecordArr,

    addGame,

    updateRecord,
  }
  return <RecordCallbacksContext.Provider value={value}>{children}</RecordCallbacksContext.Provider>
}
