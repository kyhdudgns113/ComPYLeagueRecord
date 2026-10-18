import {createContext, useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

import type {FC, PropsWithChildren} from 'react'
import {useBaseActions} from '@redux'

// prettier-ignore
type ContextType = {}
// prettier-ignore
export const URLEffectsContext = createContext<ContextType>({})

export const useURLEffectsContext = () => useContext(URLEffectsContext)

export const URLEffectsProvider: FC<PropsWithChildren> = ({children}) => {
  const {clearLefterTab, setLefterPitchRecord, setLefterSetting} = useBaseActions()
  const location = useLocation()

  // 자동 갱신: LefterTab
  useEffect(() => {
    const afterMain = location.pathname.split('/main/')

    if (afterMain.length > 1) {
      const lefterType = afterMain[1].split('/')[0]

      switch (lefterType) {
        case 'pitchRecord':
          setLefterPitchRecord()
          break
        case 'setting':
          setLefterSetting()
          break
        default:
          clearLefterTab()
          break
      }
    } // ::
    else {
      clearLefterTab()
    }
  }, [location])

  //
  return <URLEffectsContext.Provider value={{}}>{children}</URLEffectsContext.Provider>
}
