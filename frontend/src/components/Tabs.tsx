import type { ComponentPropsWithRef, MouseEvent, ReactNode } from 'react'
import { cx } from './cx'
import { Icon, type IconName } from './Icon'

export interface NavItem {
  id: string
  label: string
  icon?: IconName
  /** Renders a link. Without it the item is a button. */
  href?: string
  disabled?: boolean
}

export interface TabsProps extends Omit<ComponentPropsWithRef<'nav'>, 'onChange'> {
  items: NavItem[]
  /** The id of the current section. */
  value: string
  onValueChange?: (id: string) => void
  'aria-label': string
}

/** Section navigation. The current item is marked with aria-current="page". */
export function Tabs({ items, value, onValueChange, className, ...rest }: TabsProps) {
  return (
    <nav className={cx('cave-tabs', className)} {...rest}>
      <ul className="cave-tabs__list">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              item={item}
              current={item.id === value}
              className="cave-tabs__item"
              onSelect={onValueChange}
            >
              {item.icon && <Icon name={item.icon} size={20} />}
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

interface NavLinkProps {
  item: NavItem
  current: boolean
  className: string
  onSelect?: (id: string) => void
  children: ReactNode
}

/** Shared by Tabs and BottomNav. */
export function NavLink({ item, current, className, onSelect, children }: NavLinkProps) {
  const common = {
    className,
    'aria-current': current ? ('page' as const) : undefined,
  }

  if (item.href && !item.disabled) {
    return (
      <a
        {...common}
        href={item.href}
        onClick={(event: MouseEvent) => {
          if (onSelect) {
            event.preventDefault()
            onSelect(item.id)
          }
        }}
      >
        {children}
      </a>
    )
  }

  return (
    <button {...common} type="button" disabled={item.disabled} onClick={() => onSelect?.(item.id)}>
      {children}
    </button>
  )
}
