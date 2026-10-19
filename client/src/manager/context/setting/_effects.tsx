import {createContext, useContext, useEffect} from 'react'

import type {FC, PropsWithChildren} from 'react'
import {useSettingCallbacksContext} from './_callbacks'
import {useRecordActions} from '@redux'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const SettingEffectsContext = createContext<ContextType>({})

export const useSettingEffectsContext = () => useContext(SettingEffectsContext)

export const SettingEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {setLeagueArr} = useRecordActions()
  const {getLeagueArr} = useSettingCallbacksContext()

  // 자동 갱신: 리그 목록 불러오기
  useEffect(() => {
    getLeagueArr().then(res => {
      const {isSuccess} = res

      if (isSuccess) {
        const {leagueArr} = res
        setLeagueArr(leagueArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[SettingEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [])

  //
  return <SettingEffectsContext.Provider value={{}}>{children}</SettingEffectsContext.Provider>
}
