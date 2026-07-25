import type { FieldValues, Path, UseFormReturn } from 'react-hook-form'
import type { ApiErrorResponse } from '@/types/api'

/**
 * Maps BE validation errors (PascalCase keys) to RHF setError calls.
 * Returns true if any field errors were set, false if only a generic message.
 */
export function setServerErrors<T extends FieldValues>(
  error: ApiErrorResponse,
  form: UseFormReturn<T>,
): boolean {
  if (!error.errors) return false

  let hadFieldErrors = false

  for (const [key, messages] of Object.entries(error.errors)) {
    const fieldName = (key.charAt(0).toLowerCase() + key.slice(1)) as Path<T>
    form.setError(fieldName, { message: messages[0] })
    hadFieldErrors = true
  }

  return hadFieldErrors
}
