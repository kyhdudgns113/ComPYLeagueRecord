import {createContext, useContext, useEffect} from 'react'

import type {FC, PropsWithChildren} from 'react'
import {useUltimateCallbacksContext} from './_callbacks'
import {useUltimateActions} from '@redux'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const UltimateEffectsContext = createContext<ContextType>({})

export const useUltimateEffectsContext = () => useContext(UltimateEffectsContext)

export const UltimateEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {setLeagueArrUlti} = useUltimateActions()
  const {getLeagueArr} = useUltimateCallbacksContext()

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

  //
  return <UltimateEffectsContext.Provider value={{}}>{children}</UltimateEffectsContext.Provider>
}
