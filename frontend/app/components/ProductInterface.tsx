"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../sanity/client";
import { useSearchParams } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: any;
  slug: { current: string };
  category: string;
  quantity: number;
  sizes?: { size: string; stock: number }[];
}

function ProductContent({ products = [] }: { products?: Product[] }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"home" | "store" | "coaching" | "streaming">("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const getTotalStock = (product: Product): number => {
    if (product.sizes && product.sizes.length > 0) {
      return product.sizes.reduce((acc, item) => acc + (item.stock || 0), 0);
    }
    return product.quantity || 0;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const hasStock = getTotalStock(product) > 0;
    return matchesSearch && matchesCategory && hasStock;
  });

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");
    if (tabFromUrl === "store") setActiveTab("store");
    if (tabFromUrl === "coaching") setActiveTab("coaching");
    if (tabFromUrl === "streaming") setActiveTab("streaming");
  }, [searchParams]);

  const categories = [
    { value: "all", label: "All Products" },
    { value: "bat", label: "Bats" },
    { value: "gloves", label: "Gloves" },
    { value: "clothing", label: "Clothing" },
    { value: "pads", label: "Pads" },
    { value: "accessories", label: "Accessories" },
  ];

  return (
    <div className="min-h-screen bg-white">
      
      {/* CLEAN HEADER WITH SUBTLE COLOR */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => setActiveTab("home")} 
              className="cursor-pointer group"
            >
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight group-hover:text-green-600 transition-colors">
                SR SPORTS
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveTab("home")} 
                className={`text-sm font-medium transition-colors relative ${
                  activeTab === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Home
                {activeTab === 'home' && <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-green-600"></div>}
              </button>
              <button 
                onClick={() => setActiveTab("store")} 
                className={`text-sm font-medium transition-colors relative ${
                  activeTab === 'store' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Store
                {activeTab === 'store' && <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-green-600"></div>}
              </button>
              <button 
                onClick={() => setActiveTab("coaching")} 
                className={`text-sm font-medium transition-colors relative ${
                  activeTab === 'coaching' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Coaching
                {activeTab === 'coaching' && <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-green-600"></div>}
              </button>
              <button 
                onClick={() => setActiveTab("streaming")} 
                className={`text-sm font-medium transition-colors relative ${
                  activeTab === 'streaming' ? 'text-green-600' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Streaming
                {activeTab === 'streaming' && <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-green-600"></div>}
              </button>
            </nav>

            {/* Mobile Menu */}
            <button className="md:hidden text-gray-900">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex gap-6 mt-4 pt-4 border-t border-gray-200">
            <button onClick={() => setActiveTab("home")} className={`text-sm font-medium ${activeTab === 'home' ? 'text-green-600' : 'text-gray-600'}`}>
              Home
            </button>
            <button onClick={() => setActiveTab("store")} className={`text-sm font-medium ${activeTab === 'store' ? 'text-green-600' : 'text-gray-600'}`}>
              Store
            </button>
            <button onClick={() => setActiveTab("coaching")} className={`text-sm font-medium ${activeTab === 'coaching' ? 'text-green-600' : 'text-gray-600'}`}>
              Coaching
            </button>
            <button onClick={() => setActiveTab("streaming")} className={`text-sm font-medium ${activeTab === 'streaming' ? 'text-green-600' : 'text-gray-600'}`}>
              Streaming
            </button>
          </nav>
        </div>
      </header>

      {/* CONTENT */}
      <main>

        {/* HOME VIEW */}
        {activeTab === "home" && (
          <div>
            {/* Hero Section with subtle bg */}
            <section className="relative bg-gradient-to-b from-green-50 to-white py-20 md:py-28">
              <div className="max-w-7xl mx-auto px-6">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                    ELEVATE YOUR GAME
                  </h2>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Premium cricket gear, professional coaching, and broadcast-quality streaming. 
                    Everything you need for your cricket journey.
                  </p>
                  
                  {/* Social Media Links */}
                  <div className="flex flex-wrap justify-center gap-4 mb-10">
                    {/* Instagram Button */}
                    <a 
                      href="https://www.instagram.com/somasani_sports/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:scale-105"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span>Follow on Instagram</span>
                    </a>
                    
                    {/* YouTube Button */}
                    <a 
                      href="https://www.youtube.com/@somasaniraju0521" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:scale-105 hover:bg-red-700"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Watch on YouTube</span>
                    </a>
                  </div>
                  
                  <button 
                    onClick={() => setActiveTab("store")}
                    className="bg-green-600 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-green-700 transition-all shadow-lg shadow-green-100 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    EXPLORE STORE
                  </button>
                </div>
              </div>
            </section>

            {/* Services Grid - Clean with hover effects */}
            <section className="max-w-7xl mx-auto px-6 py-20">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Store */}
                <div 
                  onClick={() => setActiveTab("store")} 
                  className="group cursor-pointer"
                >
                  <div className="aspect-square relative mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-green-400 group-hover:shadow-xl transition-all duration-300">
                    <Image 
                      src="/sr1.webp"
                      alt="Cricket Store"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Cricket Store</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Premium bats, protective gear, and accessories from top brands.
                  </p>
                  <div className="text-sm font-semibold text-green-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Shop Now <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Coaching */}
                <div 
                  onClick={() => setActiveTab("coaching")}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square relative mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-blue-400 group-hover:shadow-xl transition-all duration-300">
                    <Image 
                      src="/coach.jpeg"
                      alt="Pro Coaching"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Pro Coaching</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Train with experienced coaches for all skill levels.
                  </p>
                  <div className="text-sm font-semibold text-blue-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Learn More <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>

                {/* Streaming */}
                <div 
                  onClick={() => setActiveTab("streaming")}
                  className="group cursor-pointer"
                >
                  <div className="aspect-square relative mb-6 overflow-hidden rounded-2xl border-2 border-gray-200 group-hover:border-purple-400 group-hover:shadow-xl transition-all duration-300">
                    <Image 
                      src="/sr2.jpeg"
                      alt="Live Streaming"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-300"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Live Streaming</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    Broadcast your tournaments with HD quality.
                  </p>
                  <div className="text-sm font-semibold text-purple-600 group-hover:gap-2 flex items-center gap-1 transition-all">
                    Explore <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* STORE VIEW */}
        {activeTab === "store" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-10">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Store</h2>
              <p className="text-lg text-gray-600">Premium cricket equipment for every player</p>
            </div>

            {/* Search */}
            <div className="mb-8">
              <div className="relative max-w-md">
                <input 
                  type="text"
                  placeholder="Search products..."
                  className="w-full border-2 border-gray-200 rounded-xl px-5 py-3.5 text-gray-900 placeholder-gray-400 outline-none focus:border-green-500 transition pr-12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="border-b border-gray-200 mb-10">
              <div className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`text-sm font-medium whitespace-nowrap transition pb-3 border-b-2 ${
                      selectedCategory === cat.value
                        ? 'text-green-600 border-green-600'
                        : 'text-gray-500 border-transparent hover:text-gray-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="mb-6 text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const totalStock = getTotalStock(product);
                  
                  return (
                    <Link href={`/product/${product.slug.current}`} key={product._id} className="group">
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-green-300 transition-all hover:shadow-lg">
                        {/* Image */}
                        <div className="relative aspect-square bg-gray-50">
                          {product.image && (
                            <Image 
                              src={urlFor(product.image).width(400).url()} 
                              alt={product.name}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                            />
                          )}
                          {totalStock < 5 && (
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-bold">
                              {totalStock} left
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                            {product.category || 'Equipment'}
                          </p>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm group-hover:text-green-600 transition-colors">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between">
                            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                            <div className="w-8 h-8 rounded-full bg-green-100 group-hover:bg-green-600 flex items-center justify-center transition">
                              <span className="text-green-600 group-hover:text-white text-sm transition">→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <button 
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* COACHING VIEW */}
        {activeTab === "coaching" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Professional Coaching</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Transform your skills with expert guidance. We focus on technique, 
                mental strength, and match fitness to help you reach your potential.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🏏</div>
                  <h4 className="font-bold text-gray-900 mb-2">1-on-1 Batting</h4>
                  <p className="text-sm text-gray-600">Personalized drills and technique refinement</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">⚡</div>
                  <h4 className="font-bold text-gray-900 mb-2">Bowling Action</h4>
                  <p className="text-sm text-gray-600">Action correction and pace development</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">📹</div>
                  <h4 className="font-bold text-gray-900 mb-2">Video Analysis</h4>
                  <p className="text-sm text-gray-600">Detailed performance review</p>
                </div>
              </div>

              <a 
                href="https://wa.me/919030836231?text=Hi,%20I%20am%20interested%20in%20booking%20a%20cricket%20coaching%20session." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
              >
                BOOK YOUR SESSION
              </a>
            </div>
          </div>
        )}

        {/* STREAMING VIEW */}
        {activeTab === "streaming" && (
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Live Streaming</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Broadcast your local tournaments with TV-quality graphics, 
                multi-camera coverage, and professional commentary.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">📹</div>
                  <h4 className="font-bold text-gray-900 mb-2">Multi-Camera Setup</h4>
                  <p className="text-sm text-gray-600">HD broadcast with multiple angles</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold text-gray-900 mb-2">Live Scorecard</h4>
                  <p className="text-sm text-gray-600">Real-time score updates</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🎙️</div>
                  <h4 className="font-bold text-gray-900 mb-2">Commentary</h4>
                  <p className="text-sm text-gray-600">Professional narration</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="text-3xl mb-3">🌐</div>
                  <h4 className="font-bold text-gray-900 mb-2">Online Stream</h4>
                  <p className="text-sm text-gray-600">Reach global audiences</p>
                </div>
              </div>

              <a 
                href="https://wa.me/919030836231?text=Hi,%20I%20want%20to%20book%20live%20streaming%20for%20a%20tournament." 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-sm font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-100"
              >
                BOOK FOR TOURNAMENT
              </a>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function ProductInterface(props: { products?: Product[] }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Store...</p>
        </div>
      </div>
    }>
      <ProductContent {...props} />
    </Suspense>
  );
}