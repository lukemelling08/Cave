import { useEffect, useRef, type CSSProperties } from 'react'
import { Icon, IconButton } from '../components'
import { pages, type Route } from './routes'
import './NavMenu.css'

interface NavMenuProps {
  id: string
  open: boolean
  onClose: () => void
  current: Route
  onNavigate: (route: Route) => void
}

/**
 * Slide-in navigation panel built on a modal <dialog>: the rest of the page
 * goes inert while it is open, Escape closes it and focus returns to the
 * menu button.
 */
export function NavMenu({ id, open, onClose, current, onNavigate }: NavMenuProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      id={id}
      className="app-nav"
      aria-label="Menu"
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // Clicks on the backdrop land on the dialog element itself.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="app-nav__inner">
        <div className="app-nav__header">
          <IconButton icon="close" aria-label="Close menu" onClick={onClose} />
        </div>

        <nav aria-label="Main">
          <ul className="app-nav__list">
            {pages.map((page, index) => {
              const selected = page.id === current
              return (
                <li key={page.id} style={{ '--i': index } as CSSProperties}>
                  <button
                    type="button"
                    className="app-nav__item"
                    aria-current={selected ? 'page' : undefined}
                    onClick={() => {
                      if (!selected) onNavigate(page.id)
                      onClose()
                    }}
                  >
                    <Icon name={page.icon} size={20} className="app-nav__icon" />
                    <span className="app-nav__label">{page.label}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </dialog>
  )
}
