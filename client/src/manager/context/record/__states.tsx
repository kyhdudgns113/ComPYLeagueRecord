import {createContext, useContext} from 'react'

import type {FC, PropsWithChildren} from 'react'

// prettier-ignore
type ContextType = {

}
// prettier-ignore
export const RecordStatesContext = createContext<ContextType>({

})

export const useRecordStatesContext = () => useContext(RecordStatesContext)

export const RecordStatesProvider: FC<PropsWithChildren> = ({children}) => {
  // prettier-ignore
  const value: ContextType = {

  }

  return <RecordStatesContext.Provider value={value}>{children}</RecordStatesContext.Provider>
}
