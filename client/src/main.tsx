import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'

import {RecordProvider, SettingProvider, UltimateProvider, URLProvider} from '@context'
import {store} from '@redux'

import App from './App.tsx'

import './base/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SettingProvider>
        <RecordProvider>
          <UltimateProvider>
            <URLProvider>
              <App />
            </URLProvider>
          </UltimateProvider>
        </RecordProvider>
      </SettingProvider>
    </Provider>
  </BrowserRouter>
)
