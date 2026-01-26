"use client";

export const dynamic = 'force-dynamic';
import { client } from "../sanity/client";
import { useState, useEffect } from "react";
import {
  Search as SearchIcon,
  Download as DownloadIcon,
  FileText as FileTextIcon,
  ShoppingCart as ShoppingCartIcon,
  TrendingUp as TrendingUpIcon,
  Package as PackageIcon,
  CreditCard as CreditCardIcon,
  Plus as PlusIcon,
  Trash2 as Trash2Icon,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import PinLock from "./components/PinLock";
import KhataTab, { Customer, Transaction } from "./components/KhataTab";

// Types
interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  quantity: number;
  sizes?: { _key: string; size: string; stock: number }[];
}

interface LogItem {
  name: string;
  price: number;
  quantity: number;
  type: "sale";
  time: string;
  id?: string;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<LogItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<"sales" | "khata">("sales");

  // Load data from persistent storage
  useEffect(() => {
    const loadPersistedData = async () => {
      try {
        const today = new Date().toDateString();
        
        // Load sales log
        const salesData = localStorage.getItem(`sales_log_${today}`);
        if (salesData) {
          setCart(JSON.parse(salesData));
        }

        // Load customers from khata
        const customersData = localStorage.getItem("khata_customers");
        if (customersData) {
          setCustomers(JSON.parse(customersData));
        }
      } catch (error) {
        console.log("No persisted data found or error loading:", error);
      }
    };

    loadPersistedData();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "product"] | order(_updatedAt desc) {
        _id, name, price, category, quantity, sizes
      }`;
      const data = await client.fetch(query);
      setProducts(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Save cart to persistent storage
  const saveCart = async (newCart: LogItem[]) => {
    try {
      const today = new Date().toDateString();
      localStorage.setItem(`sales_log_${today}`, JSON.stringify(newCart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Save customers to persistent storage
  const saveCustomers = async (newCustomers: Customer[]) => {
    try {
      localStorage.setItem("khata_customers", JSON.stringify(newCustomers));
      setCustomers(newCustomers);
    } catch (error) {
      console.error("Error saving customers:", error);
    }
  };

  const handleTransaction = async (
    product: Product,
    sizeKey: string | null
  ) => {
    const priceInput = prompt(
      `Selling ${product.name}.\nStandard Price: ₹${product.price}\n\nEnter Selling Price:`,
      product.price.toString()
    );
    if (priceInput === null) return;
    const finalPrice = parseInt(priceInput) || 0;

    // Ask about payment status
    const pendingPayment = window.confirm(
      "Is payment pending (Khata)?\n\nOK = Add to Khata\nCancel = Paid Now"
    );
    
    let customerForKhata: Customer | null = null;

    if (pendingPayment) {
      // Check if there are existing customers
      if (customers.length > 0) {
        const customerList = customers.map((c, i) => `${i + 1}. ${c.name}`).join("\n");
        const choice = prompt(
          `Select customer or add new:\n\n${customerList}\n\nEnter number (or type new name):`
        );
        
        if (!choice) return;

        const choiceNum = parseInt(choice);
        if (!isNaN(choiceNum) && choiceNum > 0 && choiceNum <= customers.length) {
          customerForKhata = customers[choiceNum - 1];
        } else {
          // New customer
          const phone = prompt("Enter phone number (optional):") || "";
          const newCustomer: Customer = {
            id: `customer_${Date.now()}`,
            name: choice.trim(),
            phone,
            transactions: [],
            balance: 0,
          };
          customerForKhata = newCustomer;
        }
      } else {
        // First customer
        const name = prompt("Enter customer name:");
        if (!name) return;
        const phone = prompt("Enter phone number (optional):") || "";
        const newCustomer: Customer = {
          id: `customer_${Date.now()}`,
          name: name.trim(),
          phone,
          transactions: [],
          balance: 0,
        };
        customerForKhata = newCustomer;
      }
    }

    const updatedProducts = products.map((p) => {
      if (p._id === product._id) {
        if (p.sizes && sizeKey) {
          return {
            ...p,
            sizes: p.sizes.map((s) =>
              s._key === sizeKey ? { ...s, stock: Math.max(0, s.stock - 1) } : s
            ),
          };
        }
        return { ...p, quantity: Math.max(0, p.quantity - 1) };
      }
      return p;
    });
    setProducts(updatedProducts);

    try {
      await fetch("/api/update-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product._id, sizeKey, quantitySold: 1 }),
      });

      const now = new Date();
      const itemName = `${product.name}${sizeKey ? ` — ${sizeKey}` : ""}`;

      if (customerForKhata) {
        // Add to khata
        const transaction: Transaction = {
          id: `txn_${Date.now()}`,
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          type: "item_given",
          itemName,
          quantity: 1,
          amount: finalPrice,
        };

        const existingCustomer = customers.find(c => c.id === customerForKhata.id);
        let updatedCustomers: Customer[];

        if (existingCustomer) {
          updatedCustomers = customers.map(c => {
            if (c.id === customerForKhata.id) {
              return {
                ...c,
                transactions: [...c.transactions, transaction],
                balance: c.balance + finalPrice,
              };
            }
            return c;
          });
        } else {
          customerForKhata.transactions = [transaction];
          customerForKhata.balance = finalPrice;
          updatedCustomers = [...customers, customerForKhata];
        }

        await saveCustomers(updatedCustomers);
      } else {
        // Regular sale - add to today's revenue
        const newLogItem: LogItem = {
          name: itemName,
          price: finalPrice,
          quantity: 1,
          type: "sale",
          time: now.toLocaleTimeString(),
          id: `${Date.now()}_${Math.random()}`,
        };

        const newCart = [...cart, newLogItem];
        setCart(newCart);
        await saveCart(newCart);
      }
    } catch (err) {
      window.alert("Network error. Please try again.");
      setProducts(products);
    }
  };

  const handleRestock = async (product: Product, sizeKey: string | null) => {
    const input = prompt(`Add stock for ${product.name}.\n\nEnter quantity to add:`);
    if (input === null) return;
    
    const quantityToAdd = parseInt(input) || 0;
    if (quantityToAdd <= 0) {
      window.alert("Please enter a valid quantity");
      return;
    }

    const updatedProducts = products.map((p) => {
      if (p._id === product._id) {
        if (p.sizes && sizeKey) {
          return {
            ...p,
            sizes: p.sizes.map((s) =>
              s._key === sizeKey ? { ...s, stock: s.stock + quantityToAdd } : s
            ),
          };
        }
        return { ...p, quantity: p.quantity + quantityToAdd };
      }
      return p;
    });
    setProducts(updatedProducts);

    try {
      await fetch("/api/update-stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          productId: product._id, 
          sizeKey, 
          quantitySold: -quantityToAdd
        }),
      });
    } catch (err) {
      window.alert("Network error. Please try again.");
      setProducts(products);
    }
  };

  const handleAddCustomer = async (name: string, phone: string) => {
    const newCustomer: Customer = {
      id: `customer_${Date.now()}`,
      name,
      phone,
      transactions: [],
      balance: 0,
    };
    await saveCustomers([...customers, newCustomer]);
  };

  const handleAddTransaction = async (
    customerId: string,
    transaction: Omit<Transaction, "id" | "date" | "time">
  ) => {
    const now = new Date();
    const fullTransaction: Transaction = {
      ...transaction,
      id: `txn_${Date.now()}`,
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
    };

    const updatedCustomers = customers.map(c => {
      if (c.id === customerId) {
        return {
          ...c,
          transactions: [...c.transactions, fullTransaction],
          balance: c.balance + fullTransaction.amount,
        };
      }
      return c;
    });

    await saveCustomers(updatedCustomers);

    // If it's a payment, also add to today's revenue
    if (transaction.type === "payment") {
      const paymentLog: LogItem = {
        name: `Payment from ${customers.find(c => c.id === customerId)?.name}`,
        price: Math.abs(fullTransaction.amount),
        quantity: 1,
        type: "sale",
        time: now.toLocaleTimeString(),
        id: `payment_${Date.now()}`,
      };
      const newCart = [...cart, paymentLog];
      setCart(newCart);
      await saveCart(newCart);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    const updatedCustomers = customers.filter(c => c.id !== customerId);
    await saveCustomers(updatedCustomers);
  };

  const handleEndDay = async () => {
    if (!window.confirm("End day and clear today's sales log? This cannot be undone!")) return;
    
    try {
      const today = new Date().toDateString();
      localStorage.removeItem(`sales_log_${today}`);
      setCart([]);
      window.alert("Day ended successfully. Sales log cleared.");
    } catch (error) {
      console.error("Error ending day:", error);
      window.alert("Error clearing data. Please try again.");
    }
  };

  const downloadExcel = () => {
    if (cart.length === 0) return window.alert("No sales to export.");

    const header = ["Time", "Type", "Item Name", "Amount(INR)"];
    const rows = cart.map((item) => [
      item.time,
      item.type.toUpperCase(),
      item.name,
      item.price.toString(),
    ]);

    const csvContent =
      [header, ...rows].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toLocaleDateString().replace(/\//g, "-");
    link.href = url;
    link.setAttribute("download", `SR_Sales_${date}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (cart.length === 0) return window.alert("No sales to export.");

    const doc = new jsPDF();
    const date = new Date().toLocaleDateString();

    doc.setFontSize(18);
    doc.text("SR Sports — Daily Sales Report", 14, 22);
    doc.setFontSize(11);
    doc.text(`Date: ${date}`, 14, 30);

    const tableData = cart.map((item) => [
      item.time,
      item.type.toUpperCase(),
      item.name,
      `Rs. ${item.price.toLocaleString("en-IN")}`,
    ]);

    autoTable(doc, {
      head: [["Time", "Type", "Item Name", "Amount"]],
      body: tableData,
      startY: 40,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 163, 74] },
    });

    const totalRevenue = cart.reduce((a, b) => a + b.price, 0);
    const finalY = (doc as any).lastAutoTable?.finalY ?? 40;
    doc.setFontSize(12);
    doc.text(`Total Revenue: Rs. ${totalRevenue.toLocaleString("en-IN")}`, 14, finalY + 12);

    const fileName = `SR_Sales_${date}.pdf`;
    doc.save(fileName);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalSales = cart.reduce((a, b) => a + b.price, 0);
  const totalTransactions = cart.length;
  const totalKhata = customers.reduce((sum, c) => sum + c.balance, 0);

  if (!isUnlocked) {
    return <PinLock onUnlock={() => setIsUnlocked(true)} />;
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
              Sales <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Dashboard</span>
            </h1>
            <p className="text-gray-600 font-medium">Track and manage your daily sales & inventory</p>
          </div>
          
          <a
            href="https://www.sanity.io/@ocb0FsnoK/studio/j5cf7j6vts06cplxoo3ld045/default/structure/product"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 whitespace-nowrap"
          >
            <PlusIcon size={20} />
            <span>Add New Product</span>
            <ExternalLinkIcon size={16} />
          </a>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab("sales")}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all ${
              activeTab === "sales"
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <ShoppingCartIcon className="inline mr-2" size={20} />
            Sales & Inventory
          </button>
          <button
            onClick={() => setActiveTab("khata")}
            className={`flex-1 py-4 px-6 rounded-2xl font-bold transition-all relative ${
              activeTab === "khata"
                ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200"
            }`}
          >
            <CreditCardIcon className="inline mr-2" size={20} />
            Khata ({customers.length})
            {totalKhata > 0 && activeTab !== "khata" && (
              <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center animate-pulse">
                !
              </span>
            )}
          </button>
        </div>

        {activeTab === "sales" ? (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <TrendingUpIcon className="text-white" size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Today's Cash</p>
                </div>
                <p className="text-3xl font-black text-gray-900">₹{totalSales.toLocaleString("en-IN")}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <ShoppingCartIcon className="text-white" size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Transactions</p>
                </div>
                <p className="text-3xl font-black text-gray-900">{totalTransactions}</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <CreditCardIcon className="text-white" size={20} />
                  </div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Khata Pending</p>
                </div>
                <p className="text-3xl font-black text-gray-900">₹{totalKhata.toLocaleString("en-IN")}</p>
              </div>
            </div>

            {/* Khata Alert */}
            {totalKhata > 0 && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider opacity-90 mb-1">Pending Khata</p>
                    <p className="text-3xl font-black">₹{totalKhata.toLocaleString("en-IN")}</p>
                    <p className="text-sm opacity-90 mt-1">{customers.filter(c => c.balance > 0).length} customer{customers.filter(c => c.balance > 0).length !== 1 ? "s" : ""} with pending amount</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("khata")}
                    className="bg-white text-orange-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                  >
                    View Khata
                  </button>
                </div>
              </div>
            )}

            {/* Search & Export */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <SearchIcon className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Search products by name..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none text-lg shadow-sm bg-white font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={downloadPDF}
                  className="flex items-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <FileTextIcon size={20} />
                  <span>PDF</span>
                </button>

                <button
                  onClick={downloadExcel}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <DownloadIcon size={20} />
                  <span>CSV</span>
                </button>

                <button
                  onClick={handleEndDay}
                  className="flex items-center gap-2 bg-red-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Trash2Icon size={20} />
                  <span>End Day</span>
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const isClothing = product.sizes && product.sizes.length > 0;
                const totalStock = isClothing
                  ? product.sizes!.reduce((a, s) => a + s.stock, 0)
                  : product.quantity;
                const isLowStock = totalStock > 0 && totalStock <= 5;
                const isOutOfStock = totalStock === 0;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-3xl p-6 shadow-lg border-2 border-gray-100 hover:border-green-400 hover:shadow-2xl transition-all duration-300"
                  >
                    {/* Product Header */}
                    <div className="mb-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-black text-xl text-gray-900 mb-2 leading-tight">
                            {product.name}
                          </h3>
                          <span className="inline-block text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                        
                        {/* Stock Badge with Restock Button */}
                        <div className="flex items-center gap-2">
                          <div
                            className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider ${
                              isOutOfStock
                                ? "bg-red-100 text-red-700"
                                : isLowStock
                                ? "bg-orange-100 text-orange-700 animate-pulse"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {totalStock} Stock
                          </div>
                          <button
                            onClick={() => handleRestock(product, null)}
                            className="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-110"
                            title="Add Stock"
                          >
                            <PlusIcon size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border-2 border-green-100">
                        <p className="text-xs text-gray-600 font-bold uppercase mb-1">Standard Price</p>
                        <p className="text-3xl font-black text-gray-900">₹{product.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      {isClothing ? (
                        <div className="space-y-2">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Size</p>
                          {product.sizes!.map((s) => {
                            const sizeIsLowStock = s.stock > 0 && s.stock <= 3;
                            const sizeIsOutOfStock = s.stock === 0;
                            
                            return (
                              <div
                                key={s._key}
                                className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border-2 border-gray-100"
                              >
                                <div className="flex flex-col items-center">
                                  <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center mb-1">
                                    <span className="text-sm font-black text-gray-900">{s.size}</span>
                                  </div>
                                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                    sizeIsOutOfStock 
                                      ? 'bg-red-100 text-red-700' 
                                      : sizeIsLowStock 
                                      ? 'bg-orange-100 text-orange-700' 
                                      : 'bg-green-100 text-green-700'
                                  }`}>
                                    {s.stock}
                                  </span>
                                </div>
                                
                                <div className="flex-1 flex gap-2">
                                  <button
                                    disabled={s.stock === 0}
                                    onClick={() => handleTransaction(product, s._key)}
                                    className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg hover:scale-105"
                                  >
                                    Sell
                                  </button>

                                  <button
                                    onClick={() => handleRestock(product, s._key)}
                                    className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:scale-110"
                                    title="Add Stock"
                                  >
                                    <PlusIcon size={16} />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <button
                          disabled={product.quantity === 0}
                          onClick={() => handleTransaction(product, null)}
                          className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
                        >
                          <ShoppingCartIcon size={20} />
                          <span>Record Sale</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <KhataTab 
            customers={customers} 
            onAddCustomer={handleAddCustomer}
            onAddTransaction={handleAddTransaction}
            onDeleteCustomer={handleDeleteCustomer}
          />
        )}
      </div>
    </div>
  );
}