import {useCallback} from 'react'
import {useNavigate} from 'react-router-dom'

import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import './PitchRecordRow.scss'
import {useBaseStates} from '@redux'

type PitchRecordRowProps = DivCommonProps

export const PitchRecordRow: FC<PitchRecordRowProps> = ({...props}) => {
  const {lefterTab} = useBaseStates()

  const navigate = useNavigate()

  const onClickRow = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()

    navigate('/main/pitchRecord')
  }, [])

  return (
    <div className={`PitchRecordRow ${lefterTab === 'PitchRecord' && '_selected'}`} onClick={onClickRow} {...props}>
      <p className={`Title_Row`}>Pitch Record</p>
    </div>
  )
}
