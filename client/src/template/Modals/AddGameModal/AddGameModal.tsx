import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useRecordCallbacksContext} from '@context'
import {useModalActions, useRecordActions, useRecordStates, useTeamPitcherArr} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as CT from '@commonType'
import * as E from './elements'
import * as HTTP from '@httpType'
import * as P from './parts'
import * as V from '@value'

import './AddGameModal.scss'

const ENEMY_TEAM_ARR = V.TEAM_IDX_ARR.filter(teamIdx => teamIdx !== V.MY_TEAM_IDX).map(teamIdx => V.TEAM_NAME[teamIdx])

type AddGameModalProps = ModalCommonProps

export const AddGameModal: FC<AddGameModalProps> = ({...props}) => {
  const {gameArr, leagueNum} = useRecordStates()
  const {closeModal} = useModalActions()
  const {setGameArr} = useRecordActions()
  const SPArr = useTeamPitcherArr(leagueNum || 0, V.MY_TEAM_IDX, '선발')
  const {addGame} = useRecordCallbacksContext()

  const [enemyTeam, setEnemyTeam] = useState<CT.Type_Team>(ENEMY_TEAM_ARR[0])
  const [SPName, setSPName] = useState<string>(SPArr[0]?.name || '')

  const newGameNum = gameArr.length + 1

  const _submit = useCallback(
    (enemyTeam: CT.Type_Team, leagueNum: number | null, SPName: string, arrLen: number) => {
      if (leagueNum === null) {
        alert(`[AddGameModal] leagueNum is null`)
        return
      }

      if (!SPName) {
        alert(`[AddGameModal] 선발투수를 선택하세요`)
        return
      }

      if (arrLen >= 144) {
        alert(`[AddGameModal] 게임은 최대 144개까지 생성할 수 있습니다.`)
        return
      }

      const data: HTTP.HTTP_AddGame = {
        arrLen,
        leagueNum,
        SPName,
        teamName: enemyTeam,
      }

      addGame(data).then(res => {
        if (res.isSuccess) {
          const {gameArr} = res
          setGameArr(gameArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddGameModal] ${res.errMsg}`)
          }
        }
      })
    },
    [addGame, closeModal, setGameArr]
  )

  const onClickSubmit = useCallback(
    (enemyTeam: CT.Type_Team, leagueNum: number | null, SPName: string, arrLen: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(enemyTeam, leagueNum, SPName, arrLen)
    },
    [_submit]
  )

  const onKeyDownModal = useCallback(
    (enemyTeam: CT.Type_Team, leagueNum: number | null, SPName: string, arrLen: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          _submit(enemyTeam, leagueNum, SPName, arrLen)
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    [_submit, closeModal]
  )

  // 선발투수 목록이 생기면 기본값 채움
  useEffect(() => {
    if (!SPName && SPArr[0]?.name) {
      setSPName(SPArr[0].name)
    }
  }, [SPArr, SPName])

  return (
    <Modal className={`AddGameModal`} onClose={closeModal} onKeyDown={onKeyDownModal(enemyTeam, leagueNum, SPName, gameArr.length)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`[리그 ${leagueNum || ''}] 게임 ${newGameNum} 추가`}</p>

      {/* 2. 입력행: 상대팀 */}
      <E.InputRow label="상대팀">
        <select className={`Select_Modal`} onChange={e => setEnemyTeam(e.target.value as CT.Type_Team)} tabIndex={0} value={enemyTeam}>
          {ENEMY_TEAM_ARR.map(teamName => (
            <option key={teamName} value={teamName}>
              {teamName}
            </option>
          ))}
        </select>
      </E.InputRow>

      {/* 3. 입력행: 선발투수 */}
      <E.InputRow label="선발투수">
        <select autoFocus={true} className={`Select_Modal`} onChange={e => setSPName(e.target.value)} tabIndex={0} value={SPName}>
          {SPArr.map(pitcher => (
            <option key={pitcher.pitcherOId} value={pitcher.name}>
              {pitcher.name}
            </option>
          ))}
        </select>
      </E.InputRow>

      {/* 4. 버튼 행 */}
      <P.ButtonRowPart onClickCancel={closeModal} onClickSubmit={onClickSubmit(enemyTeam, leagueNum, SPName, gameArr.length)} submitText="추가" />
    </Modal>
  )
}
