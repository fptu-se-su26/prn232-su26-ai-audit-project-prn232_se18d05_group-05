'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  AlertTriangle,
  Camera,
  CheckCircle2,
  ChevronRight,
  CloudUpload,
  Image as ImageIcon,
  Loader2,
  PenTool,
  Plus,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Truck,
  Verified,
} from 'lucide-react'
import { toast } from 'sonner'
import { APP_ROUTES } from '@/routes/app-routes'
import { logisticsService } from '@/services/logistics.service'
import type { ConfirmDeliveryRequest, ShipmentItem } from '@/types/logistics'

export default function ProofOfDeliveryPage() {
  const router = useRouter()
  const params = useParams()
  const shipmentId = (params?.id as string) || 'ship-88-uuid-0003'

  const [shipment, setShipment] = useState<ShipmentItem | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)

  // Form State
  const [receiverName, setReceiverName] = useState<string>('Nguyễn Văn An')
  const [deliveryNote, setDeliveryNote] = useState<string>('')
  const [receiverPhone, setReceiverPhone] = useState<string>('0905123456')

  // Photos State
  const [photos, setPhotos] = useState<string[]>([
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80',
  ])

  // Canvas Signature Pad State
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
  const [hasSignature, setHasSignature] = useState<boolean>(false)

  // Load target shipment details
  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const item = await logisticsService.getShipmentById(shipmentId)
        setShipment(item)
        if (item?.receiverName) setReceiverName(item.receiverName)
        if (item?.receiverPhone) setReceiverPhone(item.receiverPhone)
      } catch {
        toast.error('Không thể lấy thông tin vận đơn POD!')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [shipmentId])

  // Canvas Signature Drawing Logic
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas dimensions
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width || 400
    canvas.height = rect.height || 220

    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.strokeStyle = '#171d19'
  }, [])

  const getCanvasPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    if ('touches' in e && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      }
    }
    const mouseEvent = e as React.MouseEvent<HTMLCanvasElement>
    return {
      x: mouseEvent.clientX - rect.left,
      y: mouseEvent.clientY - rect.top,
    }
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsDrawing(true)
    const { x, y } = getCanvasPos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { x, y } = getCanvasPos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    setHasSignature(true)
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearSignature = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setHasSignature(false)
  }

  // File upload simulation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newPhotoUrl = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80'
    setPhotos((prev) => [...prev, newPhotoUrl])
    toast.success('Đã tải ảnh minh chứng giao hàng lên thành công!')
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  // Handle POD Confirmation Submission
  const handleSubmitPOD = async () => {
    if (!shipment || submitting) return

    if (!receiverName.trim()) {
      toast.error('Vui lòng nhập họ tên người nhận hàng!')
      return
    }

    setSubmitting(true)

    try {
      const payload: ConfirmDeliveryRequest = {
        shipmentId: shipment.shipmentId,
        receiverName: receiverName.trim(),
        receiverPhone: receiverPhone.trim(),
        deliveryNote: deliveryNote.trim() || 'Xác nhận giao đúng quy cách theo vận đơn.',
        deliveryImageUrl: photos[0] || undefined,
      }

      await logisticsService.confirmDelivery(shipment.shipmentId, payload)

      toast.success(`Đã xác nhận thành công giao hàng (POD) cho vận đơn ${shipment.shipmentCode}!`, {
        description: 'Trạng thái lô hàng đã được cập nhật thành Delivered (Hoàn thành).',
      })

      setTimeout(() => {
        router.push(APP_ROUTES.logistics.myShipments)
      }, 1200)
    } catch {
      toast.error('Có lỗi khi xác nhận giao hàng!')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        <p className="text-sm font-medium text-gray-500">Đang tải thông tin xác nhận giao hàng POD...</p>
      </div>
    )
  }

  const shipmentCode = shipment?.shipmentCode || '#SHIP-88'
  const receiverLocation = shipment?.receiverName || 'Chợ Cồn, Đà Nẵng'

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
        <Link href={APP_ROUTES.dashboard} className="hover:text-emerald-700 transition-colors">
          Trang chủ
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <Link href={APP_ROUTES.logistics.pending} className="hover:text-emerald-700 transition-colors">
          Vận chuyển
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="hover:text-emerald-700 transition-colors">Lộ trình {shipmentCode}</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
        <span className="text-emerald-700 font-bold">Xác nhận giao hàng POD</span>
      </nav>

      {/* Header Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Xác nhận giao hàng (Proof of Delivery)
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Vận đơn: <span className="font-bold text-gray-900">{shipmentCode}-DN-2026</span> | Điểm giao:{' '}
            <span className="font-bold text-emerald-700">{receiverLocation}</span>
          </p>
        </div>
        <div className="self-start md:self-auto">
          <span className="px-3.5 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-xs">
            <Truck className="w-3.5 h-3.5" /> Đang giao hàng
          </span>
        </div>
      </div>

      {/* Bento Grid Layout for POD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Delivery Proof Photos & Item List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Photo Proof Upload Section */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-3">
              <Camera className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold">Minh chứng hình ảnh bàn giao</h2>
            </div>
            <p className="text-xs text-gray-500">
              Vui lòng chụp ảnh các thùng hàng đã được bàn giao đầy đủ tại vị trí nhận hàng của Hub/Siêu thị.
            </p>

            {/* Drag and Drop Zone */}
            <label className="border-2 border-dashed border-gray-200 hover:border-emerald-500 rounded-2xl p-6 text-center cursor-pointer bg-gray-50/50 hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center gap-2 group block">
              <div className="w-14 h-14 bg-gray-100 group-hover:bg-emerald-100 text-gray-400 group-hover:text-emerald-700 rounded-full flex items-center justify-center transition-all duration-200">
                <CloudUpload className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-gray-800">Kéo thả hoặc nhấn để tải ảnh lên</h3>
              <p className="text-xs text-gray-400">Định dạng JPG, PNG (Tối đa 10MB)</p>
              <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
            </label>

            {/* Photos Preview Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {photos.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200 relative group shadow-xs"
                >
                  <img src={url} alt={`Proof ${idx + 1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(idx)}
                      className="p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <label className="aspect-square rounded-xl border-2 border-dashed border-gray-200 hover:border-emerald-400 bg-gray-50 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-gray-400 hover:text-emerald-600">
                <Plus className="w-6 h-6" />
                <span className="text-[10px] font-semibold">Thêm ảnh</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </section>

          {/* Item List Section */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900">Chi tiết hàng hóa bàn giao</h2>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">
                04 mặt hàng
              </span>
            </div>

            <div className="divide-y divide-gray-100 text-xs">
              {/* Item 1 */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs flex items-center justify-center border border-emerald-100">
                    C01
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Cà chua VietGAP</p>
                    <p className="text-xs text-gray-500 mt-0.5">Thùng 20kg • Loại A</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">10 Thùng</p>
                  <p className="text-xs text-gray-500 mt-0.5">200kg</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs flex items-center justify-center border border-emerald-100">
                    X04
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Xà lách thủy canh</p>
                    <p className="text-xs text-gray-500 mt-0.5">Khay 5kg • VietGAP</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">25 Khay</p>
                  <p className="text-xs text-gray-500 mt-0.5">125kg</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs flex items-center justify-center border border-emerald-100">
                    R02
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Rau Cải Thìa Hữu Cơ</p>
                    <p className="text-xs text-gray-500 mt-0.5">Thùng 15kg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">8 Thùng</p>
                  <p className="text-xs text-gray-500 mt-0.5">120kg</p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-4 flex items-center justify-between hover:bg-gray-50/70 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-50 text-emerald-700 rounded-xl font-black text-xs flex items-center justify-center border border-emerald-100">
                    K01
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Khoai Tây Đà Lạt</p>
                    <p className="text-xs text-gray-500 mt-0.5">Bao 25kg</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">10 Bao</p>
                  <p className="text-xs text-gray-500 mt-0.5">250kg</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (5 cols): Digital Signature & Confirmation CTA */}
        <div className="lg:col-span-5 space-y-6">
          {/* Digital Signature Pad */}
          <section className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2 text-gray-900">
                <PenTool className="w-5 h-5 text-emerald-600" />
                <h2 className="text-base font-bold">Chữ ký xác nhận số</h2>
              </div>
              <button
                type="button"
                onClick={clearSignature}
                className="text-xs text-gray-500 hover:text-rose-600 flex items-center gap-1 font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Xóa chữ ký</span>
              </button>
            </div>

            <p className="text-xs text-gray-500">
              Đại diện điểm nhận hàng (Hub / Siêu thị) ký tên xác nhận vào ô bên dưới:
            </p>

            {/* Signature Canvas Pad */}
            <div className="relative border border-gray-200 rounded-xl overflow-hidden bg-white shadow-inner">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-44 cursor-crosshair touch-none bg-white block"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] uppercase text-gray-300 pointer-events-none font-bold tracking-widest select-none">
                Digital Sign-Off Pad
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Họ tên người nhận *</label>
                <input
                  type="text"
                  required
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Nhập họ tên đầy đủ người nhận..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">Ghi chú (nếu có)</label>
                <textarea
                  rows={2}
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                  placeholder="Tình trạng hàng hóa khi mở thùng, khiếu nại nếu có..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>
          </section>

          {/* Call to Action Container */}
          <div className="p-6 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                <Verified className="w-4 h-4" />
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed font-medium">
                Bằng cách nhấn xác nhận, bạn đồng ý rằng tất cả hàng hóa đã được kiểm đếm và giao đúng quy cách theo
                vận đơn <span className="font-bold">{shipmentCode}</span>.
              </p>
            </div>

            <button
              onClick={handleSubmitPOD}
              disabled={submitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-base shadow-md shadow-emerald-600/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Đang ghi nhận giao hàng...
                </>
              ) : (
                <>
                  Xác nhận hoàn thành giao hàng (POD)
                  <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>

            <button
              onClick={() => router.back()}
              disabled={submitting}
              className="w-full py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-xl font-semibold text-xs transition-colors"
            >
              Báo cáo sự cố / Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
