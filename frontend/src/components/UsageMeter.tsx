import { useId, type ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export interface UsageMeterProps extends ComponentPropsWithRef<'div'> {
  label: string
  value: number
  budget: number
  /** Unit after each figure, such as "kWh" or "£". */
  unit?: string
  /** Put the unit before the figure (for currency). */
  unitBefore?: boolean
  maximumFractionDigits?: number
}

export function UsageMeter({
  label,
  value,
  budget,
  unit = 'kWh',
  unitBefore = false,
  maximumFractionDigits = 1,
  className,
  ...rest
}: UsageMeterProps) {
  const labelId = useId()
  const over = value > budget
  const percent = budget > 0 ? Math.min(value / budget, 1) * 100 : 0
  const number = new Intl.NumberFormat('en-GB', { maximumFractionDigits })
  const format = (n: number) =>
    unitBefore ? `${unit}${number.format(n)}` : `${number.format(n)} ${unit}`
  const note = over
    ? `${format(value - budget)} over budget`
    : `${format(budget - value)} left`

  return (
    <div className={cx('cave-usage-meter', over && 'cave-usage-meter--over', className)} {...rest}>
      <div className="cave-usage-meter__header">
        <span id={labelId} className="cave-usage-meter__label">
          {label}
        </span>
        <span className="cave-usage-meter__figures">
          {format(value)} of {format(budget)}
        </span>
      </div>
      <div
        className="cave-usage-meter__track"
        role="meter"
        aria-labelledby={labelId}
        aria-valuemin={0}
        aria-valuemax={Math.max(budget, value)}
        aria-valuenow={value}
        aria-valuetext={`${format(value)} of ${format(budget)}, ${note}`}
      >
        <div className="cave-usage-meter__fill" style={{ width: `${percent}%` }} />
      </div>
      <div className="cave-usage-meter__note" aria-hidden="true">
        {note}
      </div>
    </div>
  )
}
