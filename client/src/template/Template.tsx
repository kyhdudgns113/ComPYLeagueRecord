import {useEffect} from 'react'
import {Outlet} from 'react-router-dom'

import {useBaseStates, useModalStates} from '@redux'
import {writeStringP} from '@util'

import {Footer} from './Footer'
import {Header} from './Header'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as PR from './Modals/PitchRecord'
import * as S from './Modals/Setting'
import * as U from './Modals/Ultimate'

import './Template.scss'

type TemplateProps = DivCommonProps

export const Template: FC<TemplateProps> = ({...props}) => {
  const {themeMode} = useBaseStates()
  const {modalType} = useModalStates()

  // html 테마 클래스와 localStorage 동기화
  useEffect(() => {
    document.documentElement.classList.remove('_theme-dark', '_theme-light')
    document.documentElement.classList.add(`_theme-${themeMode}`)
    writeStringP('themeMode', themeMode)
  }, [themeMode])

  return (
    <div className={`Template _theme-${themeMode}`} {...props}>
      {/* 1. 헤더 */}
      <Header />

      {/* 2. 몸통 */}
      <div className={`Body_Template`}>
        <Lefter />
        <div className={`PageArea_Template`}>
          <Outlet />
        </div>
      </div>

      {/* 3. 푸터 */}
      <Footer />

      {/* 4. 모달 영역 */}
      {modalType === 'AddGame' && <PR.AddGameModal />}
      {modalType === 'EditRecord' && <PR.EditRecordModal />}

      {modalType === 'AddBatter' && <S.AddBatterModal />}
      {modalType === 'AddLeague' && <S.AddLeagueModal />}
      {modalType === 'AddPitcher' && <S.AddPitcherModal />}
      {modalType === 'ModifyBatter' && <S.ModifyBatterModal />}
      {modalType === 'ModifyPitcher' && <S.ModifyPitcherModal />}

      {modalType === 'AddBatterTable' && <U.AddBatterTableModal />}
      {modalType === 'AddPitcherTable' && <U.AddPitcherTableModal />}
      {modalType === 'AddUltiBatter' && <U.AddUltiBatterModal />}
      {modalType === 'AddUltiLeague' && <U.AddUltiLeagueModal />}
      {modalType === 'AddUltiPitcher' && <U.AddUltiPitcherModal />}
      {modalType === 'EditUltiRecordDesc' && <U.EditUltiRecordDescModal />}
    </div>
  )
}
