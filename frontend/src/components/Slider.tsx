import { useId, type ComponentPropsWithRef, type CSSProperties } from 'react'
import { cx } from './cx'

export interface SliderProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'value' | 'onChange' | 'min' | 'max'> {
  label: string
  hideLabel?: boolean
  value: number
  onValueChange?: (value: number) => void
  min?: number
  max?: number
  step?: number
  /** Show the current value beside the label. */
  showValue?: boolean
  /** Formats the visible value and the value read out by screen readers. */
  formatValue?: (value: number) => string
  /** `glow` (Ember) for brightness, `neutral` (Slate) for other values. */
  tone?: 'glow' | 'neutral'
}

export function Slider({
  label,
  hideLabel = false,
  value,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = false,
  formatValue = (v) => String(v),
  tone = 'glow',
  className,
  id,
  ...rest
}: SliderProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const percent = max > min ? ((value - min) / (max - min)) * 100 : 0
  const text = formatValue(value)

  return (
    <div className={cx('cave-slider', tone === 'neutral' && 'cave-slider--neutral', className)}>
      {(!hideLabel || showValue) && (
        <div className="cave-slider__header">
          <label
            htmlFor={inputId}
            className={hideLabel ? 'cave-visually-hidden' : 'cave-slider__label'}
          >
            {label}
          </label>
          {showValue && (
            <output htmlFor={inputId} className="cave-slider__value" aria-hidden="true">
              {text}
            </output>
          )}
        </div>
      )}
      <input
        id={inputId}
        type="range"
        className="cave-slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={hideLabel && !showValue ? label : undefined}
        aria-valuetext={text}
        style={{ '--_pct': `${percent}%` } as CSSProperties}
        onChange={(event) => onValueChange?.(Number(event.target.value))}
        {...rest}
      />
    </div>
  )
}
