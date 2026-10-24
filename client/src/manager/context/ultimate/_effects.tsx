import {createContext, useContext, useEffect} from 'react'

import {useUltimateActions, useUltimateLeagueNum} from '@redux'

import {useUltimateCallbacksContext} from './_callbacks'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const UltimateEffectsContext = createContext<ContextType>({})

export const useUltimateEffectsContext = () => useContext(UltimateEffectsContext)

export const UltimateEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const leagueNum = useUltimateLeagueNum()
  const {setBatterTableArr, setLeagueArrUlti, setPitcherTableArr} = useUltimateActions()
  const {getBatterTableArr, getLeagueArr, getPitcherTableArr} = useUltimateCallbacksContext()

  // 자동 갱신: 얼티밋 리그 목록 불러오기
  useEffect(() => {
    getLeagueArr().then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {leagueArr} = res
        setLeagueArrUlti(leagueArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[UltimateEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [])

  // 자동 갱신: 선택된 리그의 투수/타자 테이블 불러오기
  useEffect(() => {
    if (leagueNum === null) {
      setBatterTableArr([])
      setPitcherTableArr([])
      return
    }

    getBatterTableArr(leagueNum).then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {batterTableArr} = res
        setBatterTableArr(batterTableArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[UltimateEffect]: ${res.errMsg}`)
        }
      }
    })

    getPitcherTableArr(leagueNum).then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {pitcherTableArr} = res
        setPitcherTableArr(pitcherTableArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[UltimateEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [leagueNum])

  //
  return <UltimateEffectsContext.Provider value={{}}>{children}</UltimateEffectsContext.Provider>
}
