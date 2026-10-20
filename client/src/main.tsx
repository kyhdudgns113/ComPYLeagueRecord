import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {RecordProvider, SettingProvider, URLProvider} from '@context'
import {store} from '@redux'

import App from './App.tsx'

import './base/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SettingProvider>
        <RecordProvider>
          <URLProvider>
            <App />
          </URLProvider>
        </RecordProvider>
      </SettingProvider>
    </Provider>
  </BrowserRouter>
)
