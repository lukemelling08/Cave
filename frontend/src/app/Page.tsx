import { useEffect, type ReactNode } from 'react'
import './Page.css'

interface PageProps {
  title: string
  children?: ReactNode
}

/** Shared page wrapper: main landmark, page heading and document title. */
export function Page({ title, children }: PageProps) {
  useEffect(() => {
    document.title = `${title} · Cave`
  }, [title])

  return (
    <main className="app-page">
      <h1 className="cave-visually-hidden">{title}</h1>
      {children}
    </main>
  )
}
