import type { ComponentPropsWithRef, CSSProperties } from 'react'
import { cx } from './cx'
import lockupFull from '../assets/brand/cave-lockup-full-colour.svg'
import lockupMonoDark from '../assets/brand/cave-lockup-one-colour-dark.svg'
import lockupMonoWhite from '../assets/brand/cave-lockup-one-colour-white.svg'
import lockupReversed from '../assets/brand/cave-lockup-reversed.svg'
import markFull from '../assets/brand/cave-mark-full-colour.svg'
import markMonoDark from '../assets/brand/cave-mark-one-colour-dark.svg'
import markMonoWhite from '../assets/brand/cave-mark-one-colour-white.svg'
import markReversed from '../assets/brand/cave-mark-reversed.svg'
import wordmarkSlate from '../assets/brand/cave-wordmark-slate.svg'
import wordmarkWhite from '../assets/brand/cave-wordmark-white.svg'

export type LogoType = 'mark' | 'wordmark' | 'lockup'
export type LogoVariant = 'full' | 'reversed' | 'mono-dark' | 'mono-white'

const sources: Record<LogoType, Record<LogoVariant, string>> = {
  mark: {
    full: markFull,
    reversed: markReversed,
    'mono-dark': markMonoDark,
    'mono-white': markMonoWhite,
  },
  lockup: {
    full: lockupFull,
    reversed: lockupReversed,
    'mono-dark': lockupMonoDark,
    'mono-white': lockupMonoWhite,
  },
  // The wordmark only comes in slate and white.
  wordmark: {
    full: wordmarkSlate,
    reversed: wordmarkWhite,
    'mono-dark': wordmarkSlate,
    'mono-white': wordmarkWhite,
  },
}

const heights = { sm: 24, md: 32, lg: 48, xl: 72 }

export interface LogoProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  type?: LogoType
  /**
   * `full` for light backgrounds, `reversed` for dark ones. `auto` (default)
   * switches between them with the theme.
   */
  variant?: LogoVariant | 'auto'
  /** A preset or a height in pixels. */
  size?: keyof typeof heights | number
  /** Accessible name. Pass "" when the logo sits beside visible text that already says Cave. */
  label?: string
}

export function Logo({
  type = 'lockup',
  variant = 'auto',
  size = 'md',
  label = 'Cave',
  className,
  style,
  ...rest
}: LogoProps) {
  const height = typeof size === 'number' ? size : heights[size]
  const set = sources[type]

  return (
    <span
      className={cx('cave-logo', className)}
      style={{ '--_logo-height': `${height}px`, ...style } as CSSProperties}
      {...rest}
    >
      {variant === 'auto' ? (
        <>
          <img className="cave-logo__img cave-logo__img--on-light" src={set.full} alt={label} />
          <img className="cave-logo__img cave-logo__img--on-dark" src={set.reversed} alt={label} />
        </>
      ) : (
        <img className="cave-logo__img" src={set[variant]} alt={label} />
      )}
    </span>
  )
}
