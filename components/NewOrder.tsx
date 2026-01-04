
import React, { useState, useEffect } from 'react';
import { SERVICES, CATEGORIES } from '../constants';
import { Service, Order, OrderStatus, SocialPlatform } from '../types';
import { AlertCircle, CheckCircle2, ShoppingCart, Info, Clock } from 'lucide-react';

interface NewOrderProps {
  balance: number;
  onPlaceOrder: (order: Order) => void;
}

const NewOrder: React.FC<NewOrderProps> = ({ balance, onPlaceOrder }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const filteredServices = SERVICES.filter(s => s.category === category);
  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || filteredServices[0];

  useEffect(() => {
    if (!selectedServiceId && filteredServices.length > 0) {
      setSelectedServiceId(filteredServices[0].id);
    }
  }, [category]);

  const charge = selectedService ? (quantity / 1000) * selectedService.ratePer1000 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!link.startsWith('http')) {
      setError('Please enter a valid URL');
      return;
    }

    if (quantity < (selectedService?.min || 1) || quantity > (selectedService?.max || 999999)) {
      setError(`Quantity must be between ${selectedService?.min} and ${selectedService?.max}`);
      return;
    }

    if (charge > balance) {
      setError('Insufficient balance. Please add funds via UPI.');
      return;
    }

    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      serviceId: selectedService?.id || '',
      serviceName: selectedService?.name || '',
      link,
      quantity,
      charge,
      status: OrderStatus.PENDING,
      date: new Date().toLocaleDateString()
    };

    onPlaceOrder(newOrder);
    setSuccess('Order placed successfully!');
    setLink('');
    setQuantity(0);

    setTimeout(() => setSuccess(''), 5000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <ShoppingCart className="text-indigo-500" /> Place New Order
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Category</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                  value={category}
                  // Fix: Explicitly cast e.target.value to SocialPlatform to match state type
                  onChange={(e) => setCategory(e.target.value as SocialPlatform)}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Service</label>
                <select 
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 appearance-none"
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                >
                  {filteredServices.map(s => <option key={s.id} value={s.id}>{s.name} - ${s.ratePer1000}/k</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Target URL / Link</label>
              <input 
                type="text" 
                placeholder="https://social.com/p/your-post"
                className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Quantity</label>
                <input 
                  type="number" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  value={quantity || ''}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  min={selectedService?.min}
                  max={selectedService?.max}
                  required
                />
                <p className="text-[10px] text-slate-500 mt-2 ml-1">Limit: {selectedService?.min} - {selectedService?.max}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Calculated Charge</label>
                <div className="w-full bg-indigo-900/20 border border-indigo-500/30 rounded-2xl px-4 py-4 text-indigo-400 font-bold text-xl">
                  ${charge.toFixed(2)}
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl text-sm">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                {success}
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all transform active:scale-[0.98]"
            >
              Confirm and Order
            </button>
          </form>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <Info className="w-5 h-5 text-indigo-400" /> Service Analytics
          </h3>
          <div className="space-y-5">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Selected Service</p>
              <p className="text-sm text-slate-200 mt-1 font-medium">{selectedService?.name}</p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Clock className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Avg. Delivery Time</p>
                <p className="text-sm text-indigo-400 font-bold">{selectedService?.estimatedTime}</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quality Description</p>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{selectedService?.description}</p>
            </div>
            <div className="pt-5 border-t border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cost Estimate</p>
              <div className="flex justify-between mt-2">
                <span className="text-sm text-slate-400">Rate per 1000 units</span>
                <span className="text-sm text-white font-mono font-bold">${selectedService?.ratePer1000.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[32px] p-8 text-white relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-white/10 blur-[40px] rounded-full group-hover:scale-125 transition-transform" />
          <h3 className="text-xl font-bold mb-3">Maximize Growth</h3>
          <p className="text-sm text-indigo-100 mb-6 opacity-90 leading-relaxed">Our AI strategist can help you optimize your delivery speed for better engagement.</p>
          <button className="w-full py-3 bg-white text-indigo-700 rounded-xl text-sm font-bold shadow-lg transition-all active:scale-95">
            Unlock AI Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
