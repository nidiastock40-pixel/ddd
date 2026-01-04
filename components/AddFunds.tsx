
import React, { useState } from 'react';
import { Wallet, Smartphone, AlertCircle, CheckCircle2, Copy, ExternalLink, QrCode } from 'lucide-react';

const UPI_ID = '9102742539@ybl';

interface AddFundsProps {
  onAdd: (amount: number) => void;
}

const AddFunds: React.FC<AddFundsProps> = ({ onAdd }) => {
  const [amount, setAmount] = useState(0);
  const [utr, setUtr] = useState('');
  const [step, setStep] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyUpi = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDeposit = () => {
    if (amount > 0 && utr.length >= 10) {
      onAdd(amount);
      setShowConfirm(true);
      setAmount(0);
      setUtr('');
      setStep(1);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Payment Section */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-[32px] p-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <Wallet className="text-indigo-500" /> Add Funds
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-indigo-600/10 border border-indigo-500/20 p-4 rounded-2xl">
              <div className="p-3 bg-indigo-600 rounded-xl">
                <Smartphone className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-white font-bold">UPI Fast Deposit</p>
                <p className="text-slate-400 text-xs">Instant settlement after UTR verification</p>
              </div>
            </div>

            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Deposit Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-lg font-bold">$</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-10 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      value={amount || ''}
                      onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                      placeholder="Enter amount"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {[10, 50, 100, 500].map(val => (
                      <button 
                        key={val}
                        onClick={() => setAmount(val)}
                        className="py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition-all"
                      >
                        +${val}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  disabled={amount <= 0}
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-2xl font-bold shadow-xl shadow-indigo-600/20 transition-all"
                >
                  Continue to Pay
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-right-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center">
                  <p className="text-slate-400 text-sm mb-4">Scan QR or Pay to UPI ID</p>
                  <div className="w-48 h-48 bg-white mx-auto rounded-2xl p-4 mb-4 flex items-center justify-center relative group">
                    <QrCode className="w-full h-full text-slate-900" />
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                      <p className="text-white text-xs font-bold px-4 text-center">Open in PhonePe/GPay</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl mb-2">
                    <span className="text-white font-mono font-bold">{UPI_ID}</span>
                    <button onClick={copyUpi} className="p-1.5 hover:bg-slate-700 rounded-lg text-indigo-400 transition-all">
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-500">Amount: <span className="text-white font-bold">${amount}</span></p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Enter Transaction ID (UTR)</label>
                  <input 
                    type="text" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-4 py-4 text-white font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/50 uppercase"
                    placeholder="12 Digit Transaction ID"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value)}
                  />
                  <p className="text-[10px] text-slate-500 mt-2">Find UTR in your payment history app</p>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-slate-800 text-slate-400 rounded-2xl font-bold hover:text-white transition-all"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleDeposit}
                    disabled={utr.length < 10}
                    className="flex-[2] py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-xl shadow-emerald-600/20 transition-all"
                  >
                    Confirm Payment
                  </button>
                </div>
              </div>
            )}
          </div>

          {showConfirm && (
            <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center gap-3 animate-bounce">
              <CheckCircle2 className="w-5 h-5" /> Deposit submitted for verification!
            </div>
          )}
        </div>

        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-[32px] p-8">
            <h3 className="text-lg font-bold text-white mb-6">Payment Guide</h3>
            <ul className="space-y-4">
              {[
                'Enter the amount you wish to deposit.',
                'Pay the exact amount to the displayed UPI ID.',
                'Copy the Transaction ID (UTR) from your payment app.',
                'Paste the ID above and click Confirm.',
                'Balance will be credited within 5-15 minutes.'
              ].map((text, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold shrink-0 mt-0.5">{idx + 1}</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-[32px] p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-amber-500 w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Important</h3>
            </div>
            <p className="text-sm text-amber-200/80 leading-relaxed">
              Always double-check the UPI ID before paying. In case of delay, please contact support with a screenshot of your payment.
            </p>
            <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all">
              Contact Support <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFunds;
