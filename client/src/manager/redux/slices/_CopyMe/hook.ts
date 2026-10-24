import {useAppSelector, useAppDispatch} from '@redux'

import {copyMeSlice} from './slice'

export const useCopyMeStates = () => useAppSelector(state => state.copyMe)

export const useCopyMeActions = () => {
  const dispatch = useAppDispatch()

  return {
    switchCopyMe: () => dispatch(copyMeSlice.actions.switchCopyMe()),
    setCountCopyMe: (count: number) => dispatch(copyMeSlice.actions.setCountCopyMe(count)),
    setArgsCopyMe: (count: number, name: string) => dispatch(copyMeSlice.actions.setArgsCopyMe({count, name})),
  }
}

// export const useCopyMeCount = () => useAppSelector(state => state.copyMe.count)
