import {URLEffectsProvider} from './_effects'

import type {FC, PropsWithChildren} from 'react'

export const URLProvider: FC<PropsWithChildren> = ({children}) => {
  return <URLEffectsProvider>{children}</URLEffectsProvider>
}
