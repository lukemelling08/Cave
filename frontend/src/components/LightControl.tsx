import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon } from './Icon'
import { Slider } from './Slider'
import { Switch } from './Switch'

export interface LightControlProps extends Omit<ComponentPropsWithRef<'div'>, 'onToggle'> {
  name: string
  on: boolean
  /** Brightness from 0 to 100. */
  brightness: number
  /** Current draw in watts. */
  watts: number
  onToggle?: (on: boolean) => void
  onBrightnessChange?: (brightness: number) => void
  disabled?: boolean
}

const wattsFormat = new Intl.NumberFormat('en-GB', { maximumFractionDigits: 1 })

export function LightControl({
  name,
  on,
  brightness,
  watts,
  onToggle,
  onBrightnessChange,
  disabled = false,
  className,
  ...rest
}: LightControlProps) {
  return (
    <div className={cx('cave-light-control', on && 'cave-light-control--on', className)} {...rest}>
      <div className="cave-light-control__header">
        <span className="cave-light-control__icon">
          <Icon name="bulb" size={22} />
        </span>
        <div className="cave-light-control__text">
          <div className="cave-light-control__name">{name}</div>
          <div className="cave-light-control__watts">
            {on ? `${wattsFormat.format(watts)} W` : 'Off'}
          </div>
        </div>
        <Switch
          label={name}
          hideLabel
          checked={on}
          onCheckedChange={onToggle}
          disabled={disabled}
        />
      </div>
      <Slider
        label={`${name} brightness`}
        hideLabel
        value={brightness}
        onValueChange={onBrightnessChange}
        formatValue={(v) => `${v}%`}
        disabled={disabled || !on}
      />
    </div>
  )
}
