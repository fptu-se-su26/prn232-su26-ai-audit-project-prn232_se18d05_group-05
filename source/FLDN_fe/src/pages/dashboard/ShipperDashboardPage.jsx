import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { removeAuthToken } from '../../utils/authUtils'

const API_BASE = window.location.hostname === 'localhost' ? 'http://localhost:5167/api' : '/api'

function ShipperDashboardPage() {
  const navigate = useNavigate()
  
  // States
  const [activeTab, setActiveTab] = useState('active') // 'available', 'active', 'history'
  const [deliveries, setDeliveries] = useState([])
  const [shipperInfo, setShipperInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [seeding, setSeeding] = useState(false)
  const [seedResult, setSeedResult] = useState(null)
  
  // Actions states (modals or inline inputs)
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [failReason, setFailReason] = useState('')
  const [note, setNote] = useState('')
  const [confirmImageUrl, setConfirmImageUrl] = useState('')
  const [actionLoading, setActionLoading] = useState(false)
  const [statusChanging, setStatusChanging] = useState(false)

  // Toggle Shipper Online/Offline Status
  const toggleOnlineStatus = async () => {
    if (!shipperInfo) return
    setStatusChanging(true)
    const targetStatus = shipperInfo.status === 'Off' ? 'Available' : 'Off'
    try {
      const response = await fetch(`${API_BASE}/shipper/profile/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': getShipperUserId()
        },
        body: JSON.stringify({ status: targetStatus })
      })

      if (!response.ok) {
        throw new Error('Cập nhật trạng thái trực tuyến thất bại.')
      }

      const data = await response.json()
      setShipperInfo(prev => ({ ...prev, status: data.status }))
    } catch (err) {
      alert(err.message)
    } finally {
      setStatusChanging(false)
    }
  }

  // Get current Shipper User ID from localStorage or default to 1 (seeded shipper)
  const getShipperUserId = () => {
    return window.localStorage.getItem('shipperUserId') || '1'
  }

  // Fetch Deliveries from Backend
  const fetchDeliveries = async () => {
    setLoading(true)
    setError(null)
    
    let statusFilter = 'assigned'
    if (activeTab === 'available') statusFilter = 'available'
    if (activeTab === 'active') statusFilter = 'delivering' // Gets both Assigned and PickedUp/Delivering in controller
    if (activeTab === 'history') statusFilter = 'completed'

    try {
      const response = await fetch(`${API_BASE}/shipper/deliveries?status=${statusFilter}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': getShipperUserId()
        }
      })

      if (!response.ok) {
        throw new Error('Không thể lấy danh sách lô hàng từ máy chủ.')
      }

      const data = await response.json()
      setDeliveries(data.deliveries)
      setShipperInfo(data.shipper)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDeliveries()
  }, [activeTab])

  // Seed Mock Data
  const handleSeedData = async () => {
    setSeeding(true)
    setSeedResult(null)
    try {
      const response = await fetch(`${API_BASE}/shipperseed/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw new Error('Seed dữ liệu thất bại.')
      }
      const data = await response.json()
      // Store the newly seeded shipper user id in local storage
      window.localStorage.setItem('shipperUserId', data.shipperUserId.toString())
      setSeedResult('Khởi tạo dữ liệu thành công! ID Shipper đã lưu: ' + data.shipperUserId)
      fetchDeliveries()
    } catch (err) {
      setSeedResult('Lỗi seed dữ liệu: ' + err.message)
    } finally {
      setSeeding(false)
    }
  }

  // Accept Shipment
  const handleAcceptDelivery = async (deliveryId) => {
    setActionLoading(true)
    try {
      const response = await fetch(`${API_BASE}/shipper/deliveries/${deliveryId}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': getShipperUserId()
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Chấp nhận đơn hàng thất bại.')
      }

      alert('Đã nhận đơn hàng thành công! Đơn hàng được chuyển vào tab "Đang giao".')
      fetchDeliveries()
    } catch (err) {
      alert(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  // Update Status
  const openStatusUpdate = (delivery, status) => {
    setSelectedDelivery(delivery)
    setNewStatus(status)
    setNote('')
    setFailReason('')
    setConfirmImageUrl('')
    setShowStatusModal(true)
  }

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault()
    if (!selectedDelivery) return

    setActionLoading(true)
    try {
      const response = await fetch(`${API_BASE}/shipper/deliveries/${selectedDelivery.deliveryId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Id': getShipperUserId()
        },
        body: JSON.stringify({
          status: newStatus,
          failReason: newStatus === 'Failed' ? failReason : null,
          confirmImageUrl: newStatus === 'Delivered' ? confirmImageUrl || 'https://via.placeholder.com/150' : null,
          note: note
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Cập nhật trạng thái thất bại.')
      }

      setShowStatusModal(false)
      fetchDeliveries()
    } catch (err) {
      alert(err.message)
    } finally {
      setActionLoading(false)
    }
  }

  const handleLogout = () => {
    removeAuthToken()
    navigate('/login', { replace: true })
  }

  // Format currency
  const formatVND = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  return (
    <main className="min-h-screen bg-slate-950 pb-20 text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-40">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
              FL
            </div>
            <div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">Logistics Operator</span>
              <h1 className="text-lg font-bold text-white leading-tight">Food Link Courier</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm font-semibold hover:bg-slate-800 transition"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 mt-8 space-y-8">
        {/* Banner and Seeder */}
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-950/20 p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 h-40 w-40 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              Quản lý vận chuyển hàng hóa
            </span>
            <h2 className="mt-3 text-3xl font-bold text-white tracking-tight">Khu vực điều phối của Shipper</h2>
            <p className="mt-2 max-w-xl text-slate-400 text-sm">
              Theo dõi lộ trình giao hàng, chấp nhận đơn hàng mới tại địa bàn, cập nhật trạng thái lấy hàng, đang vận chuyển và hoàn thành.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSeedData}
              disabled={seeding}
              className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 px-6 py-3 font-bold text-sm shadow-xl shadow-emerald-500/20 transition disabled:opacity-50"
            >
              {seeding ? 'Đang Seed...' : 'Seed Dữ Liệu Demo'}
            </button>
            {seedResult && (
              <span className="text-xs text-center font-medium text-emerald-400 max-w-xs">{seedResult}</span>
            )}
          </div>
        </div>

        {/* Profile Card & Stats */}
        {shipperInfo && (
          <div className="grid gap-6 md:grid-cols-4">
            {/* Profile Detail */}
            <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex items-center gap-5">
              <div className="h-16 w-16 rounded-full bg-slate-800 border-2 border-emerald-400/50 flex items-center justify-center text-3xl shadow-inner">
                👤
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Tài xế giao hàng</p>
                <h3 className="text-xl font-bold text-white">{shipperInfo.fullName || 'Nguyễn Văn Shipper'}</h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                    🚗 {shipperInfo.vehicleType}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                    🎫 {shipperInfo.licensePlate}
                  </span>
                  <button
                    onClick={toggleOnlineStatus}
                    disabled={statusChanging}
                    className={`text-xs px-3 py-0.5 rounded-full font-bold transition flex items-center gap-1 ${
                      shipperInfo.status === 'Off'
                        ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20'
                        : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    <span>{shipperInfo.status === 'Off' ? '🔴 Ngoại tuyến (Off)' : '🟢 Trực tuyến (Available)'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đơn thành công</span>
              <p className="text-3xl font-extrabold text-white mt-2">{shipperInfo.totalDeliveries} đơn</p>
              <span className="text-xs text-slate-400 mt-2">Tổng số chuyến đi giao</span>
            </div>
            
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 flex flex-col justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đánh giá trung bình</span>
              <p className="text-3xl font-extrabold text-amber-400 mt-2">⭐ {shipperInfo.averageRating?.toFixed(1) || '5.0'}</p>
              <span className="text-xs text-slate-400 mt-2">Chất lượng phục vụ khách hàng</span>
            </div>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-slate-800">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'active'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 Đơn Đang Giao ({activeTab === 'active' ? deliveries.length : '...'})
          </button>
          <button
            onClick={() => setActiveTab('available')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'available'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🔍 Lô Hàng Chờ Nhận ({activeTab === 'available' ? deliveries.length : '...'})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-bold border-b-2 transition ${
              activeTab === 'history'
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            ⏱️ Lịch Sử Giao Hàng ({activeTab === 'history' ? deliveries.length : '...'})
          </button>
        </div>

        {/* Main List */}
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-emerald-400 border-r-transparent align-[-0.125em]" role="status"></div>
            <p className="mt-4 text-slate-400 font-semibold">Đang tải danh sách lô hàng...</p>
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-6 text-center">
            <p className="text-red-400 font-semibold">Gặp lỗi khi tải dữ liệu: {error}</p>
            <button
              onClick={fetchDeliveries}
              className="mt-4 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 hover:bg-slate-700 transition text-sm font-bold"
            >
              Thử lại
            </button>
          </div>
        ) : deliveries.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/10 p-12 text-center text-slate-500">
            <p className="text-lg font-medium">Không có lô hàng nào ở danh mục này.</p>
            <p className="text-sm mt-1">Mẹo: Nhấn nút "Seed Dữ Liệu Demo" ở góc trên để tạo đơn mẫu thử nghiệm.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {deliveries.map((delivery) => (
              <div
                key={delivery.deliveryId}
                className="rounded-2xl border border-slate-850 bg-slate-900/20 backdrop-blur-md p-6 hover:border-slate-700 transition duration-300"
              >
                {/* Header of Card */}
                <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800/60 pb-4 mb-4 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-emerald-400">
                      📦 MÃ LÔ HÀNG: #{delivery.deliveryId}
                    </span>
                    <span className="text-slate-600">|</span>
                    <span className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded-full font-medium">
                      Đơn hàng: #{delivery.orderId}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">Trạng thái vận chuyển:</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-bold border ${
                      delivery.status === 'WaitingForShipper' ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' :
                      delivery.status === 'Assigned' ? 'bg-blue-400/10 border-blue-400/30 text-blue-300' :
                      delivery.status === 'Delivering' || delivery.status === 'PickedUp' ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300' :
                      delivery.status === 'Delivered' ? 'bg-emerald-400/10 border-emerald-400/30 text-emerald-300' :
                      'bg-red-400/10 border-red-400/30 text-red-300'
                    }`}>
                      {delivery.status === 'WaitingForShipper' ? 'Chờ Shipper Nhận' :
                       delivery.status === 'Assigned' ? 'Đã Giao Cho Bạn' :
                       delivery.status === 'PickedUp' ? 'Đã Lấy Hàng' :
                       delivery.status === 'Delivering' ? 'Đang Giao Hàng' :
                       delivery.status === 'Delivered' ? 'Giao Thành Công' :
                       'Giao Thất Bại'}
                    </span>
                  </div>
                </div>

                {/* Body of Card */}
                <div className="grid gap-6 md:grid-cols-3">
                  {/* Sender & Receiver Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">📍 Nơi Nhận Hàng (Supplier)</p>
                      <p className="text-sm font-semibold text-white">Điểm Kho Cà Chua VietGAP</p>
                      <p className="text-xs text-slate-400 mt-0.5">Khu vực Hòa Khánh, Liên Chiểu, Đà Nẵng</p>
                    </div>

                    <div>
                      <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-1">🏁 Nơi Giao Hàng (Khách hàng)</p>
                      <p className="text-sm font-semibold text-white">{delivery.order.address.receiverName}</p>
                      <p className="text-sm font-medium text-slate-300">{delivery.order.address.fullAddress}, {delivery.order.address.districtName}</p>
                      <p className="text-xs text-slate-400 mt-1">📞 Số điện thoại: {delivery.order.address.receiverPhone}</p>
                    </div>
                  </div>

                  {/* Order detail */}
                  <div className="space-y-2 border-l border-r border-slate-800/40 px-0 md:px-6">
                    <p className="text-xs uppercase text-slate-500 font-bold tracking-wider mb-2">🛍️ Thông tin đơn hàng</p>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Loại vận chuyển:</span>
                      <span className="font-semibold text-slate-200">{delivery.order.deliveryType === 'Immediate' ? '⚡ Hỏa tốc' : '📅 Hẹn giờ'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Khoảng cách ước tính:</span>
                      <span className="font-semibold text-slate-200">{delivery.estimatedDistance ? `${delivery.estimatedDistance} km` : 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Tổng thu tiền COD:</span>
                      <span className="font-bold text-amber-400">{formatVND(delivery.order.finalAmount)}</span>
                    </div>
                    {delivery.note && (
                      <div className="mt-2 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        <span className="block text-[11px] uppercase text-slate-500 font-semibold">Ghi chú giao hàng:</span>
                        <span className="text-xs text-slate-300 italic">"{delivery.note}"</span>
                      </div>
                    )}
                  </div>

                  {/* Earnings & Action Buttons */}
                  <div className="flex flex-col justify-between items-start md:items-end">
                    <div className="text-left md:text-right">
                      <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Tiền công của bạn</span>
                      <p className="text-2xl font-black text-emerald-400 mt-1">{formatVND(delivery.shipperEarning)}</p>
                      <span className="text-xs text-slate-400">(Phí giao: {formatVND(delivery.shippingFee)})</span>
                    </div>

                    {/* Actions */}
                    <div className="w-full mt-4 flex justify-end gap-2">
                      {delivery.status === 'WaitingForShipper' && (
                        <div className="flex flex-col items-end gap-1 w-full md:w-auto">
                          {shipperInfo?.status === 'Off' && (
                            <span className="text-xs text-red-400 italic mb-1">Hãy Bật Trực Tuyến để nhận đơn</span>
                          )}
                          <button
                            onClick={() => handleAcceptDelivery(delivery.deliveryId)}
                            disabled={actionLoading || shipperInfo?.status === 'Off'}
                            className={`w-full md:w-auto rounded-xl font-bold px-5 py-2.5 text-sm transition ${
                              shipperInfo?.status === 'Off'
                                ? 'bg-slate-800 border border-slate-700 text-slate-500 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                            }`}
                          >
                            Nhận đơn giao này
                          </button>
                        </div>
                      )}

                      {delivery.status === 'Assigned' && (
                        <button
                          onClick={() => openStatusUpdate(delivery, 'PickedUp')}
                          className="w-full md:w-auto rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold px-5 py-2.5 text-sm transition"
                        >
                          Xác nhận Đã lấy hàng
                        </button>
                      )}

                      {delivery.status === 'PickedUp' && (
                        <button
                          onClick={() => openStatusUpdate(delivery, 'Delivering')}
                          className="w-full md:w-auto rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 text-sm transition"
                        >
                          Bắt đầu giao hàng
                        </button>
                      )}

                      {delivery.status === 'Delivering' && (
                        <div className="flex gap-2 w-full md:w-auto">
                          <button
                            onClick={() => openStatusUpdate(delivery, 'Failed')}
                            className="rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 font-bold px-3 py-2.5 text-xs transition"
                          >
                            Thất bại ❌
                          </button>
                          <button
                            onClick={() => openStatusUpdate(delivery, 'Delivered')}
                            className="rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2.5 text-sm transition"
                          >
                            Thành công ✔️
                          </button>
                        </div>
                      )}

                      {(delivery.status === 'Delivered' || delivery.status === 'Failed') && (
                        <div className="text-xs text-slate-500 italic mt-2 text-right">
                          {delivery.status === 'Delivered' 
                            ? `Giao thành công vào: ${delivery.deliveredAt ? new Date(delivery.deliveredAt).toLocaleString('vi-VN') : 'N/A'}`
                            : `Lý do thất bại: ${delivery.failReason || 'Không rõ'}`
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Transition Modal */}
      {showStatusModal && selectedDelivery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <span>🔄 Cập nhật trạng thái</span>
            </h3>
            
            <p className="text-sm text-slate-400">
              Mã vận chuyển: <strong className="text-slate-200">#{selectedDelivery.deliveryId}</strong>.
              Bạn đang chuyển trạng thái sang:{' '}
              <strong className="text-emerald-400">
                {newStatus === 'PickedUp' ? 'Đã lấy hàng' :
                 newStatus === 'Delivering' ? 'Đang giao hàng' :
                 newStatus === 'Delivered' ? 'Giao hàng thành công' :
                 'Giao hàng thất bại'}
              </strong>.
            </p>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              {newStatus === 'Failed' && (
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Lý do giao hàng thất bại</label>
                  <textarea
                    required
                    value={failReason}
                    onChange={(e) => setFailReason(e.target.value)}
                    placeholder="Ví dụ: Khách thuê bao không liên lạc được, khách hẹn giao lại..."
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 min-h-[80px]"
                  />
                </div>
              )}

              {newStatus === 'Delivered' && (
                <div>
                  <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Link Ảnh Xác Nhận Thành Công (Không bắt buộc)</label>
                  <input
                    type="text"
                    value={confirmImageUrl}
                    onChange={(e) => setConfirmImageUrl(e.target.value)}
                    placeholder="https://link-anh.com/xac-nhan.jpg"
                    className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs uppercase text-slate-400 font-bold mb-1">Ghi chú thêm</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ghi chú (ví dụ: đã nhận tiền mặt, ký nhận...)"
                  className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStatusModal(false)}
                  className="flex-1 rounded-xl border border-slate-750 bg-slate-800 hover:bg-slate-750 px-4 py-2 text-sm font-semibold text-slate-300 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="flex-1 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 text-sm transition"
                >
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}

export default ShipperDashboardPage
