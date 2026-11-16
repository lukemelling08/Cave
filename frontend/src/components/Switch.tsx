import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export interface SwitchProps
  extends Omit<ComponentPropsWithRef<'button'>, 'onChange' | 'role' | 'aria-checked'> {
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Visible label. If hidden, it still names the switch for screen readers. */
  label: string
  hideLabel?: boolean
  /** `glow` (Ember) for light controls, `neutral` (Slate) for other settings. */
  tone?: 'glow' | 'neutral'
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  hideLabel = false,
  tone = 'glow',
  disabled,
  className,
  onClick,
  ...rest
}: SwitchProps) {
  return (
    <label
      className={cx(
        'cave-switch',
        tone === 'neutral' && 'cave-switch--neutral',
        disabled && 'cave-switch--disabled',
        className,
      )}
    >
      <span className={hideLabel ? 'cave-visually-hidden' : 'cave-switch__label'}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        className="cave-switch__control"
        onClick={(event) => {
          onClick?.(event)
          if (!event.defaultPrevented) onCheckedChange?.(!checked)
        }}
        {...rest}
      />
    </label>
  )
}
