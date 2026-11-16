import { Logo } from '../components'
import './Header.css'

/**
 * Sticky app toolbar. The three-column grid keeps the logo centred; the
 * empty side columns are where back buttons or actions will go.
 */
export function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__start" />
        <Logo type="lockup" className="app-header__logo" />
        <div className="app-header__end" />
      </div>
    </header>
  )
}
