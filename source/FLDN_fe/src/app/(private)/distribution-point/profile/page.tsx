'use client'

import { Building2, Loader2, MapPin, Save, Store } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { USER_ROLES } from '@/config/roles'
import { distributionPointService } from '@/services/distribution-point.service'
import { orderService } from '@/services/order.service'
import {
  DISTRIBUTION_POINT_TYPES,
  DISTRIBUTION_POINT_TYPE_LABELS_VI,
  type DistributionPointType,
} from '@/types/distribution-point'
import type { District } from '@/types/order'

export default function DistributionPointProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasProfile, setHasProfile] = useState(false)
  const [districts, setDistricts] = useState<District[]>([])

  const [pointName, setPointName] = useState('')
  const [pointType, setPointType] = useState<DistributionPointType>('Market')
  const [capacity, setCapacity] = useState<string>('0')
  const [capacityUnit, setCapacityUnit] = useState('Kg/ngày')
  const [address, setAddress] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [operatingHours, setOperatingHours] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [profile, districtList] = await Promise.all([
          distributionPointService.getMyProfile(),
          orderService.getDistricts().catch(() => [] as District[]),
        ])

        setDistricts(districtList)

        if (profile) {
          setHasProfile(true)
          setPointName(profile.pointName)
          setPointType(profile.pointType)
          setCapacity(String(profile.capacity ?? 0))
          setCapacityUnit(profile.capacityUnit ?? '')
          setAddress(profile.address ?? '')
          setDistrictId(profile.districtId ?? '')
          setContactPerson(profile.contactPerson ?? '')
          setContactPhone(profile.contactPhone ?? '')
          setOperatingHours(profile.operatingHours ?? '')
        }
      } catch {
        toast.error('Không tải được hồ sơ điểm phân phối.')
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pointName.trim()) {
      toast.error('Vui lòng nhập tên điểm phân phối!')
      return
    }

    const parsedCapacity = Number(capacity)
    if (isNaN(parsedCapacity) || parsedCapacity < 0) {
      toast.error('Sức chứa phải là số không âm!')
      return
    }

    setIsSaving(true)
    try {
      const saved = await distributionPointService.upsertMyProfile({
        pointName: pointName.trim(),
        pointType,
        capacity: parsedCapacity,
        capacityUnit: capacityUnit.trim() || undefined,
        address: address.trim() || undefined,
        districtId: districtId || null,
        contactPerson: contactPerson.trim() || undefined,
        contactPhone: contactPhone.trim() || undefined,
        operatingHours: operatingHours.trim() || undefined,
      })

      setHasProfile(true)
      setCapacity(String(saved.capacity ?? 0))
      toast.success('Đã lưu hồ sơ điểm phân phối!')
    } catch (error) {
      const message =
        typeof error === 'object' && error !== null && 'message' in error
          ? String((error as { message: unknown }).message)
          : 'Lưu hồ sơ thất bại. Vui lòng thử lại.'
      toast.error(message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <ProtectedRoute allowedRoles={[USER_ROLES.DistributionPoint]}>
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-zinc-900">
            <Store className="size-6 text-emerald-600" />
            Hồ sơ điểm phân phối
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Thông tin này giúp nhà cung cấp và bộ phận vận hành biết quy mô, loại hình và khu vực
            của điểm nhận hàng.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-3xl border border-zinc-200 bg-white py-20">
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          </div>
        ) : (
          <>
            {!hasProfile && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                Bạn chưa khai báo hồ sơ điểm phân phối. Điền thông tin bên dưới và bấm lưu.
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Tên điểm phân phối *
                  </span>
                  <input
                    type="text"
                    value={pointName}
                    onChange={(e) => setPointName(e.target.value)}
                    placeholder="VD: Siêu thị Nông sản Quận 1"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Loại hình *
                  </span>
                  <select
                    value={pointType}
                    onChange={(e) => setPointType(e.target.value as DistributionPointType)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    {DISTRIBUTION_POINT_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {DISTRIBUTION_POINT_TYPE_LABELS_VI[type]}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Sức chứa / nhu cầu mỗi ngày
                  </span>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Đơn vị tính
                  </span>
                  <input
                    type="text"
                    value={capacityUnit}
                    onChange={(e) => setCapacityUnit(e.target.value)}
                    placeholder="VD: Kg/ngày"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <MapPin className="size-3" />
                    Quận/Huyện
                  </span>
                  <select
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="">-- Chưa chọn --</option>
                    {districts.map((d) => (
                      <option key={d.districtId} value={d.districtId}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Giờ hoạt động
                  </span>
                  <input
                    type="text"
                    value={operatingHours}
                    onChange={(e) => setOperatingHours(e.target.value)}
                    placeholder="VD: 06:00 - 20:00"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>

              <label className="block space-y-1.5">
                <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Building2 className="size-3" />
                  Địa chỉ điểm phân phối
                </span>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Số nhà, đường, phường/xã"
                  className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Người phụ trách
                  </span>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Họ tên người nhận hàng"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>

                <label className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Điện thoại liên hệ
                  </span>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="VD: 0901234567"
                    className="w-full rounded-xl border border-zinc-200 bg-white p-2.5 text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                </label>
              </div>

              <p className="rounded-xl bg-zinc-50 p-3 text-xs text-zinc-500">
                Thông tin địa chỉ, quận/huyện và liên hệ ở trên sẽ được dùng để điền nhanh khi bạn
                tạo địa chỉ nhận hàng trong yêu cầu cung ứng.
              </p>

              <div className="flex justify-end border-t border-zinc-100 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  {hasProfile ? 'Cập nhật hồ sơ' : 'Tạo hồ sơ'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </ProtectedRoute>
  )
}
