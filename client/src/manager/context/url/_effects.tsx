import {createContext, useContext, useEffect, useEffectEvent} from 'react'
import {useLocation} from 'react-router-dom'

import {useBaseActions, useSettingActions} from '@redux'

import type {FC, PropsWithChildren} from 'react'

/**
 * 초기화할 상태들을 true 로 설정하고 resetStates 함수의 인자로 전달한다
 * - 초기화할 상태들을 놓치는 일을 방지하고자함
 */
type ResetStatesType = {
  leagueNumSetting: boolean
  teamIdxSetting: boolean
}

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const URLEffectsContext = createContext<ContextType>({})

export const useURLEffectsContext = () => useContext(URLEffectsContext)

export const URLEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {clearLefterTab, setLefterPitchRecord, setLefterSetting} = useBaseActions()
  const {clearLeagueNumSetting, clearTeamIdxSetting, setLeagueNumSetting, setTeamIdxSetting} = useSettingActions()
  const location = useLocation()

  const resetStates = useEffectEvent((arg: ResetStatesType) => {
    /**
     * 초기화 해줘야 할 값을 놓치는 일을 방지하고자함
     */
    if (arg.leagueNumSetting) {
      clearLeagueNumSetting()
    }
    if (arg.teamIdxSetting) {
      clearTeamIdxSetting()
    }
  })

  const processPitchRecord = useEffectEvent(() => {
    setLefterPitchRecord()
    resetStates({leagueNumSetting: true, teamIdxSetting: true})
  })

  const processSetting = useEffectEvent((splitArr: string[]) => {
    setLefterSetting()
    if (splitArr.length > 1) {
      const leagueNum = parseInt(splitArr[1])
      if (!isNaN(leagueNum)) {
        setLeagueNumSetting(leagueNum)

        if (splitArr.length > 2) {
          const teamIdx = parseInt(splitArr[2])
          if (!isNaN(teamIdx)) {
            setTeamIdxSetting(teamIdx)
          } // ::
          else {
            resetStates({leagueNumSetting: false, teamIdxSetting: true})
          }
        } // ::
        else {
          resetStates({leagueNumSetting: false, teamIdxSetting: true})
        }
      } // ::
      else {
        resetStates({leagueNumSetting: true, teamIdxSetting: true})
      }
    } // ::
    else {
      resetStates({leagueNumSetting: true, teamIdxSetting: true})
    }
  })

  // 자동 갱신: LefterTab
  useEffect(() => {
    const afterMain = location.pathname.split('/main/')

    if (afterMain.length > 1) {
      const splitArr = afterMain[1].split('/')
      const lefterType = splitArr[0]

      switch (lefterType) {
        case 'pitchRecord':
          processPitchRecord()
          break
        case 'setting':
          processSetting(splitArr)
          break
        default:
          clearLefterTab()
          resetStates({leagueNumSetting: true, teamIdxSetting: true})
          break
      }
    } // ::
    else {
      clearLefterTab()
      resetStates({leagueNumSetting: true, teamIdxSetting: true})
    }
  }, [location])

  //
  return <URLEffectsContext.Provider value={{}}>{children}</URLEffectsContext.Provider>
}
