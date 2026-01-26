"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

interface PinLockProps {
  onUnlock: () => void;
}

export default function PinLock({ onUnlock }: PinLockProps) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const CORRECT_PIN = "1251";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === CORRECT_PIN) {
      onUnlock();
    } else {
      setError(true);
      setPin("");
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-lg">
      <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-md w-full mx-4">
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
            <Lock className="text-white" size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-900">Admin Access</h2>
          <p className="text-gray-600 font-medium mt-2">Enter PIN to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              inputMode="numeric"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
              placeholder="• • • •"
              className={`w-full text-center text-3xl font-black tracking-widest py-4 px-6 rounded-2xl border-2 outline-none transition-all ${
                error
                  ? "border-red-500 bg-red-50 animate-shake"
                  : "border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              }`}
              autoFocus
            />
            {error && (
              <p className="text-red-600 text-sm font-bold mt-2 text-center animate-pulse">
                Incorrect PIN. Try again.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={pin.length !== 4}
            className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
          >
            Unlock Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}