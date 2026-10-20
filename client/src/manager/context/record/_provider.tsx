import {RecordStatesProvider} from './__states'
import {RecordCallbacksProvider} from './_callbacks'
import {RecordEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const RecordProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <RecordStatesProvider>
      <RecordCallbacksProvider>
        <RecordEffectsProvider>{children}</RecordEffectsProvider>
      </RecordCallbacksProvider>
    </RecordStatesProvider>
  )
}
