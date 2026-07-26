import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const data = [
  { name: 'Morning', value: 60, color: 'hsl(var(--primary))' },
  { name: 'Evening', value: 40, color: 'hsl(var(--secondary-foreground))' },
]

export function PieChartDemo() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
