import {createContext, useContext, useEffect} from 'react'

import type {FC, PropsWithChildren} from 'react'
import {useSettingCallbacksContext} from './_callbacks'
import {useBatterActions, usePitcherActions, useRecordActions} from '@redux'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const SettingEffectsContext = createContext<ContextType>({})

export const useSettingEffectsContext = () => useContext(SettingEffectsContext)

export const SettingEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {setMainBatter3DArr, setSubBatter3DArr} = useBatterActions()
  const {setCP3DArr, setRP3DArr, setSP3DArr} = usePitcherActions()
  const {setLeagueArr} = useRecordActions()
  const {getBatter3DArrAll, getLeagueArr, getPitcher3DArrAll} = useSettingCallbacksContext()

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

  // 자동 갱신: 타자 3DArr 불러오기
  useEffect(() => {
    getBatter3DArrAll().then(res => {
      const {isSuccess} = res
      if (isSuccess) {
        const {MainBatter3DArr, SubBatter3DArr} = res
        setMainBatter3DArr(MainBatter3DArr)
        setSubBatter3DArr(SubBatter3DArr)
      } // ::
      else {
        if (res.errMsg) {
          alert(`[SettingEffect]: ${res.errMsg}`)
        }
      }
    })
  }, [])

  // 자동 갱신: 투수 3DArr 불러오기
  useEffect(() => {
    getPitcher3DArrAll().then(res => {
      const {isSuccess} = res
      if (isSuccess) {
        const {CP3DArr, RP3DArr, SP3DArr} = res
        setCP3DArr(CP3DArr)
        setRP3DArr(RP3DArr)
        setSP3DArr(SP3DArr)
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
