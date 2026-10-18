import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'

import {store} from '@redux'

import {Template} from './template'

import './base/styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Template />
      </Provider>
    </BrowserRouter>
  )
}

export default App
