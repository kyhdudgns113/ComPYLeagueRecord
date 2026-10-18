import {Outlet} from 'react-router-dom'

import {Header} from './Header'
import {Footer} from './Footer'
import {Lefter} from './Lefter'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './Template.scss'

type TemplateProps = DivCommonProps

export const Template: FC<TemplateProps> = ({...props}) => {
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
    </div>
  )
}
