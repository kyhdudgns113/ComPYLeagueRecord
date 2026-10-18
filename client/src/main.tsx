import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {store} from '@redux'

import App from './App.tsx'

import './base/styles/index.css'
import {URLProvider} from './manager/context/index.ts'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <URLProvider>
        <App />
      </URLProvider>
    </Provider>
  </BrowserRouter>
)
