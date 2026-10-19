import {useDispatch, useSelector} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

import * as Slices from './slices'

export const store = configureStore({
  reducer: {
    base: Slices.BaseSlice.reducer,
    modal: Slices.ModalSlice.reducer,
    record: Slices.RecordSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['file/setFile', 'comment/setCommentReplyArr'],
        ignoredPaths: ['file', 'comment'],
      },
    }),
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppState>()
