import type {FC} from 'react'
import type {DivCommonProps} from '@prop'

import * as CT from '@commonType'
import * as V from '@value'

import './ZoneGridObject.scss'

type ZoneGridObjectProps = DivCommonProps & {
  onClickLocation: (location: CT.Type_Location) => (e: React.MouseEvent<HTMLButtonElement>) => void
  selectedLocation: CT.Type_Location | null
}

export const ZoneGridObject: FC<ZoneGridObjectProps> = ({onClickLocation, selectedLocation, ...props}) => {
  return (
    <div className={`Zone_Grid_Modal`} {...props}>
      {V.ZONE_GRID.map((row, rowIdx) => (
        <div className={`Zone_Row_Modal`} key={rowIdx}>
          {row.map(location => (
            <button
              className={`Zone_Cell_Modal ${V.STRIKE_ZONE_SET.has(location) ? 'strike' : 'ball'} ${selectedLocation === location ? 'selected' : ''}`}
              key={location}
              onClick={onClickLocation(location)}
              type="button"
            >
              {location}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}
