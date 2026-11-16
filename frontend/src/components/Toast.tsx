import { useEffect, useRef, type ComponentPropsWithRef } from 'react'
import { cx } from './cx'
import { Icon } from './Icon'

export interface ToastRegionProps extends ComponentPropsWithRef<'div'> {
  /** Render in the page flow instead of fixed to the bottom of the screen. */
  inline?: boolean
}

/** Holds toasts. Keep it mounted: it is the live region that announces new ones. */
export function ToastRegion({ inline = false, className, children, ...rest }: ToastRegionProps) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      className={cx('cave-toast-region', inline && 'cave-toast-region--inline', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

/** Render inside a ToastRegion so screen readers announce it. */
export interface ToastProps extends ComponentPropsWithRef<'div'> {
  /** Short confirmation, such as "Lights off in Living room". */
  message: string
  /** Label for an optional action, such as "Undo". */
  actionLabel?: string
  onAction?: () => void
  onDismiss?: () => void
  /** Milliseconds before onDismiss is called. 0 keeps it open. */
  duration?: number
}

export function Toast({
  message,
  actionLabel,
  onAction,
  onDismiss,
  duration = 5000,
  className,
  ...rest
}: ToastProps) {
  // Keep the latest callback without restarting the timer on every render.
  const dismissRef = useRef(onDismiss)
  useEffect(() => {
    dismissRef.current = onDismiss
  })

  useEffect(() => {
    if (!duration) return
    const timer = window.setTimeout(() => dismissRef.current?.(), duration)
    return () => window.clearTimeout(timer)
  }, [duration])

  return (
    <div className={cx('cave-toast', className)} {...rest}>
      <span className="cave-toast__message">{message}</span>
      {actionLabel && (
        <button type="button" className="cave-toast__action" onClick={onAction}>
          {actionLabel}
        </button>
      )}
      {onDismiss && (
        <button
          type="button"
          className="cave-toast__dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <Icon name="close" size={20} />
        </button>
      )}
    </div>
  )
}
