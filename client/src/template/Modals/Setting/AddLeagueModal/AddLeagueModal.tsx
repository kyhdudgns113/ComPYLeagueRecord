import {useCallback, useState} from 'react'

import {Modal} from '@component'
import {useSettingCallbacksContext} from '@context'
import {useBatterActions, useLeagueArr, useModalActions, usePitcherActions, useRecordActions} from '@redux'

import type {FC} from 'react'
import type {ModalCommonProps} from '@prop'

import './AddLeagueModal.scss'

type AddLeagueModalProps = ModalCommonProps

export const AddLeagueModal: FC<AddLeagueModalProps> = ({...props}) => {
  const leagueArr = useLeagueArr()
  const {closeModal} = useModalActions()
  const {setMainBatter3DArr, setSubBatter3DArr} = useBatterActions()
  const {setCP3DArr, setRP3DArr, setSP3DArr} = usePitcherActions()
  const {setLeagueArr} = useRecordActions()
  const {addLeague} = useSettingCallbacksContext()

  const [description, setDescription] = useState<string>('')

  const newLeagueNum = leagueArr.length + 1

  const _submit = useCallback(
    (description: string, newLeagueNum: number) => {
      addLeague(description, newLeagueNum).then(res => {
        if (res.isSuccess) {
          const {CP3DArr, leagueArr, MainBatter3DArr, RP3DArr, SP3DArr, SubBatter3DArr} = res
          setLeagueArr(leagueArr)
          setMainBatter3DArr(MainBatter3DArr)
          setSubBatter3DArr(SubBatter3DArr)
          setCP3DArr(CP3DArr)
          setRP3DArr(RP3DArr)
          setSP3DArr(SP3DArr)
          closeModal()
        } // ::
        else {
          if (res.errMsg) {
            alert(`[AddLeagueModal] ${res.errMsg}`)
          }
        }
      })
    },
    [addLeague, closeModal, setCP3DArr, setLeagueArr, setMainBatter3DArr, setRP3DArr, setSP3DArr, setSubBatter3DArr]
  )

  const onClickSubmit = useCallback(
    (description: string, newLeagueNum: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      _submit(description, newLeagueNum)
    },
    [_submit]
  )

  const onKeyDownModal = useCallback(
    (description: string, newLeagueNum: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'Enter':
          _submit(description, newLeagueNum)
          break
        case 'Escape':
          closeModal()
          break
      }
    },
    [_submit]
  )

  return (
    <Modal className={`AddLeagueModal`} onClose={closeModal} onKeyDown={onKeyDownModal(description, newLeagueNum)} {...props}>
      {/* 1. 타이틀 */}
      <p className={`Title_Modal`}>{`리그 ${leagueArr.length + 1} 추가`}</p>

      {/* 2. 입력행: 설명 */}
      <div className={`Input_Row_Modal`}>
        <p className={`Input_Label_Modal`}>설명</p>
        <input
          autoFocus={true}
          className={`Input_Modal`}
          onChange={e => setDescription(e.target.value)}
          tabIndex={0}
          type="text"
          value={description}
        />
      </div>

      {/* 3. 버튼 행 */}
      <div className={`Button_Row_Modal`}>
        <button className={`Button_Modal`} onClick={onClickSubmit(description, newLeagueNum)}>
          추가
        </button>
        <button className={`Button_Modal`} onClick={closeModal}>
          취소
        </button>
      </div>
    </Modal>
  )
}
