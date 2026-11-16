import type { ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon } from './Icon'
import { NavLink, type NavItem } from './Tabs'

export interface BottomNavProps extends Omit<ComponentPropsWithRef<'nav'>, 'onChange'> {
  /** Every item needs an icon. */
  items: Array<NavItem & { icon: NonNullable<NavItem['icon']> }>
  value: string
  onValueChange?: (id: string) => void
  /** Pin to the bottom of the viewport on small screens and hide from 768px up. Default true. */
  fixed?: boolean
  'aria-label': string
}

export function BottomNav({
  items,
  value,
  onValueChange,
  fixed = true,
  className,
  ...rest
}: BottomNavProps) {
  return (
    <nav
      className={cx('cave-bottom-nav', fixed && 'cave-bottom-nav--fixed', className)}
      {...rest}
    >
      <ul className="cave-bottom-nav__list">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              item={item}
              current={item.id === value}
              className="cave-bottom-nav__item"
              onSelect={onValueChange}
            >
              <span className="cave-bottom-nav__indicator">
                <Icon name={item.icon} size={22} />
              </span>
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
