import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from './cx'

export interface CardProps extends Omit<ComponentPropsWithRef<'div'>, 'title'> {
  title?: ReactNode
  /** Heading level for the title. */
  titleAs?: 'h2' | 'h3' | 'h4'
  /** Slot on the right of the header, for a button or link. */
  action?: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

export function Card({
  title,
  titleAs: Title = 'h2',
  action,
  padding = 'md',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <div className={cx('cave-card', `cave-card--pad-${padding}`, className)} {...rest}>
      {(title || action) && (
        <div className="cave-card__header">
          {title && <Title className="cave-card__title">{title}</Title>}
          {action}
        </div>
      )}
      {children}
    </div>
  )
}
