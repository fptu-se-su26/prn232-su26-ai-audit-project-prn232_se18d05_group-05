'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Fingerprint,
  Loader2,
  MapPin,
  Package,
  PlayCircle,
  Route,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import { logisticsService } from '@/services/logistics.service'
import type { ShipmentItem } from '@/types/logistics'

export default function ConfirmShipmentPage() {
  const router = useRouter()
  const params = useParams()
  const shipmentId = (params?.id as string) || 'ship-90-uuid-0001'

  const [shipment, setShipment] = useState<ShipmentItem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

  // Load target shipment
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const item = await logisticsService.getShipmentById(shipmentId)
        setShipment(item)
      } catch {
        toast.error('Không thể tìm thấy thông tin lô hàng!')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [shipmentId])

  // Handle Confirm & Start Delivery
  const handleConfirm = async () => {
    if (!shipment || submitting) return
    setSubmitting(true)

    try {
      await logisticsService.acceptShipment(shipment.shipmentId)
      setIsConfirmed(true)
      toast.success(`Tiếp nhận thành công lô hàng ${shipment.shipmentCode}!`, {
        description: 'Trạng thái lô hàng đã được cập nhật thành Assigned (Đã phân công).',
      })
      setTimeout(() => {
        router.push(APP_ROUTES.logistics.pending)
      }, 1500)
    } catch {
      toast.error('Có lỗi xảy ra khi xác nhận tiếp nhận lô hàng!')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-gray-500">Đang tải thông tin xác nhận lô hàng...</p>
      </div>
    )
  }

  if (!shipment) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center p-6">
        <Package className="w-16 h-16 text-gray-300" />
        <h2 className="text-xl font-bold text-gray-800">Không tìm thấy lô hàng</h2>
        <p className="text-sm text-gray-500">Lô hàng này có thể không tồn tại hoặc đã được tiếp nhận.</p>
        <button
          onClick={() => router.push(APP_ROUTES.logistics.pending)}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors"
        >
          Quay lại danh sách
        </button>
      </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-8 bg-gradient-to-br from-emerald-50/50 via-white to-gray-50/80 overflow-hidden">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-[-10%] right-[-5%] w-[45%] h-[60%] bg-emerald-200/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[35%] h-[50%] bg-teal-200/40 rounded-full blur-[100px]" />
      </div>

      {/* Confirmation Main Card Container */}
      <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl border border-gray-100 shadow-xl p-6 sm:p-10 transition-all duration-300">
        {/* Success / Truck Icon Illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-30" />
            <div className="relative z-10 w-24 h-24 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/30">
              <Truck className="w-12 h-12 stroke-[2]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center border-2 border-emerald-600 shadow-sm">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>
        </div>

        {/* Header Message */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">Tiếp nhận vận chuyển</h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto">
            Xác nhận tiếp nhận vận chuyển lô hàng này? Trạng thái lô hàng sẽ được cập nhật thành{' '}
            <span className="font-bold text-emerald-700">"Assigned" (Đã phân công)</span>.
          </p>
        </div>

        {/* Bento Confirmation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Card 1: Mã lô hàng */}
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 hover:border-emerald-300 transition-colors group">
            <div className="flex items-center gap-2 mb-1 text-gray-400">
              <Fingerprint className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Mã lô hàng</span>
            </div>
            <p className="text-xl font-black text-emerald-700">{shipment.shipmentCode}</p>
          </div>

          {/* Card 2: Sản phẩm */}
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-100 hover:border-emerald-300 transition-colors group">
            <div className="flex items-center gap-2 mb-1 text-gray-400">
              <Package className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Sản phẩm</span>
            </div>
            <p className="text-xl font-black text-gray-900">
              {shipment.productName} - {shipment.quantity} {shipment.unit}
            </p>
          </div>

          {/* Card 3: Lộ trình vận chuyển */}
          <div className="sm:col-span-2 bg-gray-50/80 p-5 rounded-2xl border border-gray-100 relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-4 text-gray-400">
              <Route className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Lộ trình vận chuyển</span>
            </div>

            <div className="flex flex-col gap-4 relative pl-1">
              {/* Route Line */}
              <div className="absolute left-[13px] top-3 bottom-3 w-0.5 bg-gray-200 group-hover:bg-emerald-300 transition-colors" />

              {/* Origin / Farm */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Điểm đi (Trang trại)</p>
                  <p className="text-base font-bold text-gray-900">{shipment.retailerName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{shipment.pickupAddress}</p>
                </div>
              </div>

              {/* Destination / Hub */}
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 fill-rose-600 text-rose-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Điểm đến (Hub / Siêu thị)</p>
                  <p className="text-base font-bold text-gray-900">{shipment.receiverName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{shipment.deliveryAddress}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {isConfirmed ? (
            <button
              disabled
              className="flex-1 py-4 bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-lg flex items-center justify-center gap-2 cursor-default"
            >
              <CheckCircle2 className="w-5 h-5" />
              Đã tiếp nhận thành công!
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/40 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Đang đăng ký nhận lô hàng...
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 fill-white/20" />
                  Xác nhận &amp; Bắt đầu
                </>
              )}
            </button>
          )}

          <button
            onClick={() => router.back()}
            disabled={submitting}
            className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-2xl font-bold text-base active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            Hủy &amp; Quay lại
          </button>
        </div>

        {/* Helper Footer Notice */}
        <div className="text-center mt-6 pt-4 border-t border-gray-100 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Bằng việc xác nhận, bạn cam kết tuân thủ quy trình vận chuyển an toàn thực phẩm.</span>
        </div>
      </div>
    </div>
  )
}
