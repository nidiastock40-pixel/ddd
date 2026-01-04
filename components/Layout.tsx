
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  List, 
  History, 
  Wallet, 
  HelpCircle, 
  Menu, 
  X, 
  TrendingUp,
  User as UserIcon,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Package
} from 'lucide-react';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  balance: number;
  role: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, balance, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new-order', label: 'New Order', icon: ShoppingCart },
    { id: 'services', label: 'Services', icon: List },
    { id: 'orders', label: 'Order History', icon: History },
    { id: 'add-funds', label: 'Add Funds', icon: Wallet },
    { id: 'ai-assistant', label: 'AI Strategy', icon: Sparkles },
    { id: 'support', label: 'Support', icon: HelpCircle },
  ];

  // Admin menu items
  const adminItems = [
    { id: 'admin-panel', label: 'Admin Panel', icon: ShieldCheck },
  ];

  const allItems = role === 'admin' ? [...menuItems, ...adminItems] : menuItems;

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden text-slate-200">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out transform
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-indigo-500/10' : '-translate-x-full'}
        lg:relative lg:translate-x-0
      `}>
        <div className="p-8 flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-indigo-600/30">
            <TrendingUp className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent tracking-tight">
            SocialGrowth
          </h1>
        </div>

        <nav className="mt-4 px-6 space-y-1.5 h-[calc(100vh-280px)] overflow-y-auto">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-4">Main Navigation</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`
                w-full flex items-center justify-between px-5 py-3.5 rounded-[20px] text-sm font-bold transition-all
                ${activeTab === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                  : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'}
              `}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                {item.label}
              </div>
              {activeTab === item.id && <ChevronRight className="w-4 h-4 text-white/60" />}
            </button>
          ))}

          {role === 'admin' && (
            <div className="pt-6 space-y-1.5">
              <p className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] mb-4 ml-4">Super Powers</p>
              {adminItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-5 py-3.5 rounded-[20px] text-sm font-bold transition-all
                    ${activeTab === item.id 
                      ? 'bg-amber-500 text-white shadow-xl shadow-amber-500/20' 
                      : 'text-slate-500 hover:bg-slate-800 hover:text-slate-200'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-white' : 'text-slate-500'}`} />
                    {item.label}
                  </div>
                  {activeTab === item.id && <ChevronRight className="w-4 h-4 text-white/60" />}
                </button>
              ))}
            </div>
          )}
        </nav>

        <div className="absolute bottom-10 left-0 w-full px-8">
          <div className="p-6 bg-slate-950/50 rounded-[28px] border border-slate-800/50 shadow-inner">
            <p className="text-[10px] text-slate-500 mb-2 font-black uppercase tracking-[0.2em]">Live Balance</p>
            <p className="text-2xl font-black text-white tracking-tight">${balance.toFixed(2)}</p>
            <button 
              onClick={() => setActiveTab('add-funds')}
              className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/10"
            >
              Add Funds
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header */}
        <header className="h-24 bg-slate-950/80 backdrop-blur-md border-b border-slate-900 flex items-center justify-between px-8 shrink-0 z-30">
          <button 
            className="lg:hidden p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-lg"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm text-slate-500 font-medium">Platform Overview</p>
            <h2 className="text-xl font-bold text-white tracking-tight capitalize">{activeTab.replace('-', ' ')}</h2>
          </div>

          <div className="flex items-center gap-6">
            <div 
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-4 cursor-pointer group"
            >
              <div className="flex flex-col items-end mr-1 hidden sm:flex">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{role === 'admin' ? 'Super Admin' : 'Premium Member'}</span>
                <span className="text-sm text-indigo-400 font-mono font-bold">#94021</span>
              </div>
              <div className="w-12 h-12 bg-slate-900 rounded-[18px] border border-slate-800 flex items-center justify-center group-hover:border-indigo-500/50 transition-all shadow-xl relative">
                <UserIcon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                {role === 'admin' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-500 rounded-full border-2 border-slate-950" />}
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-6xl mx-auto pb-12">
            {children}
          </div>
        </div>

        {/* Subtle Background Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
      </main>
    </div>
  );
};

export default Layout;
