import type { SVGProps } from 'react'
import { cx } from './cx'

const paths = {
  bulb: [
    'M9 18h6',
    'M10 21.5h4',
    'M12 2.5a6.5 6.5 0 0 0-3.9 11.7c.56.42.9 1.08.9 1.78V16.5h6v-.52c0-.7.34-1.36.9-1.78A6.5 6.5 0 0 0 12 2.5z',
  ],
  power: ['M12 3v8', 'M17.66 6.34a8 8 0 1 1-11.32 0'],
  home: ['M3.5 10.5 12 3.5l8.5 7', 'M5.5 9v10.5a1 1 0 0 0 1 1H10v-5.5h4v5.5h3.5a1 1 0 0 0 1-1V9'],
  chart: ['M4 20.5h16', 'M6.5 16.5v-5', 'M11 16.5v-11', 'M15.5 16.5v-7', 'M20 16.5v-3'],
  settings: [
    'M4 7h9',
    'M19 7h1',
    'M18.5 7a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0',
    'M4 17h3',
    'M13 17h7',
    'M12.5 17a2.5 2.5 0 1 1-5 0a2.5 2.5 0 1 1 5 0',
  ],
  close: ['M18 6 6 18', 'M6 6l12 12'],
  plus: ['M12 5v14', 'M5 12h14'],
  check: ['M20 6.5 9 17.5l-5-5'],
  alert: ['M12 8v4.5', 'M12 16h.01', 'M21 12a9 9 0 1 1-18 0a9 9 0 1 1 18 0'],
  sun: [
    'M16 12a4 4 0 1 1-8 0a4 4 0 1 1 8 0',
    'M12 2.5v2',
    'M12 19.5v2',
    'M5.28 5.28l1.41 1.41',
    'M17.31 17.31l1.41 1.41',
    'M2.5 12h2',
    'M19.5 12h2',
    'M5.28 18.72l1.41-1.41',
    'M17.31 6.69l1.41-1.41',
  ],
  moon: ['M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
  bolt: ['M13 2.5 4.5 13.5H11l-1 8 8.5-11H12l1-8z'],
  sofa: [
    'M5 10.5V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2.5',
    'M3 12.5a1.75 1.75 0 0 1 3.5 0V15h11v-2.5a1.75 1.75 0 0 1 3.5 0v4.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17z',
    'M5.5 18.5v1.5',
    'M18.5 18.5v1.5',
  ],
  bed: [
    'M3 6v14',
    'M3 16h18',
    'M21 20v-6.5a3 3 0 0 0-3-3h-7.5V16',
    'M8.5 12.75a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 1 1 3.5 0',
  ],
  sunset: ['M12 3v5', 'M8.5 6.5 12 3l3.5 3.5', 'M17 17a5 5 0 0 0-10 0', 'M3 17h2', 'M19 17h2', 'M3 21h18'],
  menu: ['M4 6.5h16', 'M4 12h16', 'M4 17.5h16'],
  grid: [
    'M4 5a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
    'M13.5 5a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1z',
    'M4 14.5a1 1 0 0 1 1-1h4.5a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z',
    'M13.5 14.5a1 1 0 0 1 1-1H19a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1h-4.5a1 1 0 0 1-1-1z',
  ],
  chevronDown: ['M6 9l6 6 6-6'],
  undo: ['M9 14 4 9l5-5', 'M4 9h10.5a5.5 5.5 0 0 1 0 11H11'],
} as const

export type IconName = keyof typeof paths

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName
  size?: number
  /** Gives the icon an accessible name. Without it the icon is hidden from assistive tech. */
  label?: string
}

/** 24px stroke icon: 1.75px stroke with round caps and joins. */
export function Icon({ name, size = 24, label, className, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cx('cave-icon', className)}
      aria-hidden={label ? undefined : true}
      role={label ? 'img' : undefined}
      aria-label={label}
      focusable="false"
      {...rest}
    >
      {paths[name].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
