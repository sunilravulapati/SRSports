// app/components/ProductGallery.tsx
"use client";
import { useState } from "react";
import { urlFor } from "../sanity/client";
import Image from "next/image";

interface Props {
  mainImage: any;
  gallery: any[];
  videoUrl: string | null;
}

export default function ProductGallery({ mainImage, gallery, videoUrl }: Props) {
  const [activeMedia, setActiveMedia] = useState<"image" | "video">("image");
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="flex flex-col gap-4">
      {/* MAIN VIEW AREA */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden relative h-[400px] md:h-[500px] flex items-center justify-center border-2 border-gray-200 shadow-lg">
        
        {activeMedia === "image" && currentImage && (
          <>
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
              </div>
            )}
            <Image
              src={urlFor(currentImage).width(800).url()}
              alt="Product"
              fill
              className={`object-contain p-4 transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoadingComplete={() => setImageLoading(false)}
              priority
            />
          </>
        )}

        {activeMedia === "video" && videoUrl && (
          <video 
            controls 
            className="w-full h-full object-contain bg-black rounded-xl"
            autoPlay
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Media Type Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-md">
          {activeMedia === "image" ? "📷 Photo" : "🎥 Video"}
        </div>
      </div>

      {/* THUMBNAILS ROW */}
      <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        
        {/* 1. Main Image Thumbnail */}
        {mainImage && (
          <div 
            onClick={() => { 
              setActiveMedia("image"); 
              setCurrentImage(mainImage);
              setImageLoading(true);
            }}
            className={`w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 cursor-pointer border-3 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              currentImage === mainImage && activeMedia === "image" 
                ? 'border-green-600 shadow-lg ring-2 ring-green-300' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Image 
              src={urlFor(mainImage).width(200).url()} 
              alt="Main" 
              fill 
              className="object-cover" 
            />
            {currentImage === mainImage && activeMedia === "image" && (
              <div className="absolute inset-0 bg-green-600/10"></div>
            )}
          </div>
        )}

        {/* 2. Gallery Thumbnails */}
        {gallery?.map((img: any, i: number) => (
          <div 
            key={i}
            onClick={() => { 
              setActiveMedia("image"); 
              setCurrentImage(img);
              setImageLoading(true);
            }}
            className={`w-20 h-20 md:w-24 md:h-24 relative flex-shrink-0 cursor-pointer border-3 rounded-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              currentImage === img && activeMedia === "image"
                ? 'border-green-600 shadow-lg ring-2 ring-green-300' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <Image 
              src={urlFor(img).width(200).url()} 
              alt={`Gallery ${i + 1}`} 
              fill 
              className="object-cover" 
            />
            {currentImage === img && activeMedia === "image" && (
              <div className="absolute inset-0 bg-green-600/10"></div>
            )}
          </div>
        ))}

        {/* 3. Video Thumbnail (If video exists) */}
        {videoUrl && (
          <div 
            onClick={() => setActiveMedia("video")}
            className={`w-20 h-20 md:w-24 md:h-24 flex-shrink-0 cursor-pointer border-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center text-white transition-all duration-200 hover:scale-105 hover:shadow-lg ${
              activeMedia === "video" 
                ? 'border-green-600 shadow-lg ring-2 ring-green-300' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="text-2xl mb-1">▶️</div>
            <div className="text-[10px] font-bold">PLAY</div>
            {activeMedia === "video" && (
              <div className="absolute inset-0 bg-green-600/10 rounded-xl"></div>
            )}
          </div>
        )}
      </div>

      {/* Image Counter */}
      {gallery && gallery.length > 0 && (
        <div className="text-center text-sm text-gray-500">
          {activeMedia === "image" ? (
            <span>
              Photo {gallery.findIndex(img => img === currentImage) + (currentImage === mainImage ? 1 : 2)} of {gallery.length + 1}
            </span>
          ) : (
            <span>Playing video</span>
          )}
        </div>
      )}
    </div>
  );
}