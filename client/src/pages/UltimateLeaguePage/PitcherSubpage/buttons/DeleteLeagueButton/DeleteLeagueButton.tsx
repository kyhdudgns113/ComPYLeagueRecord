import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useUltimateCallbacksContext} from '@context'
import {useUltimateActions, useUltimateLeagueNum} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './DeleteLeagueButton.scss'

type DeleteLeagueButtonProps = ButtonCommonProps

export const DeleteLeagueButton: FC<DeleteLeagueButtonProps> = ({...props}) => {
  const leagueNum = useUltimateLeagueNum()
  const navigate = useNavigate()
  const {clearBatterTableArr, clearLeagueNumUlti, clearPitcherTableArr, setLeagueArrUlti} = useUltimateActions()
  const {deleteLeague} = useUltimateCallbacksContext()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (leagueNum === null) {
        alert(`[DeleteLeagueButton] 리그를 먼저 선택하세요`)
        return
      }

      if (!confirm(`얼티리그 ${leagueNum} 을(를) 삭제할까요?`)) {
        return
      }

      deleteLeague(leagueNum).then(res => {
        if (res.isSuccess) {
          const {leagueArr} = res
          setLeagueArrUlti(leagueArr)
          clearBatterTableArr()
          clearPitcherTableArr()
          clearLeagueNumUlti()
          navigate('/main/ultimateLeague')
        } // ::
        else {
          if (res.errMsg) {
            alert(`[DeleteLeagueButton] ${res.errMsg}`)
          }
        }
      })
    },
    [clearBatterTableArr, clearLeagueNumUlti, clearPitcherTableArr, deleteLeague, leagueNum, navigate, setLeagueArrUlti]
  )

  return (
    <button className={`DeleteLeagueButton`} onClick={onClickButton} type="button" {...props}>
      리그 삭제
    </button>
  )
}
