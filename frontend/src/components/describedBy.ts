/** Joins the ids of whichever hint and error messages are shown. */
export function describedBy(
  hint: string | undefined,
  error: string | undefined,
  hintId: string,
  errorId: string,
): string | undefined {
  return [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined
}
