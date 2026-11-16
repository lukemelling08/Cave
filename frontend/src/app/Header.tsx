import { useState } from 'react'
import { IconButton, Logo } from '../components'
import { NavMenu } from './NavMenu'
import type { Route } from './routes'
import './Header.css'

interface HeaderProps {
  route: Route
  onNavigate: (route: Route) => void
}

/**
 * Sticky app toolbar. The three-column grid keeps the logo centred whatever
 * sits on either side.
 */
export function Header({ route, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__start">
          <IconButton
            icon="menu"
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="app-nav"
            onClick={() => setMenuOpen(true)}
          />
        </div>
        <Logo type="lockup" className="app-header__logo" />
        <div className="app-header__end" />
      </div>
      <NavMenu
        id="app-nav"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        current={route}
        onNavigate={onNavigate}
      />
    </header>
  )
}
