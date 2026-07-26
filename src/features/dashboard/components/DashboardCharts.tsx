import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ChartCard } from '@/components/ui/ChartCard'
import type { CustomerQuantityPoint, DashboardSeriesPoint, ShiftCollectionPoint } from '../types/dashboard.types'

const primary = 'hsl(var(--primary))'
const secondary = 'hsl(var(--secondary-foreground))'
const muted = 'hsl(var(--muted-foreground))'

interface TimeSeriesChartProps {
  data: DashboardSeriesPoint[]
  dataKey: keyof Pick<DashboardSeriesPoint, 'milkSold' | 'revenue' | 'income' | 'expenses' | 'profit'>
  title: string
  description: string
}

export function TimeSeriesChart({ data, dataKey, title, description }: TimeSeriesChartProps) {
  return (
    <ChartCard title={title} description={description}>
      {data.length === 0 ? (
        <p className="flex h-56 items-center justify-center text-sm text-muted-foreground">No data for this range.</p>
      ) : (
        <div className="h-56 w-full" role="img" aria-label={title}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} minTickGap={24} />
              <YAxis tickLine={false} axisLine={false} width={42} />
              <Tooltip />
              <Line type="monotone" dataKey={dataKey} stroke={primary} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  )
}

export function ShiftCollectionChart({ data }: { data: ShiftCollectionPoint[] }) {
  return (
    <ChartCard title="Morning vs Evening Collection" description="Collected milk by shift.">
      <div className="h-56 w-full" role="img" aria-label="Morning versus evening collection">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={muted} opacity={0.2} />
            <XAxis dataKey="shift" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} width={42} />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" name="Litres" fill={secondary} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}

export function TopCustomersChart({ data }: { data: CustomerQuantityPoint[] }) {
  return (
    <ChartCard title="Top Customers by Quantity Sold" description="Highest quantities in the selected range.">
      {data.length === 0 ? (
        <p className="flex h-56 items-center justify-center text-sm text-muted-foreground">
          No customer sales for this range.
        </p>
      ) : (
        <div className="h-56 w-full" role="img" aria-label="Top customers by quantity sold">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 12, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={muted} opacity={0.2} />
              <XAxis type="number" tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="customer" tickLine={false} axisLine={false} width={88} />
              <Tooltip />
              <Bar dataKey="quantity" name="Litres" fill={primary} radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </ChartCard>
  )
}
