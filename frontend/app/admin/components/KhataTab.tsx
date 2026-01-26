"use client";

import { useState } from "react";
import { 
  CreditCard, 
  ArrowLeft, 
  Plus, 
  DollarSign, 
  Phone, 
  User, 
  Calendar,
  Trash2,
  CheckCircle
} from "lucide-react";

export interface Transaction {
  id: string;
  date: string;
  time: string;
  type: "item_given" | "payment";
  itemName?: string;
  quantity?: number;
  amount: number;
  notes?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  transactions: Transaction[];
  balance: number;
}

interface KhataTabProps {
  customers: Customer[];
  onAddCustomer: (name: string, phone: string) => void;
  onAddTransaction: (customerId: string, transaction: Omit<Transaction, "id" | "date" | "time">) => void;
  onDeleteCustomer: (customerId: string) => void;
}

export default function KhataTab({ 
  customers, 
  onAddCustomer, 
  onAddTransaction,
  onDeleteCustomer 
}: KhataTabProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState<"manual" | "payment">("manual");

  // Form states
  const [newCustomerName, setNewCustomerName] = useState("");
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const totalOutstanding = customers.reduce((sum, c) => sum + c.balance, 0);

  const handleAddCustomer = () => {
    if (!newCustomerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    onAddCustomer(newCustomerName.trim(), newCustomerPhone.trim());
    setNewCustomerName("");
    setNewCustomerPhone("");
    setShowAddCustomer(false);
  };

  const handleAddTransaction = () => {
    if (!selectedCustomer) return;

    if (transactionType === "manual") {
      if (!itemName.trim() || !amount) {
        alert("Please fill in all required fields");
        return;
      }
      onAddTransaction(selectedCustomer.id, {
        type: "item_given",
        itemName: itemName.trim(),
        quantity: parseInt(quantity) || 1,
        amount: parseFloat(amount),
        notes: notes.trim() || undefined,
      });
    } else {
      if (!amount) {
        alert("Please enter payment amount");
        return;
      }
      onAddTransaction(selectedCustomer.id, {
        type: "payment",
        amount: -parseFloat(amount), // Negative = reduces balance
        notes: notes.trim() || undefined,
      });
    }

    // Reset form
    setItemName("");
    setQuantity("1");
    setAmount("");
    setNotes("");
    setShowAddTransaction(false);
  };

  // Customer List View
  if (!selectedCustomer) {
    return (
      <div className="space-y-6">
        {/* Total Outstanding Card */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <CreditCard size={32} />
            <p className="text-sm font-bold uppercase tracking-wider opacity-90">Total Outstanding</p>
          </div>
          <p className="text-5xl font-black">₹{totalOutstanding.toLocaleString("en-IN")}</p>
          <p className="text-sm opacity-90 mt-2">{customers.length} customer{customers.length !== 1 ? "s" : ""} in khata</p>
        </div>

        {/* Add Customer Button */}
        <button
          onClick={() => setShowAddCustomer(true)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          <span>Add New Customer</span>
        </button>

        {/* Add Customer Modal */}
        {showAddCustomer && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl">
              <h3 className="text-2xl font-black text-gray-900 mb-6">Add New Customer</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Customer Name *</label>
                  <input
                    type="text"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    placeholder="e.g. Swaroop Sir"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddCustomer(false);
                    setNewCustomerName("");
                    setNewCustomerPhone("");
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddCustomer}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                >
                  Add Customer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer List */}
        {customers.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="text-green-600" size={64} />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No Customers Yet</h3>
            <p className="text-gray-600">Add your first customer to start tracking khata</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-orange-400 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <User className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                        {customer.name}
                      </h3>
                      {customer.phone && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                          <Phone size={14} />
                          <span className="font-medium">{customer.phone}</span>
                        </div>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        {customer.transactions.length} transaction{customer.transactions.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm text-gray-600 font-bold uppercase tracking-wider mb-1">Balance</p>
                    <p className={`text-3xl font-black ${customer.balance > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                      ₹{Math.abs(customer.balance).toLocaleString("en-IN")}
                    </p>
                    {customer.balance > 0 && (
                      <p className="text-xs text-orange-600 font-bold mt-1">Pending</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Customer Detail View
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => setSelectedCustomer(null)}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-bold transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Customers</span>
      </button>

      {/* Customer Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <User className="text-white" size={32} />
              </div>
              <div>
                <h2 className="text-3xl font-black">{selectedCustomer.name}</h2>
                {selectedCustomer.phone && (
                  <div className="flex items-center gap-2 text-sm opacity-90 mt-1">
                    <Phone size={14} />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Outstanding Balance</p>
              <p className="text-5xl font-black">₹{Math.abs(selectedCustomer.balance).toLocaleString("en-IN")}</p>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm(`Delete ${selectedCustomer.name} and all their transactions?`)) {
                onDeleteCustomer(selectedCustomer.id);
                setSelectedCustomer(null);
              }
            }}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all"
            title="Delete Customer"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            setTransactionType("manual");
            setShowAddTransaction(true);
          }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
        >
          <Plus size={20} />
          <span>Add Item</span>
        </button>

        <button
          onClick={() => {
            setTransactionType("payment");
            setShowAddTransaction(true);
          }}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
        >
          <DollarSign size={20} />
          <span>Record Payment</span>
        </button>
      </div>

      {/* Transaction Modal */}
      {showAddTransaction && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-gray-900 mb-6">
              {transactionType === "manual" ? "Add Item to Account" : "Record Payment"}
            </h3>
            
            <div className="space-y-4">
              {transactionType === "manual" ? (
                <>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Item Name *</label>
                    <input
                      type="text"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Cricket Balls, Bat, Gloves"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Amount (₹) *</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="2400"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none font-medium"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Payment Amount (₹) *</label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="5000"
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none font-medium"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional details..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 focus:ring-4 focus:ring-gray-100 outline-none font-medium resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddTransaction(false);
                  setItemName("");
                  setQuantity("1");
                  setAmount("");
                  setNotes("");
                }}
                className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTransaction}
                className={`flex-1 py-3 text-white font-bold rounded-xl transition-all shadow-lg ${
                  transactionType === "manual"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                }`}
              >
                {transactionType === "manual" ? "Add Item" : "Record Payment"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transaction History */}
      <div className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100">
        <h3 className="text-xl font-black text-gray-900 mb-4">Transaction History</h3>
        
        {selectedCustomer.transactions.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {[...selectedCustomer.transactions].reverse().map((txn) => (
              <div
                key={txn.id}
                className={`p-4 rounded-xl border-2 ${
                  txn.type === "payment" 
                    ? "bg-green-50 border-green-200" 
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-black text-gray-900">
                      {txn.type === "payment" ? "💰 Payment Received" : `📦 ${txn.itemName}`}
                    </p>
                    {txn.quantity && txn.quantity > 1 && (
                      <p className="text-sm text-gray-600 font-medium">Quantity: {txn.quantity}</p>
                    )}
                    {txn.notes && (
                      <p className="text-sm text-gray-600 mt-1 italic">{txn.notes}</p>
                    )}
                  </div>
                  <p className={`text-xl font-black ${
                    txn.type === "payment" ? "text-green-600" : "text-orange-600"
                  }`}>
                    {txn.type === "payment" ? "-" : "+"}₹{Math.abs(txn.amount).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={12} />
                  <span>{txn.date} at {txn.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}