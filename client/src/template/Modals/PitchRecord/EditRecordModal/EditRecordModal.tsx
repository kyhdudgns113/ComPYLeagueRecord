import {useCallback} from 'react'

import {Modal} from '@component'
import {useModalActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import * as C from './bases'
import * as P from './parts'

import './EditRecordModal.scss'

type EditRecordModalProps = ModalCommonProps

export const EditRecordModal: FC<EditRecordModalProps> = ({...props}) => {
  const {closeModal} = useModalActions()

  const onKeyDownModal = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      closeModal()
    }
  }, [])

  return (
    <Modal className={`EditRecordModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      <C.EditRecordModalProvider>
        {/* 1. 타이틀 */}
        <Title />

        {/* 2. 본문 */}
        <div className={`Body_Row_Modal`}>
          <div className={`Body_Left_Modal`}>
            <P.PrevPitchResultPart />
            <P.InfoTabPart />
          </div>
          <P.RecordTabPart />
        </div>

        {/* 3. 버튼 행 */}
        <ButtonRow />
      </C.EditRecordModalProvider>
    </Modal>
  )
}

const Title: FC = () => {
  const {editRecord, selectedBatter} = C.useEditRecordModalContext()

  const name = selectedBatter?.name || editRecord?.batter.name || ''
  const rotation = editRecord?.rotation || 0
  const hasPressure = selectedBatter?.hasPressureSkill ?? !!editRecord?.batter.hasPressureSkill
  const title = `${name}_${rotation}${hasPressure ? '(위)' : ''}`

  return <p className={`Title_Modal`}>{title}</p>
}

const ButtonRow: FC = () => {
  const {
    editRecord,
    gameNum,
    isStealFail,
    leagueNum,
    onClickAdd,
    onClickClose,
    pitchArr,
    pitcherName,
    record,
    result,
    selectedBall,
    selectedBatter,
    selectedLocation,
  } = C.useEditRecordModalContext()

  return (
    <div className={`Button_Row_Modal`}>
      <button
        className={`Button_Modal`}
        onClick={onClickAdd(
          pitchArr,
          selectedBall,
          selectedLocation,
          editRecord,
          gameNum,
          isStealFail,
          leagueNum,
          pitcherName,
          record,
          result,
          selectedBatter
        )}
        type="button"
      >
        추가
      </button>
      <button className={`Button_Modal`} onClick={onClickClose} type="button">
        닫기
      </button>
    </div>
  )
}
