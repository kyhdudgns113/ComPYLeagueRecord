import {createContext, useContext, useEffect, useEffectEvent} from 'react'
import {useLocation} from 'react-router-dom'

import {useBaseActions, useRecordActions, useSettingActions} from '@redux'

import type {FC, PropsWithChildren} from 'react'

/**
 * 초기화할 상태들을 true 로 설정하고 resetStates 함수의 인자로 전달한다
 * - 초기화할 상태들을 놓치는 일을 방지하고자함
 */
type ResetStatesType = {
  leagueNum: boolean
  teamIdx: boolean
}

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const URLEffectsContext = createContext<ContextType>({})

export const useURLEffectsContext = () => useContext(URLEffectsContext)

export const URLEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {clearLefterTab, setLefterPitchRecord, setLefterSetting} = useBaseActions()
  const {clearLeagueNum, setLeagueNum} = useRecordActions()
  const {setTeamIdx, clearTeamIdx} = useSettingActions()
  const location = useLocation()

  const resetStates = useEffectEvent((arg: ResetStatesType) => {
    /**
     * 초기화 해줘야 할 값을 놓치는 일을 방지하고자함
     */
    if (arg.leagueNum) {
      clearLeagueNum()
    }
    if (arg.teamIdx) {
      clearTeamIdx()
    }
  })

  const processPitchRecord = useEffectEvent(() => {
    setLefterPitchRecord()
    resetStates({leagueNum: true, teamIdx: true})
  })

  const processSetting = useEffectEvent((splitArr: string[]) => {
    setLefterSetting()
    if (splitArr.length > 1) {
      const leagueNum = parseInt(splitArr[1])
      if (!isNaN(leagueNum)) {
        setLeagueNum(leagueNum)

        if (splitArr.length > 2) {
          const teamIdx = parseInt(splitArr[2])
          if (!isNaN(teamIdx)) {
            setTeamIdx(teamIdx)
          } // ::
          else {
            resetStates({leagueNum: false, teamIdx: true})
          }
        } // ::
        else {
          resetStates({leagueNum: false, teamIdx: true})
        }
      } // ::
      else {
        resetStates({leagueNum: true, teamIdx: true})
      }
    } // ::
    else {
      resetStates({leagueNum: true, teamIdx: true})
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
          resetStates({leagueNum: true, teamIdx: true})
          break
      }
    } // ::
    else {
      clearLefterTab()
      resetStates({leagueNum: true, teamIdx: true})
    }
  }, [location])

  //
  return <URLEffectsContext.Provider value={{}}>{children}</URLEffectsContext.Provider>
}
