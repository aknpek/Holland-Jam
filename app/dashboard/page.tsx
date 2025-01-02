"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, LineChart, ResponsiveContainer, Bar, XAxis, YAxis, Tooltip, Legend, Line, Text } from "recharts"

const viewCountData = [
  { name: "Event A", views: 4000 },
  { name: "Event B", views: 3000 },
  { name: "Event C", views: 2000 },
  { name: "Event D", views: 2780 },
  { name: "Event E", views: 1890 },
  { name: "Event F", views: 2390 },
  { name: "Event G", views: 3490 },
]

const dailyViewsData = [
  { date: "2023-05-01", views: 1000 },
  { date: "2023-05-02", views: 1200 },
  { date: "2023-05-03", views: 1500 },
  { date: "2023-05-04", views: 1300 },
  { date: "2023-05-05", views: 1800 },
  { date: "2023-05-06", views: 2000 },
  { date: "2023-05-07", views: 1700 },
]

export default function DashboardOverallPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-300">Overall Analytics</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-800 text-gray-200 border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">View Count per Event</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={viewCountData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <Text 
                  x="50%" 
                  y={15} 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill="#d1d5db" 
                  fontSize={14}
                >
                  View Count per Event
                </Text>
                <XAxis 
                  dataKey="name" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#374151', border: 'none', fontSize: '12px', color: '#e5e7eb' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Bar dataKey="views" fill="#8884d8" radius={[4, 4, 0, 0]} cursor="default" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 text-gray-200 border-0">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-300">Daily View Count</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={dailyViewsData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                <Text 
                  x="50%" 
                  y={15} 
                  textAnchor="middle" 
                  dominantBaseline="middle" 
                  fill="#d1d5db" 
                  fontSize={14}
                >
                  Daily View Count
                </Text>
                <XAxis 
                  dataKey="date" 
                  stroke="#9ca3af" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#9ca3af" 
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#374151', border: 'none', fontSize: '12px', color: '#e5e7eb' }}
                  labelStyle={{ color: '#f3f4f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={{ fill: '#8884d8', strokeWidth: 0 }}
                  activeDot={{ r: 4, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

