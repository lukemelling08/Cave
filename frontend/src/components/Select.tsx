import { useId, type ComponentPropsWithRef } from 'react'
import { describedBy } from './describedBy'
import { Field, type FieldBaseProps } from './Field'
import { Icon } from './Icon'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends Omit<FieldBaseProps, 'suffix'>,
    Omit<ComponentPropsWithRef<'select'>, 'prefix'> {
  options: SelectOption[]
}

export function Select({
  label,
  hint,
  error,
  prefix,
  options,
  id,
  className,
  disabled,
  ...rest
}: SelectProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  return (
    <Field {...{ label, hint, error, prefix, inputId, hintId, errorId, disabled, className }}>
      <select
        id={inputId}
        className="cave-field__input cave-field__input--select"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon name="chevronDown" size={18} className="cave-field__chevron" />
    </Field>
  )
}
