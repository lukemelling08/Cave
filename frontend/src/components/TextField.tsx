import { useId, type ComponentPropsWithRef } from 'react'
import { describedBy } from './describedBy'
import { Field, type FieldBaseProps } from './Field'

export interface TextFieldProps
  extends FieldBaseProps,
    Omit<ComponentPropsWithRef<'input'>, 'prefix'> {}

export function TextField({
  label,
  hint,
  error,
  prefix,
  suffix,
  id,
  className,
  disabled,
  type = 'text',
  ...rest
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`

  return (
    <Field
      {...{ label, hint, error, prefix, suffix, inputId, hintId, errorId, disabled, className }}
    >
      <input
        id={inputId}
        type={type}
        className="cave-field__input"
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(hint, error, hintId, errorId)}
        {...rest}
      />
    </Field>
  )
}
