import {createContext, useContext, useEffect} from 'react'

import {useRecordActions, useRecordStates} from '@redux'

import {useRecordCallbacksContext} from './_callbacks'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const RecordEffectsContext = createContext<ContextType>({})

export const useRecordEffectsContext = () => useContext(RecordEffectsContext)

export const RecordEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {setGameArr, setRecordArr} = useRecordActions()
  const {gameNum, leagueNum} = useRecordStates()
  const {getGameArr, getRecordArr} = useRecordCallbacksContext()

  // 자동 갱신: 선택된 리그의 게임 목록 불러오기
  useEffect(() => {
    if (leagueNum === null) {
      setGameArr([])
      return
    }

    getGameArr(leagueNum).then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {gameArr} = res
        setGameArr(gameArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[RecordEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [leagueNum])

  // 자동 갱신: 선택된 게임의 투구 기록 불러오기
  useEffect(() => {
    if (leagueNum === null || gameNum === null) {
      setRecordArr([])
      return
    }

    getRecordArr(gameNum, leagueNum).then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {recordArr} = res
        setRecordArr(recordArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[RecordEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [gameNum, leagueNum])

  //
  return <RecordEffectsContext.Provider value={{}}>{children}</RecordEffectsContext.Provider>
}
