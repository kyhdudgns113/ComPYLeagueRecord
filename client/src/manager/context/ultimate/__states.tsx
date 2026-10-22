import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {

}
// prettier-ignore
export const UltimateStatesContext = createContext<ContextType>({

})

export const useUltimateStatesContext = () => useContext(UltimateStatesContext)

export const UltimateStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {

  }

  return <UltimateStatesContext.Provider value={value}>{children}</UltimateStatesContext.Provider>
}
