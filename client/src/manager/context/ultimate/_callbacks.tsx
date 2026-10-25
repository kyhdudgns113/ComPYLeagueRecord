import {createContext, useCallback, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

import * as F from '@fetch'
import * as HTTP from '@httpType'
import * as LT from '@localType'
import * as OT from '@objectType'
import * as U from '@util'

// prettier-ignore
type ContextType = {
  getBatterTableArr: (leagueNum: number) => Promise<LT.APIReturnType>,
  getLeagueArr: () => Promise<LT.APIReturnType>,
  getPitcherTableArr: (leagueNum: number) => Promise<LT.APIReturnType>,

  addBatterRecord: (name: string, tableOId: string) => Promise<LT.APIReturnType>,
  addBatterTable: (gameNum: number, leagueNum: number) => Promise<LT.APIReturnType>,
  addLeague: (description: string, leagueNum: number) => Promise<LT.APIReturnType>,
  addPitcherRecord: (name: string, tableOId: string) => Promise<LT.APIReturnType>,
  addPitcherTable: (gameNum: number, leagueNum: number) => Promise<LT.APIReturnType>,

  deleteBatterTable: (tableOId: string) => Promise<LT.APIReturnType>,
  deleteLeague: (leagueNum: number) => Promise<LT.APIReturnType>,
  deletePitcherTable: (tableOId: string) => Promise<LT.APIReturnType>,

  updateBatterTable: (recordArr: OT.UltiBatterRecordType[], tableOId: string, desc?: string) => Promise<LT.APIReturnType>,
  updatePitcherTable: (recordArr: OT.UltiPitcherRecordType[], tableOId: string, desc?: string) => Promise<LT.APIReturnType>,
}
// prettier-ignore
export const UltimateCallbacksContext = createContext<ContextType>({
  getBatterTableArr: () => Promise.resolve({isSuccess: false, errMsg: `getBatterTableArr is not initialized`}),
  getLeagueArr: () => Promise.resolve({isSuccess: false, errMsg: `getLeagueArr is not initialized`}),
  getPitcherTableArr: () => Promise.resolve({isSuccess: false, errMsg: `getPitcherTableArr is not initialized`}),

  addBatterRecord: () => Promise.resolve({isSuccess: false, errMsg: `addBatterRecord is not initialized`}),
  addBatterTable: () => Promise.resolve({isSuccess: false, errMsg: `addBatterTable is not initialized`}),
  addLeague: () => Promise.resolve({isSuccess: false, errMsg: `addLeague is not initialized`}),
  addPitcherRecord: () => Promise.resolve({isSuccess: false, errMsg: `addPitcherRecord is not initialized`}),
  addPitcherTable: () => Promise.resolve({isSuccess: false, errMsg: `addPitcherTable is not initialized`}),

  deleteBatterTable: () => Promise.resolve({isSuccess: false, errMsg: `deleteBatterTable is not initialized`}),
  deleteLeague: () => Promise.resolve({isSuccess: false, errMsg: `deleteLeague is not initialized`}),
  deletePitcherTable: () => Promise.resolve({isSuccess: false, errMsg: `deletePitcherTable is not initialized`}),

  updateBatterTable: () => Promise.resolve({isSuccess: false, errMsg: `updateBatterTable is not initialized`}),
  updatePitcherTable: () => Promise.resolve({isSuccess: false, errMsg: `updatePitcherTable is not initialized`}),
})

export const useUltimateCallbacksContext = () => useContext(UltimateCallbacksContext)

export const UltimateCallbacksProvider: FC<PropsWithChildren> = ({children}) => {
  // GET AREA:
  const getBatterTableArr = useCallback((leagueNum: number) => {
    const url = `/ultimate/getBatterTableArr/${leagueNum}`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {batterTableArr} = body

          if (!batterTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nbatterTableArr: ${batterTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, batterTableArr} as LT.APIReturnType
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

  const getPitcherTableArr = useCallback((leagueNum: number) => {
    const url = `/ultimate/getPitcherTableArr/${leagueNum}`

    return F.get(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res

        if (ok) {
          const {pitcherTableArr} = body

          if (!pitcherTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\npitcherTableArr: ${pitcherTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, pitcherTableArr} as LT.APIReturnType
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
  const addBatterRecord = useCallback(async (name: string, tableOId: string) => {
    const url = `/ultimate/addBatterRecord`
    const data: HTTP.HTTP_AddUltiBatterRecord = {
      name,
      tableOId,
    }

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {batterTableArr} = body

          if (!batterTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nbatterTableArr: ${batterTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, batterTableArr} as LT.APIReturnType
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

  const addBatterTable = useCallback(async (gameNum: number, leagueNum: number) => {
    const url = `/ultimate/addBatterTable`
    const data: HTTP.HTTP_AddUltiBatterTable = {
      gameNum,
      leagueNum,
    }

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {batterTableArr} = body

          if (!batterTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nbatterTableArr: ${batterTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, batterTableArr} as LT.APIReturnType
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

  const addPitcherRecord = useCallback(async (name: string, tableOId: string) => {
    const url = `/ultimate/addPitcherRecord`
    const data: HTTP.HTTP_AddUltiPitcherRecord = {
      name,
      tableOId,
    }

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {pitcherTableArr} = body

          if (!pitcherTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\npitcherTableArr: ${pitcherTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, pitcherTableArr} as LT.APIReturnType
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

  const addPitcherTable = useCallback(async (gameNum: number, leagueNum: number) => {
    const url = `/ultimate/addPitcherTable`
    const data: HTTP.HTTP_AddUltiPitcherTable = {
      gameNum,
      leagueNum,
    }

    return F.post(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {pitcherTableArr} = body

          if (!pitcherTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\npitcherTableArr: ${pitcherTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, pitcherTableArr} as LT.APIReturnType
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

  // DELETE AREA:
  const deleteBatterTable = useCallback((tableOId: string) => {
    const url = `/ultimate/deleteBatterTable/${tableOId}`

    return F.del(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {batterTableArr} = body

          if (!batterTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nbatterTableArr: ${batterTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, batterTableArr} as LT.APIReturnType
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

  const deleteLeague = useCallback((leagueNum: number) => {
    const url = `/ultimate/deleteLeague/${leagueNum}`

    return F.del(url, null)
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

  const deletePitcherTable = useCallback((tableOId: string) => {
    const url = `/ultimate/deletePitcherTable/${tableOId}`

    return F.del(url, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {pitcherTableArr} = body

          if (!pitcherTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\npitcherTableArr: ${pitcherTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, pitcherTableArr} as LT.APIReturnType
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
  const updateBatterTable = useCallback(async (recordArr: OT.UltiBatterRecordType[], tableOId: string, desc?: string) => {
    const url = `/ultimate/updateBatterTable`
    const data: HTTP.HTTP_UpdateUltiBatterTable = {
      desc,
      recordArr,
      tableOId,
    }

    return F.put(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {batterTableArr} = body

          if (!batterTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\nbatterTableArr: ${batterTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, batterTableArr} as LT.APIReturnType
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

  const updatePitcherTable = useCallback(async (recordArr: OT.UltiPitcherRecordType[], tableOId: string, desc?: string) => {
    const url = `/ultimate/updatePitcherTable`
    const data: HTTP.HTTP_UpdateUltiPitcherTable = {
      desc,
      recordArr,
      tableOId,
    }

    return F.put(url, data, null)
      .then(res => res.json())
      .then(res => {
        const {ok, body, statusCode, gkdErrMsg, message} = res
        if (ok) {
          const {pitcherTableArr} = body

          if (!pitcherTableArr) {
            return {isSuccess: false, errMsg: `Some arr is falsy\npitcherTableArr: ${pitcherTableArr}`} as LT.APIReturnType
          }

          return {isSuccess: true, pitcherTableArr} as LT.APIReturnType
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
    getBatterTableArr,
    getLeagueArr,
    getPitcherTableArr,

    addBatterRecord,
    addBatterTable,
    addLeague,
    addPitcherRecord,
    addPitcherTable,

    deleteBatterTable,
    deleteLeague,
    deletePitcherTable,

    updateBatterTable,
    updatePitcherTable,
  }

  return <UltimateCallbacksContext.Provider value={value}>{children}</UltimateCallbacksContext.Provider>
}
