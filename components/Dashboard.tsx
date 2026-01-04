
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { ShoppingBag, TrendingUp, Users, DollarSign, Clock } from 'lucide-react';
import { Order, OrderStatus } from '../types';

interface DashboardProps {
  stats: {
    balance: number;
    totalSpent: number;
    totalOrders: number;
  };
  orders: Order[];
}

const data = [
  { name: 'Mon', orders: 12 },
  { name: 'Tue', orders: 19 },
  { name: 'Wed', orders: 15 },
  { name: 'Thu', orders: 22 },
  { name: 'Fri', orders: 30 },
  { name: 'Sat', orders: 25 },
  { name: 'Sun', orders: 35 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats, orders }) => {
  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Total Balance" 
          value={`$${stats.balance.toFixed(2)}`} 
          icon={DollarSign} 
          color="bg-emerald-500" 
          trend="+12%"
        />
        <StatCard 
          label="Total Spent" 
          value={`$${stats.totalSpent.toFixed(2)}`} 
          icon={ShoppingBag} 
          color="bg-indigo-500" 
          trend="+5.4%"
        />
        <StatCard 
          label="Active Orders" 
          value={orders.filter(o => o.status === OrderStatus.IN_PROGRESS).length.toString()} 
          icon={Clock} 
          color="bg-amber-500" 
        />
        <StatCard 
          label="Total Orders" 
          value={stats.totalOrders.toString()} 
          icon={TrendingUp} 
          color="bg-blue-500" 
          trend="+28%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Growth Performance</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="orders" stroke="#6366f1" fillOpacity={1} fill="url(#colorOrders)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentOrders.length > 0 ? recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/40 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${order.status === OrderStatus.COMPLETED ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <div>
                    <p className="text-sm font-medium text-slate-200 truncate w-32">{order.serviceName}</p>
                    <p className="text-xs text-slate-500">{order.date}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-white">${order.charge.toFixed(2)}</p>
              </div>
            )) : (
              <div className="text-center py-12 text-slate-500 italic">No recent activity</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon: Icon, color, trend }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-all">
    <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:opacity-10 transition-opacity`} />
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{label}</p>
        <h4 className="text-2xl font-bold text-white">{value}</h4>
        {trend && (
          <p className="text-xs text-emerald-400 font-medium mt-2">
            {trend} <span className="text-slate-500">vs last month</span>
          </p>
        )}
      </div>
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-white`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

export default Dashboard;
