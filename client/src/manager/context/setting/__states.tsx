import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {
  
}
// prettier-ignore
export const SettingStatesContext = createContext<ContextType>({
  
})

export const useSettingStatesContext = () => useContext(SettingStatesContext)

export const SettingStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {
    
  }

  return <SettingStatesContext.Provider value={value}>{children}</SettingStatesContext.Provider>
}
