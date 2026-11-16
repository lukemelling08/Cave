import { useEffect, useId, useRef, type ReactNode } from 'react'
import { cx } from './cx'
import { IconButton } from './IconButton'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: string
  description?: ReactNode
  /** Buttons along the bottom. Put the main action last. */
  actions?: ReactNode
  children?: ReactNode
  /**
   * `auto` is a bottom sheet below 640px and a centred dialog above it.
   * `sheet` and `dialog` force one layout.
   */
  presentation?: 'auto' | 'sheet' | 'dialog'
  className?: string
}

/**
 * Modal built on the native <dialog>: showModal() makes the rest of the page
 * inert (trapping focus), Escape closes it, and focus returns to the opener.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  actions,
  children,
  presentation = 'auto',
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={cx('cave-dialog', `cave-dialog--${presentation}`, className)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        // Escape: keep the open state controlled by the parent.
        event.preventDefault()
        onClose()
      }}
      onClick={(event) => {
        // A click on the dialog element itself, not its content, is a backdrop click.
        if (event.target === event.currentTarget) onClose()
      }}
    >
      {open && (
        <div className="cave-dialog__inner">
          <div className="cave-dialog__handle" aria-hidden="true" />
          <div className="cave-dialog__header">
            <h2 id={titleId} className="cave-dialog__title">
              {title}
            </h2>
            <IconButton icon="close" aria-label="Close" onClick={onClose} />
          </div>
          {description && (
            <div id={descriptionId} className="cave-dialog__description">
              {description}
            </div>
          )}
          {children}
          {actions && <div className="cave-dialog__actions">{actions}</div>}
        </div>
      )}
    </dialog>
  )
}
