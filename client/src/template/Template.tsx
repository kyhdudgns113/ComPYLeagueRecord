import {Outlet} from 'react-router-dom'

import {useModalStates} from '@redux'

import {Header} from './Header'
import {Footer} from './Footer'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as M from './Modals'

import './Template.scss'

type TemplateProps = DivCommonProps

export const Template: FC<TemplateProps> = ({...props}) => {
  const {modalType} = useModalStates()

  return (
    <div className={`Template`} {...props}>
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
      {modalType === 'AddBatter' && <M.AddBatterModal />}
      {modalType === 'AddGame' && <M.AddGameModal />}
      {modalType === 'AddLeague' && <M.AddLeagueModal />}
      {modalType === 'AddPitcher' && <M.AddPitcherModal />}
      {modalType === 'ModifyBatter' && <M.ModifyBatterModal />}
      {modalType === 'ModifyPitcher' && <M.ModifyPitcherModal />}
    </div>
  )
}
