"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../sanity/client";

export default function StoreView({ products }: { products: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Products" },
    { value: "bat", label: "Bats" },
    { value: "gloves", label: "Gloves" },
    { value: "clothing", label: "Clothing" },
    { value: "pads", label: "Pads" },
    { value: "accessories", label: "Accessories" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header with Breadcrumb */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-900 font-semibold">Store</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight">
            SR Sports <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600">Store</span>
          </h1>
          <p className="text-xl text-gray-600 font-medium max-w-2xl">
            Discover premium cricket equipment crafted for champions. Quality gear that elevates your performance.
          </p>
        </div>
        
        {/* Search & Filter Section */}
        <div className="mb-12 space-y-6">
          {/* Search Bar with Modern Design */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search for products..." 
              className="w-full pl-14 pr-6 py-5 rounded-2xl border-2 border-gray-200 outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all text-lg shadow-sm bg-white font-medium placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Category Filters - Pill Style */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button 
                key={cat.value} 
                onClick={() => setSelectedCategory(cat.value)} 
                className={`relative whitespace-nowrap px-8 py-3.5 rounded-full font-bold transition-all duration-300 ${
                  selectedCategory === cat.value 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-xl shadow-green-500/30 scale-105' 
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400 hover:shadow-md hover:scale-105'
                }`}
              >
                {cat.label}
                {selectedCategory === cat.value && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count with Filter Info */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-gray-600 font-medium">
            Found <span className="text-green-600 font-black text-xl">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'}
            {selectedCategory !== "all" && (
              <span className="ml-2 text-gray-500">
                in <span className="font-semibold text-gray-700">{categories.find(c => c.value === selectedCategory)?.label}</span>
              </span>
            )}
          </div>
          
          {(searchTerm || selectedCategory !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="text-sm text-gray-500 hover:text-green-600 font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Clear filters
            </button>
          )}
        </div>

        {/* Product Grid - Enhanced */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const totalStock = (product.sizes && product.sizes.length > 0)
              ? product.sizes.reduce((acc: number, item: any) => acc + (item.stock || 0), 0)
              : (product.quantity || 0);

            const isLowStock = totalStock > 0 && totalStock < 5;
            const isOutOfStock = totalStock === 0;

            return (
              <Link href={`/product/${product.slug.current}`} key={product._id} className="group">
                <div className="bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                    {product.image && (
                      <Image 
                        src={urlFor(product.image).width(400).url()} 
                        alt={product.name} 
                        fill 
                        className="object-contain p-8 group-hover:scale-110 transition-transform duration-700" 
                      />
                    )}
                    
                    {/* Stock Badge */}
                    {isOutOfStock && (
                      <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl">
                        Out of Stock
                      </div>
                    )}
                    
                    {isLowStock && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl animate-pulse">
                        Only {totalStock} left
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg uppercase tracking-wider border border-gray-100">
                      {product.category}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 text-lg group-hover:text-green-700 transition-colors leading-tight">
                      {product.name}
                    </h3>
                    
                    <div className="mt-auto flex justify-between items-center">
                      <div>
                        <div className="text-3xl font-black text-gray-900">
                          ₹{product.price.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Inclusive of all taxes</div>
                      </div>
                      <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-600 group-hover:from-green-700 group-hover:to-emerald-700 rounded-2xl flex items-center justify-center transition-all shadow-lg shadow-green-500/30 group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-12">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty State - Enhanced */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">No products found</h3>
            <p className="text-lg text-gray-600 mb-6">We couldn't find any products matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}