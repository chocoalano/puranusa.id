// resources/js/utils/withdrawalNotes.ts
import type { BankInfo } from '@/types/withdrawal'

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

export const parseBankInfo = (notes: string | BankInfo | null): BankInfo | null => {
  if (!notes) return null

  if (isObject(notes)) {
    // sudah object (mis. dari backend transform)
    return notes as BankInfo
  }

  if (typeof notes === 'string') {
    try {
      const parsed = JSON.parse(notes)
      if (isObject(parsed)) return parsed as unknown as BankInfo
      return null
    } catch {
      return null
    }
  }

  return null
}
