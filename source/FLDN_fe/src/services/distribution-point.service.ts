import { api } from '@/lib/axios'
import { API_ENDPOINTS } from '@/routes/api-endpoints'
import type {
  DistributionPointProfile,
  UpsertDistributionPointProfilePayload,
} from '@/types/distribution-point'

interface ApiEnvelope<T> {
  data: T
  message?: string
  statusCode?: number
}

export const distributionPointService = {
  /** Trả null khi điểm phân phối chưa khai báo hồ sơ (BE trả 404). */
  async getMyProfile(): Promise<DistributionPointProfile | null> {
    try {
      const res = await api.get<ApiEnvelope<DistributionPointProfile>>(
        API_ENDPOINTS.distributionPoint.profile
      )
      return res.data.data
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'statusCode' in error) {
        if ((error as { statusCode: number }).statusCode === 404) return null
      }
      throw error
    }
  },

  async upsertMyProfile(
    payload: UpsertDistributionPointProfilePayload
  ): Promise<DistributionPointProfile> {
    const res = await api.put<ApiEnvelope<DistributionPointProfile>>(
      API_ENDPOINTS.distributionPoint.profile,
      payload
    )
    return res.data.data
  },
}
