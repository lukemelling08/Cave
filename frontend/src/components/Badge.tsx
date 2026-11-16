import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export interface BadgeProps extends ComponentPropsWithRef<'span'> {
  tone?: 'neutral' | 'success' | 'danger' | 'glow'
  /** Leading dot. Always shown for the glow tone, since Ember is never used as text. */
  dot?: boolean
}

export function Badge({ tone = 'neutral', dot, className, children, ...rest }: BadgeProps) {
  const showDot = dot ?? tone === 'glow'
  return (
    <span
      className={cx('cave-badge', tone !== 'neutral' && `cave-badge--${tone}`, className)}
      {...rest}
    >
      {showDot && <span className="cave-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  )
}
