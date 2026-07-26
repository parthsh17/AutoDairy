import { type ReactNode } from 'react'
import {
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  BarChart,
  CartesianGrid,
  Area,
  AreaChart,
} from 'recharts'
import { AnalyticsChartCard } from './AnalyticsChartCard'
import type { AnalyticsDailyPoint, AnalyticsMonthlyPoint, AnalyticsShiftSummary } from '../types/analytics.types'

const primary = 'hsl(var(--primary))'
const secondary = 'hsl(var(--secondary-foreground))'
const accent = 'hsl(var(--secondary))'
const muted = 'hsl(var(--muted-foreground))'

function ChartContainer({ children }: { children: ReactNode }) {
  return <div className="h-64 w-full">{children}</div>
}

export function AnalyticsDailyCharts({ data }: { data: AnalyticsDailyPoint[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AnalyticsChartCard title="Daily Collection" description="Milk collected by day">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="collection"
                name="Litres"
                stroke={primary}
                fill={primary}
                fillOpacity={0.18}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Daily Sales" description="Milk sold by day">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" name="Litres" stroke={primary} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Daily Home Quantity" description="Home consumption by day">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="homeQuantity" name="Litres" fill={accent} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Daily Remaining Milk" description="Remaining milk by day">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="remainingMilk"
                name="Litres"
                stroke={secondary}
                fill={secondary}
                fillOpacity={0.18}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
    </div>
  )
}

export function AnalyticsShiftCharts({ shift }: { shift: AnalyticsShiftSummary }) {
  const data = [
    {
      name: 'Morning',
      collection: shift.morning.collection,
      revenue: shift.morning.revenue,
      sales: shift.morning.sales,
    },
    {
      name: 'Evening',
      collection: shift.evening.collection,
      revenue: shift.evening.revenue,
      sales: shift.evening.sales,
    },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AnalyticsChartCard title="Morning vs Evening Collection" description="Shift-wise milk collected">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="collection" name="Litres" fill={primary} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Morning vs Evening Revenue" description="Shift-wise revenue">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill={secondary} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Morning vs Evening Sales" description="Shift-wise milk sold">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Litres" fill={accent} radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Shift Mix" description="Collection share by shift">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.map((item) => ({ name: item.name, value: item.collection }))}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={84}
                paddingAngle={4}
              >
                {[primary, secondary].map((fill, index) => (
                  <Cell key={index} fill={fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
    </div>
  )
}

export function AnalyticsFinancialCharts({ data }: { data: AnalyticsMonthlyPoint[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AnalyticsChartCard title="Revenue Trend" description="Revenue over months">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke={primary} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Income Trend" description="Income over months">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="income" stroke={secondary} fill={secondary} fillOpacity={0.18} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Expense Trend" description="Expenses over months">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
      <AnalyticsChartCard title="Profit Trend" description="Net profit over months">
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={muted} opacity={0.2} />
              <XAxis dataKey="label" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Bar dataKey="profit" fill={primary} radius={[10, 10, 0, 0]} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </AnalyticsChartCard>
    </div>
  )
}
