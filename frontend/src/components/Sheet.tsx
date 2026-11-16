import { Dialog, type DialogProps } from './Dialog'

export type SheetProps = Omit<DialogProps, 'presentation'>

/** A Dialog that is always a bottom sheet, whatever the screen size. */
export function Sheet(props: SheetProps) {
  return <Dialog {...props} presentation="sheet" />
}
