import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'

export interface StatCardProps extends ComponentPropsWithRef<'div'> {
  label: string
  value: number | string
  unit?: string
  /** For example "12% less than last week". */
  comparison?: string
  comparisonTone?: 'neutral' | 'success' | 'danger'
}

export function StatCard({
  label,
  value,
  unit,
  comparison,
  comparisonTone = 'neutral',
  className,
  ...rest
}: StatCardProps) {
  return (
    <div className={cx('cave-stat-card', className)} {...rest}>
      <div className="cave-stat-card__label">{label}</div>
      <div className="cave-stat-card__value">
        <span className="cave-stat-card__number">{value}</span>
        {unit && <span className="cave-stat-card__unit">{unit}</span>}
      </div>
      {comparison && (
        <div
          className={cx(
            'cave-stat-card__comparison',
            comparisonTone !== 'neutral' && `cave-stat-card__comparison--${comparisonTone}`,
          )}
        >
          {comparison}
        </div>
      )}
    </div>
  )
}
