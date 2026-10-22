import {UltimateStatesProvider} from './__states'
import {UltimateCallbacksProvider} from './_callbacks'
import {UltimateEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const UltimateProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <UltimateStatesProvider>
      <UltimateCallbacksProvider>
        <UltimateEffectsProvider>{children}</UltimateEffectsProvider>
      </UltimateCallbacksProvider>
    </UltimateStatesProvider>
  )
}
