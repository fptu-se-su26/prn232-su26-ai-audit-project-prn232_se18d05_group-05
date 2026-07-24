'use client'

import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts'
import { Users, Store, Truck, ShoppingCart, MapPin, TrendingUp, LockKeyhole } from 'lucide-react'
import { useDashboardQuery } from '../hooks/use-admin'

// ── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label, value, sub, icon: Icon, iconBg, iconColor,
}: {
  label: string; value: number | string; sub?: string
  icon: React.ElementType; iconBg: string; iconColor: string
}) {
  return (
    <div className="rounded-xl border bg-card p-5 flex items-center gap-4">
      <div className={`size-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`size-5 ${iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-2xl font-bold tabular-nums mt-0.5">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

// ── Chart Card wrapper ────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }: {
  title: string; subtitle?: string; children: React.ReactNode
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; fill: string }[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="font-medium">{payload[0].name}</p>
      <p className="text-muted-foreground mt-0.5 tabular-nums">{payload[0].value}</p>
    </div>
  )
}

// ── Donut chart center label ──────────────────────────────────────────────────

function DonutCenter({ total, label }: { total: number; label: string }) {
  return (
    <g>
      <text x="50%" y="46%" textAnchor="middle" dominantBaseline="middle" className="fill-foreground font-bold" fontSize={24}>
        {total}
      </text>
      <text x="50%" y="62%" textAnchor="middle" dominantBaseline="middle" className="fill-muted-foreground" fontSize={11}>
        {label}
      </text>
    </g>
  )
}

// ── Skeleton loading ──────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-muted/30 h-20 animate-pulse" />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-muted/30 h-72 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export function DashboardPage() {
  const { data, isPending } = useDashboardQuery()
  const d = data?.data

  const revenueFormatted = d
    ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', notation: 'compact', maximumFractionDigits: 1 }).format(d.totalRevenue)
    : '0 ₫'

  const supplierData = d ? [
    { name: 'Chờ duyệt', value: d.pendingSuppliers },
    { name: 'Đã duyệt',  value: d.approvedSuppliers },
    { name: 'Từ chối',   value: d.rejectedSuppliers },
  ] : []

  const logisticsData = d ? [
    { name: 'Hoạt động',       value: d.availableOperators },
    { name: 'Không hoạt động', value: d.totalLogisticsOperators - d.availableOperators },
  ] : []

  const orderData = d ? [
    { name: 'Chờ xử lý',  value: d.pendingOrders },
    { name: 'Hoàn thành', value: d.completedOrders },
    { name: 'Đã hủy',     value: d.cancelledOrders },
    { name: 'Khác',       value: Math.max(0, d.totalOrders - d.pendingOrders - d.completedOrders - d.cancelledOrders) },
  ].filter(item => item.value > 0) : []

  const SUPPLIER_COLORS = ['#F59E0B', '#10B981', '#EF4444']
  const LOGISTICS_COLORS = ['#10B981', '#94A3B8']
  const ORDER_COLORS = ['#F59E0B', '#10B981', '#EF4444', '#94A3B8']

  if (isPending) return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="h-6 w-48 bg-muted/40 rounded animate-pulse" />
        <div className="h-4 w-64 bg-muted/30 rounded animate-pulse mt-2" />
      </div>
      <Skeleton />
    </div>
  )

  if (!d) return null

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold">Tổng quan hệ thống</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Thống kê toàn bộ dữ liệu hệ thống</p>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Tổng tài khoản"
          value={d.totalUsers}
          sub={d.lockedUsers > 0 ? `${d.lockedUsers} đang khóa` : 'Tất cả đang hoạt động'}
          icon={Users}
          iconBg="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600"
        />
        <KpiCard
          label="Nhà cung cấp"
          value={d.totalSuppliers}
          sub={`${d.pendingSuppliers} chờ duyệt`}
          icon={Store}
          iconBg="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600"
        />
        <KpiCard
          label="Tổng đơn hàng"
          value={d.totalOrders}
          sub={`${d.completedOrders} hoàn thành`}
          icon={ShoppingCart}
          iconBg="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600"
        />
        <KpiCard
          label="Doanh thu"
          value={revenueFormatted}
          sub="Từ đơn hoàn thành"
          icon={TrendingUp}
          iconBg="bg-emerald-50 dark:bg-emerald-950"
          iconColor="text-emerald-600"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Supplier status donut */}
        <ChartCard title="Nhà cung cấp" subtitle="Phân bố theo trạng thái">
          {supplierData.every(s => s.value === 0) ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Chưa có dữ liệu</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={supplierData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {supplierData.map((_, i) => (
                    <Cell key={i} fill={SUPPLIER_COLORS[i % SUPPLIER_COLORS.length]} />
                  ))}
                  <DonutCenter total={d.totalSuppliers} label="tổng" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Logistics status donut */}
        <ChartCard title="Tài xế logistics" subtitle="Sẵn sàng / Không hoạt động">
          {d.totalLogisticsOperators === 0 ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Chưa có dữ liệu</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={logisticsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={88}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {logisticsData.map((_, i) => (
                    <Cell key={i} fill={LOGISTICS_COLORS[i % LOGISTICS_COLORS.length]} />
                  ))}
                  <DonutCenter total={d.totalLogisticsOperators} label="tổng" />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        {/* Orders by status bar */}
        <ChartCard title="Đơn hàng" subtitle="Số lượng theo trạng thái">
          {d.totalOrders === 0 ? (
            <div className="h-56 flex items-center justify-center text-sm text-muted-foreground">Chưa có đơn hàng</div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={orderData}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                  tickLine={false}
                  width={72}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }} />
                <Bar dataKey="value" name="Số đơn" radius={[0, 4, 4, 0]} maxBarSize={28}>
                  {orderData.map((_, i) => (
                    <Cell key={i} fill={ORDER_COLORS[i % ORDER_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

      </div>

      {/* Secondary stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          label="Tài khoản bị khóa"
          value={d.lockedUsers}
          icon={LockKeyhole}
          iconBg="bg-red-50 dark:bg-red-950"
          iconColor="text-red-500"
        />
        <KpiCard
          label="Chờ phê duyệt"
          value={d.pendingSuppliers}
          sub="Nhà cung cấp"
          icon={Store}
          iconBg="bg-orange-50 dark:bg-orange-950"
          iconColor="text-orange-500"
        />
        <KpiCard
          label="Tài xế hoạt động"
          value={d.availableOperators}
          sub={`/ ${d.totalLogisticsOperators} tổng`}
          icon={Truck}
          iconBg="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600"
        />
        <KpiCard
          label="Vùng giao hàng"
          value={d.activeZones}
          sub={`/ ${d.totalZones} tổng`}
          icon={MapPin}
          iconBg="bg-indigo-50 dark:bg-indigo-950"
          iconColor="text-indigo-600"
        />
      </div>

    </div>
  )
}
