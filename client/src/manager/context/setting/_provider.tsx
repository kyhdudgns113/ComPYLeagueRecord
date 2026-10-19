import {SettingStatesProvider} from './__states'
import {SettingCallbacksProvider} from './_callbacks'
import {SettingEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const SettingProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <SettingStatesProvider>
      <SettingCallbacksProvider>
        <SettingEffectsProvider>{children}</SettingEffectsProvider>
      </SettingCallbacksProvider>
    </SettingStatesProvider>
  )
}
