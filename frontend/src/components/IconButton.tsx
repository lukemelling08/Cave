import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon, type IconName } from './Icon'

export interface IconButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  icon: IconName
  /** Required: icon-only buttons need an accessible name. */
  'aria-label': string
  variant?: 'ghost' | 'secondary' | 'primary'
}

export function IconButton({
  icon,
  variant = 'ghost',
  type = 'button',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'cave-icon-button',
        variant !== 'ghost' && `cave-icon-button--${variant}`,
        className,
      )}
      {...rest}
    >
      <Icon name={icon} size={22} />
    </button>
  )
}
