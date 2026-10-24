import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@component'
import {useModalActions, useModalStates} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'
import type {TabType} from './parts'

import * as P from './parts'

import './EditRecordModal.scss'

type EditRecordModalProps = ModalCommonProps

export const EditRecordModal: FC<EditRecordModalProps> = ({...props}) => {
  const {editRecord} = useModalStates()
  const {closeModal} = useModalActions()

  const [tab, setTab] = useState<TabType>('기록')

  const onKeyDownModal = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    },
    [closeModal]
  )

  // 열린 타석이 바뀌면 기록 탭부터 다시 연다
  useEffect(() => {
    setTab('기록')
  }, [editRecord])

  return (
    <Modal className={`EditRecordModal`} onClose={closeModal} onKeyDown={onKeyDownModal} {...props}>
      {/* 1. 탭 행 */}
      <P.TabRowPart setTab={setTab} tab={tab} />

      {tab === '기록' && <P.RecordTabPart />}
      {tab === '정보' && <P.InfoTabPart />}
    </Modal>
  )
}
