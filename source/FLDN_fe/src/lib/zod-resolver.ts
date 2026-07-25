import type { ZodSchema } from 'zod'
import type { Resolver } from 'react-hook-form'

/**
 * ponytail: zodResolver from @hookform/resolvers throws ZodError with Turbopack.
 * This wrapper uses safeParseAsync so errors stay in RHF, never propagate up.
 */
export function safeZodResolver<T extends Record<string, unknown>>(schema: ZodSchema<T>): Resolver<T> {
  return async (values) => {
    const result = await schema.safeParseAsync(values)

    if (result.success) {
      return { values: result.data as T, errors: {} }
    }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join('.')
      if (key && !(key in errors)) {
        errors[key] = { type: issue.code, message: issue.message }
      }
    }

    return { values: {}, errors } as ReturnType<Resolver<T>>
  }
}
