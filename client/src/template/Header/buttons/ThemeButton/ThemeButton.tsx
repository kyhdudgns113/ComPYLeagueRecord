import {useCallback} from 'react'

import {Icon} from '@component'
import {useBaseActions, useBaseStates} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './ThemeButton.scss'

type ThemeButtonProps = ButtonCommonProps

export const ThemeButton: FC<ThemeButtonProps> = ({...props}) => {
  const {themeMode} = useBaseStates()
  const {toggleThemeMode} = useBaseActions()

  const onClickTheme = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleThemeMode()
  }, [])

  const isDark = themeMode === 'dark'

  return (
    <button className={`ThemeButton`} onClick={onClickTheme} type="button" {...props}>
      <Icon className={`ThemeIcon_Button`} iconName={isDark ? 'light_mode' : 'dark_mode'} />
      <span className={`ThemeLabel_Button`}>{isDark ? '일반모드' : '다크모드'}</span>
    </button>
  )
}
