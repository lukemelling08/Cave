import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'
import { Icon, type IconName } from './Icon'

export interface EmptyStateProps extends ComponentPropsWithRef<'div'> {
  icon: IconName
  /** One line explaining what is missing. */
  message: string
  /** Usually a single Button. */
  action?: ReactNode
}

export function EmptyState({ icon, message, action, className, ...rest }: EmptyStateProps) {
  return (
    <div className={cx('cave-empty-state', className)} {...rest}>
      <span className="cave-empty-state__icon">
        <Icon name={icon} size={26} />
      </span>
      <p className="cave-empty-state__message">{message}</p>
      {action}
    </div>
  )
}
