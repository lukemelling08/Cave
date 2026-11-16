import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon, type IconName } from './Icon'
import { Switch } from './Switch'

export interface RoomTileProps extends ComponentPropsWithRef<'div'> {
  name: string
  lightsOn: number
  lightsTotal: number
  icon?: IconName
  /** Master toggle: turns every light in the room on or off. */
  onToggleAll?: (on: boolean) => void
  /** Makes the room name a button that opens the room. */
  onOpen?: () => void
  disabled?: boolean
}

export function RoomTile({
  name,
  lightsOn,
  lightsTotal,
  icon = 'home',
  onToggleAll,
  onOpen,
  disabled = false,
  className,
  ...rest
}: RoomTileProps) {
  const lit = lightsOn > 0
  const status = lit ? `${lightsOn} of ${lightsTotal} on` : 'All off'

  return (
    <div className={cx('cave-room-tile', lit && 'cave-room-tile--lit', className)} {...rest}>
      <div className="cave-room-tile__top">
        <span className="cave-room-tile__icon">
          <Icon name={icon} size={22} />
        </span>
        <Switch
          label={`All lights in ${name}`}
          hideLabel
          checked={lit}
          onCheckedChange={onToggleAll}
          disabled={disabled}
        />
      </div>
      <div>
        <h3 className="cave-room-tile__name">
          {onOpen ? (
            <button type="button" className="cave-room-tile__open" onClick={onOpen}>
              {name}
            </button>
          ) : (
            name
          )}
        </h3>
        <p className="cave-room-tile__status">{status}</p>
      </div>
    </div>
  )
}
