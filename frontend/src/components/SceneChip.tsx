import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon, type IconName } from './Icon'

export interface SceneChipProps extends ComponentPropsWithRef<'button'> {
  selected?: boolean
  icon?: IconName
}

export function SceneChip({
  selected = false,
  icon,
  type = 'button',
  className,
  children,
  ...rest
}: SceneChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cx('cave-scene-chip', className)}
      {...rest}
    >
      {icon && <Icon name={icon} size={18} />}
      {children}
    </button>
  )
}
