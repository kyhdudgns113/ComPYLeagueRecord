import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import {useRecordCallbacksContext} from '@context'
import {useRecordActions, useRecordStates} from '@redux'

import type {FC} from 'react'
import type {ButtonCommonProps} from '@prop'

import './DeleteGameButton.scss'

type DeleteGameButtonProps = ButtonCommonProps

export const DeleteGameButton: FC<DeleteGameButtonProps> = ({...props}) => {
  const {gameNum, leagueNum} = useRecordStates()
  const {setGameArr} = useRecordActions()
  const {deleteGame} = useRecordCallbacksContext()
  const navigate = useNavigate()

  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()

      if (leagueNum === null || gameNum === null) {
        alert(`[DeleteGameButton] 리그와 게임을 먼저 선택하세요`)
        return
      }

      if (!confirm(`게임 ${gameNum} 을(를) 삭제할까요?`)) {
        return
      }

      deleteGame(gameNum, leagueNum).then(res => {
        if (res.isSuccess) {
          const {gameArr} = res
          setGameArr(gameArr)
          navigate(`/main/pitchRecord/${leagueNum}`)
        } // ::
        else {
          if (res.errMsg) {
            alert(`[DeleteGameButton] ${res.errMsg}`)
          }
        }
      })
    },
    [deleteGame, gameNum, leagueNum, navigate, setGameArr]
  )

  return (
    <button className={`DeleteGameButton`} onClick={onClickButton} type="button" {...props}>
      게임 삭제
    </button>
  )
}
