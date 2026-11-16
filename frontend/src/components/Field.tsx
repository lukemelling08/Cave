import type { ReactNode } from 'react'
import { cx } from './cx'
import { Icon } from './Icon'

export interface FieldBaseProps {
  label: string
  hint?: string
  /** Say what went wrong and how to fix it. */
  error?: string
  /** Shown inside the control, before the value. */
  prefix?: ReactNode
  /** Shown inside the control, after the value, for units like "p/kWh". */
  suffix?: ReactNode
}

interface FieldProps extends FieldBaseProps {
  inputId: string
  hintId: string
  errorId: string
  disabled?: boolean
  className?: string
  children: ReactNode
}

/** Shared wrapper for TextField and Select. */
export function Field({
  label,
  hint,
  error,
  prefix,
  suffix,
  inputId,
  hintId,
  errorId,
  disabled,
  className,
  children,
}: FieldProps) {
  return (
    <div
      className={cx(
        'cave-field',
        error && 'cave-field--invalid',
        disabled && 'cave-field--disabled',
        className,
      )}
    >
      <label htmlFor={inputId} className="cave-field__label">
        {label}
      </label>
      <div className="cave-field__control">
        {prefix && <span className="cave-field__affix cave-field__affix--prefix">{prefix}</span>}
        {children}
        {suffix && <span className="cave-field__affix cave-field__affix--suffix">{suffix}</span>}
      </div>
      {hint && (
        <p id={hintId} className="cave-field__hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="cave-field__error">
          <Icon name="alert" size={16} />
          {error}
        </p>
      )}
    </div>
  )
}
