// app/product/[slug]/page.tsx
"use client";

import { client } from "../../sanity/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductGallery from "@/app/components/ProductGallery";

// --- TYPES ---
interface SizeOption {
  size: string;
  stock: number;
  _key: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
  image: any;
  gallery: any[];
  videoUrl: string | null;
  category: string;
  quantity: number;
  sizes: SizeOption[];
}

// --- DATA FETCHING ---
async function getProductData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
    name, 
    price, 
    description, 
    image, 
    gallery, 
    "videoUrl": video.asset->url, 
    category, 
    quantity, 
    sizes
  }`;
  return await client.fetch(query);
}

// --- COMPONENT ---
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on load
  useEffect(() => {
    params.then((resolvedParams) => {
      getProductData(resolvedParams.slug).then((data) => {
        setProduct(data);
        setLoading(false);
      });
    });
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link href="/store" className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition inline-block">
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  // --- STOCK LOGIC ---
  const hasSizes = product.sizes && product.sizes.length > 0;
  const selectedSizeData = hasSizes ? product.sizes.find(s => s.size === selectedSize) : null;
  
  const currentStock = hasSizes 
    ? (selectedSizeData ? selectedSizeData.stock : 0)
    : product.quantity;

  const isOutOfStock = currentStock === 0;

  // --- WHATSAPP LOGIC ---
  let message = `Hi, I'm interested in the ${product.name} (₹${product.price}).`;
  if (hasSizes) {
    if (selectedSize) {
      message += ` I want Size: ${selectedSize}.`;
    } else {
      message += ` (Size not selected yet)`;
    }
  }
  const whatsappUrl = `https://wa.me/919030836231?text=${encodeURIComponent(message)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      {/* Back Link */}
      <div className="max-w-6xl mx-auto mb-6">
        <Link 
          href="/store" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-700 font-medium transition-all hover:-translate-x-1 group"
        >
          <span className="text-xl group-hover:scale-110 transition-transform">←</span>
          Back to Store
        </Link>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          
          {/* LEFT: GALLERY */}
          <div className="p-8 lg:p-12 bg-gray-50">
             <ProductGallery 
                mainImage={product.image} 
                gallery={product.gallery} 
                videoUrl={product.videoUrl} 
             />
          </div>

          {/* RIGHT: DETAILS */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                {product.category || 'Cricket Gear'}
              </span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-4xl font-bold text-green-700">₹{product.price}</span>
              <span className="text-gray-500 text-sm">inc. GST</span>
            </div>

            {/* --- SIZE SELECTOR --- */}
            {hasSizes && (
              <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <span>👕</span> Select Size
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((item) => (
                    <button
                      key={item._key}
                      onClick={() => setSelectedSize(item.size)}
                      disabled={item.stock === 0}
                      className={`px-6 py-3 rounded-xl border-2 font-bold transition-all relative min-w-[70px]
                        ${selectedSize === item.size 
                          ? 'border-green-600 bg-green-50 text-green-700 shadow-md scale-105' 
                          : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow'}
                        ${item.stock === 0 ? 'opacity-40 cursor-not-allowed bg-gray-100 line-through' : ''}
                      `}
                    >
                      {item.size}
                      {item.stock > 0 && item.stock < 5 && (
                         <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow animate-pulse">
                           {item.stock} left
                         </span>
                      )}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p className="text-orange-600 text-sm mt-3 flex items-center gap-2 font-medium">
                    <span>⚠️</span> Please select a size to continue
                  </p>
                )}
              </div>
            )}

            {/* STOCK STATUS INDICATOR */}
            <div className="mb-8">
               {(hasSizes && selectedSize) || !hasSizes ? (
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-md
                    ${currentStock === 0 
                      ? 'bg-red-100 text-red-700 border-2 border-red-300' 
                      : currentStock < 5 
                        ? 'bg-orange-100 text-orange-700 border-2 border-orange-300 animate-pulse' 
                        : 'bg-green-100 text-green-700 border-2 border-green-300'}
                  `}>
                    {currentStock === 0 
                      ? '🔴 Out of Stock' 
                      : currentStock < 5 
                        ? `🟠 Hurry! Only ${currentStock} left in stock` 
                        : '🟢 In Stock'}
                  </div>
               ) : null}
            </div>

            {/* Description */}
            <div className="mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">
                Product Details
              </h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
            
            {/* BUY BUTTON */}
            <div className="space-y-3">
              <a 
                href={(hasSizes && !selectedSize) || isOutOfStock ? '#' : whatsappUrl}
                target={!((hasSizes && !selectedSize) || isOutOfStock) ? "_blank" : undefined}
                rel={!((hasSizes && !selectedSize) || isOutOfStock) ? "noopener noreferrer" : undefined}
                className={`w-full py-5 rounded-xl font-bold text-lg text-center transition-all flex items-center justify-center gap-3 shadow-lg
                  ${(hasSizes && !selectedSize) || isOutOfStock
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 hover:shadow-2xl hover:-translate-y-1 active:scale-95'
                  }`}
                onClick={(e) => {
                   if (hasSizes && !selectedSize) {
                     e.preventDefault();
                     alert("Please select a size first!");
                   } else if (isOutOfStock) {
                     e.preventDefault();
                     alert("Sorry, this product is currently out of stock!");
                   }
                }}
              >
                <span className="text-2xl">💬</span>
                {isOutOfStock ? 'Out of Stock' : 'Buy on WhatsApp'}
              </a>
              
              {!isOutOfStock && (
                <p className="text-center text-xs text-gray-500">
                  Click to message us on WhatsApp • Fast response guaranteed
                </p>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl mb-1">✓</div>
                  <p className="text-xs text-gray-600 font-medium">Authentic Products</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">🚚</div>
                  <p className="text-xs text-gray-600 font-medium">Fast Delivery</p>
                </div>
                <div>
                  <div className="text-2xl mb-1">💯</div>
                  <p className="text-xs text-gray-600 font-medium">Quality Assured</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}