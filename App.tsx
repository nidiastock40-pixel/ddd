
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import NewOrder from './components/NewOrder';
import AIAssistant from './components/AIAssistant';
import Auth from './components/Auth';
import AddFunds from './components/AddFunds';
import { Order, OrderStatus, User, Service, SocialPlatform } from './types';
import { SERVICES, CATEGORIES } from './constants';
import { History, List, Wallet, HelpCircle, AlertCircle, Settings, User as UserIcon, ShieldCheck, Filter, Search, Grid, LayoutList, ChevronRight, Users, Activity, Package, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('smm_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('smm_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('smm_user');
    setActiveTab('dashboard');
  };

  const handlePlaceOrder = (order: Order) => {
    if (!user) return;
    setOrders(prev => [{ ...order, userName: user.name }, ...prev]);
    const updatedUser = {
      ...user,
      balance: user.balance - order.charge,
      totalSpent: user.totalSpent + order.charge,
      totalOrders: user.totalOrders + 1
    };
    setUser(updatedUser);
    localStorage.setItem('smm_user', JSON.stringify(updatedUser));
  };

  const handleAddFunds = (amount: number) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      balance: user.balance + amount
    };
    setUser(updatedUser);
    localStorage.setItem('smm_user', JSON.stringify(updatedUser));
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={{ balance: user.balance, totalSpent: user.totalSpent, totalOrders: user.totalOrders }} orders={orders} />;
      case 'new-order':
        return <NewOrder balance={user.balance} onPlaceOrder={handlePlaceOrder} />;
      case 'services':
        return <ServiceCatalog onSelectOrder={() => setActiveTab('new-order')} />;
      case 'orders':
        return <OrderHistory orders={orders} />;
      case 'admin-panel':
        return user.role === 'admin' ? <AdminPanel orders={orders} /> : null;
      case 'add-funds':
        return <AddFunds onAdd={handleAddFunds} />;
      case 'ai-assistant':
        return <AIAssistant />;
      case 'profile':
        return <Profile user={user} onLogout={handleLogout} onUpdate={(u) => setUser(u)} />;
      case 'support':
        return <Support />;
      default:
        return <Dashboard stats={{ balance: user.balance, totalSpent: user.totalSpent, totalOrders: user.totalOrders }} orders={orders} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} balance={user.balance} role={user.role}>
      {renderContent()}
    </Layout>
  );
};

const ServiceCatalog = ({ onSelectOrder }: { onSelectOrder: () => void }) => {
  const [platform, setPlatform] = useState<SocialPlatform | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Extract unique service types for filtering
  const serviceTypes = ['All', ...Array.from(new Set(SERVICES.map(s => s.type)))];

  const filtered = SERVICES.filter(s => 
    (platform === 'All' || s.category === platform) &&
    (typeFilter === 'All' || s.type === typeFilter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || 
     s.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-6 lg:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div className="space-y-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filter by Platform</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', ...CATEGORIES].map(p => (
                <button 
                  key={p} 
                  onClick={() => setPlatform(p as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${platform === p ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-600'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 w-full lg:w-64">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all" 
                placeholder="Search services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-1 flex shrink-0">
              <button onClick={() => setView('grid')} className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-slate-700 text-indigo-400 shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>
                <Grid className="w-4 h-4" />
              </button>
              <button onClick={() => setView('list')} className={`p-2 rounded-lg transition-all ${view === 'list' ? 'bg-slate-700 text-indigo-400 shadow-md' : 'text-slate-500 hover:text-slate-300'}`}>
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/50">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Filter by Service Type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {serviceTypes.map(type => (
              <button 
                key={type} 
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${typeFilter === type ? 'bg-slate-700 border-indigo-500/50 text-indigo-400 shadow-lg' : 'bg-slate-800/50 border-slate-700 text-slate-500 hover:text-slate-300'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => (
            <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-[28px] p-6 hover:border-indigo-500/30 transition-all group relative overflow-hidden flex flex-col shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-600 opacity-0 group-hover:opacity-5 blur-[40px] rounded-full transition-opacity" />
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1">
                  <span className="px-2 py-0.5 bg-slate-800 text-[9px] font-black text-slate-400 rounded-lg border border-slate-700 uppercase tracking-[0.2em] w-fit">{s.category}</span>
                  <span className="text-[10px] text-indigo-400 font-bold ml-1">{s.type}</span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-white">${s.ratePer1000.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">per 1k</p>
                </div>
              </div>
              <h4 className="text-slate-200 font-bold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[2.5rem] leading-tight">{s.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2 flex-grow">{s.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-black uppercase tracking-wider">
                  <ClockIcon className="w-3.5 h-3.5" /> {s.estimatedTime}
                </div>
                <button 
                  onClick={onSelectOrder}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/10"
                >
                  Order Now
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <div className="bg-slate-900/50 border border-dashed border-slate-800 rounded-[32px] p-12">
                <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-medium">No services match your current filters.</p>
                <button onClick={() => {setPlatform('All'); setTypeFilter('All'); setSearch('')}} className="mt-4 text-indigo-400 text-xs font-bold hover:underline">Clear all filters</button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-[28px] overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800/30 text-[10px] font-black text-slate-500 uppercase tracking-widest border-b border-slate-800/50">
              <tr>
                <th className="px-6 py-5">Service Details</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5">Avg. Time</th>
                <th className="px-6 py-5 text-right">Price / 1k</th>
                <th className="px-6 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center text-[10px] font-black text-indigo-400 group-hover:border-indigo-500/30 transition-all">
                        #{s.id}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{s.name}</p>
                        <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest">{s.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1 bg-slate-800 rounded-lg">{s.type}</span>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                      <ClockIcon className="w-3.5 h-3.5" /> {s.estimatedTime}
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <p className="text-base font-black text-white">${s.ratePer1000.toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button 
                      onClick={onSelectOrder}
                      className="p-2 bg-indigo-600/10 text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <p className="text-slate-500 italic">No services found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const AdminPanel = ({ orders }: { orders: Order[] }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminStatCard label="Platform Revenue" value="$42,390" icon={Wallet} color="text-indigo-400" />
        <AdminStatCard label="Total Users" value="1,248" icon={Users} color="text-emerald-400" />
        <AdminStatCard label="Pending Orders" value={orders.length.toString()} icon={Activity} color="text-amber-400" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Package className="text-indigo-500" /> Global Order Feed
          </h2>
          <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Admin Oversight</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
              <tr>
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Service</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {orders.map(order => (
                <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-8 py-6 text-slate-500 font-mono text-sm">#{order.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-indigo-600/20 rounded-full border border-indigo-500/20 flex items-center justify-center text-xs font-black text-indigo-400">{order.userName?.charAt(0)}</div>
                      <span className="text-xs font-bold text-slate-200">{order.userName}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-bold text-slate-200">{order.serviceName}</p>
                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-black tracking-widest">Qty: {order.quantity}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">{order.status}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <select className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-[10px] font-bold text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
                      <option>Update Status</option>
                      <option>Complete</option>
                      <option>Cancel</option>
                      <option>Refund</option>
                    </select>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Activity className="w-12 h-12 text-slate-800" />
                      <p className="text-slate-500 italic font-medium">No live orders at the moment.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminStatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-[28px] p-6 hover:border-indigo-500/30 transition-all shadow-xl">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl bg-slate-800/50 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] text-emerald-400 font-black uppercase tracking-widest bg-emerald-400/5 px-2 py-1 rounded-lg">+12.4%</span>
    </div>
    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
    <h3 className="text-2xl font-black text-white tracking-tight">{value}</h3>
  </div>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

const OrderHistory = ({ orders }: { orders: Order[] }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden animate-in fade-in duration-500 shadow-2xl">
    <div className="p-8 border-b border-slate-800">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <History className="text-indigo-500" /> Order History
      </h2>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-slate-800/50 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
          <tr>
            <th className="px-8 py-5">Order ID</th>
            <th className="px-8 py-5">Service Details</th>
            <th className="px-8 py-5">Total Charge</th>
            <th className="px-8 py-5">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {orders.map(order => (
            <tr key={order.id} className="hover:bg-slate-800/30 transition-colors">
              <td className="px-8 py-6 text-slate-500 font-mono text-sm">#{order.id}</td>
              <td className="px-8 py-6">
                <p className="text-slate-200 font-bold">{order.serviceName}</p>
                <p className="text-xs text-indigo-400 truncate w-64 mt-1 font-mono">{order.link}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Qty: {order.quantity}</p>
              </td>
              <td className="px-8 py-6 text-white font-black text-lg">${order.charge.toFixed(2)}</td>
              <td className="px-8 py-6">
                <span className={`
                  px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border
                  ${order.status === OrderStatus.COMPLETED ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                    order.status === OrderStatus.PENDING ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}
                `}>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
          {orders.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-24 text-center">
                <div className="flex flex-col items-center">
                  <ShoppingCartIcon className="w-12 h-12 text-slate-800 mb-4" />
                  <p className="text-slate-500 italic font-medium">No orders found. Ready to boost your engagement?</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

const Profile = ({ user, onLogout, onUpdate }: { user: User, onLogout: () => void, onUpdate: (u: User) => void }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleSave = () => {
    onUpdate(formData);
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 text-center shadow-xl">
            <div className="w-24 h-24 bg-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-600/20 border-4 border-slate-800 relative">
              {user.name.charAt(0)}
              {user.role === 'admin' && <div className="absolute -top-2 -right-2 bg-amber-500 p-1.5 rounded-lg shadow-lg border-2 border-slate-900"><ShieldCheck className="w-4 h-4 text-white" /></div>}
            </div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-slate-500 text-sm mb-6">{user.email}</p>
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setEditing(!editing)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all"
              >
                {editing ? 'Cancel Editing' : 'Edit Profile'}
              </button>
              <button 
                onClick={onLogout}
                className="w-full py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-xs font-bold transition-all"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Settings className="text-indigo-500" /> Account Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Display Name</label>
                <input 
                  disabled={!editing}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Niche / Industry</label>
                <input 
                  disabled={!editing}
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 transition-all"
                  value={formData.niche || ''}
                  placeholder="e.g. E-commerce"
                  onChange={(e) => setFormData({...formData, niche: e.target.value})}
                />
              </div>
            </div>

            {editing && (
              <button 
                onClick={handleSave}
                className="mt-8 w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Support = () => (
  <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
    <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
        <HelpCircle className="text-indigo-500" /> Support Center
      </h2>
      <div className="space-y-4">
        <div className="p-6 bg-slate-800/50 border border-slate-700 rounded-2xl group hover:border-indigo-500/30 transition-all">
          <h4 className="font-bold text-white mb-2">Raise a Dispute</h4>
          <p className="text-slate-400 text-sm mb-4">Facing issues with an order delivery? We resolve within 12 hours.</p>
          <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/10">
            Open Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

export default App;
