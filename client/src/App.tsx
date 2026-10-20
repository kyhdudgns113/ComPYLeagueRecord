import {Route, Routes} from 'react-router-dom'

import {Template} from './template'

import * as P from './pages'

import './base/styles/App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<P.RedirectHomePage />} />

      <Route path="/main/*" element={<Template />}>
        <Route index element={<P.IntroPage />} />

        <Route path="setting/*">
          <Route index element={<P.SettingPage />} />
          <Route path=":leagueNum/*">
            <Route index element={<P.SettingPage />} />
            <Route path=":teamIdx" element={<P.SettingPage />} />
          </Route>
        </Route>

        <Route path="pitchRecord/*">
          <Route index element={<P.PitchRecordPage />} />
          <Route path=":leagueNum/*">
            <Route index element={<P.PitchRecordPage />} />
            <Route path=":gameNum" element={<P.PitchRecordPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
