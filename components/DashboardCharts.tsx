'use client';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis,
    CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const userGrowthData = [
    { name: 'Jan', users: 1500 },
    { name: 'Feb', users: 2300 },
    { name: 'Mar', users: 3200 },
    { name: 'Apr', users: 2800 },
    { name: 'May', users: 3800 },
    { name: 'Jun', users: 4300 },
];

const activityData = [
    { name: 'Mon', active: 120 },
    { name: 'Tue', active: 180 },
    { name: 'Wed', active: 250 },
    { name: 'Thu', active: 210 },
    { name: 'Fri', active: 290 },
    { name: 'Sat', active: 350 },
    { name: 'Sun', active: 220 },
];

export default function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Line Chart */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">User Growth</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={40}
                                dy={10}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ stroke: '#e5e7eb', strokeWidth: 2 }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb' }} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Activity Bar Chart */}
            <div className="bg-white p-6 rounded-xl border shadow-sm">
                <h3 className="font-semibold text-lg mb-4 text-gray-700">User Activity</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={40}
                                dy={10}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <Tooltip
                                cursor={{ fill: '#f3f4f6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="active" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}