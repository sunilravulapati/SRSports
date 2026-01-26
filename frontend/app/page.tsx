import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-green-50 font-sans">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-transparent pb-32 pt-24 lg:pt-32 text-center px-6 z-10">
        
        {/* Abstract Background Blobs with Animation */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-40 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-green-300 to-emerald-200 rounded-full blur-[130px] mix-blend-multiply animate-pulse"></div>
             <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-blue-300 to-cyan-200 rounded-full blur-[130px] mix-blend-multiply animate-pulse" style={{animationDelay: '1s'}}></div>
             <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-[100px] mix-blend-multiply animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-[0.9]">
            ELEVATE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600 animate-pulse">GAME</span>
          </h2>
          
          <p className="text-xl text-gray-600 mb-10 font-medium leading-relaxed max-w-2xl mx-auto">
            Premium English Willow bats, professional coaching, and broadcast-quality streaming for champions.
          </p>
          
          {/* Social Buttons with Real Logos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
             <a 
               href="https://www.instagram.com/somasani_sports/" 
               target="_blank"
               rel="noopener noreferrer"
               className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 hover:scale-105 transition-all duration-300 min-w-[220px] justify-center relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
               </svg>
               <span className="relative z-10">Follow on Instagram</span>
             </a>
             
             <a 
               href="https://www.youtube.com/@somasaniraju0521" 
               target="_blank"
               rel="noopener noreferrer"
               className="group flex items-center gap-3 px-8 py-4 bg-red-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-2xl hover:shadow-red-500/50 hover:bg-red-700 hover:scale-105 transition-all duration-300 min-w-[220px] justify-center relative overflow-hidden"
             >
               <div className="absolute inset-0 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
               <svg className="w-6 h-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
               </svg>
               <span className="relative z-10">Watch on YouTube</span>
             </a>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-green-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Deliver</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From premium equipment to expert coaching and professional streaming services, we provide everything you need to excel in cricket.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Quality Assurance */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-green-400 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Handpicked English Willow bats and top-tier cricket equipment, tested and approved by professionals.
            </p>
          </div>

          {/* Expert Guidance */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Expert Coaching</h3>
            <p className="text-gray-600 leading-relaxed">
              Professional training programs designed to elevate your skills, from beginner to advanced levels.
            </p>
          </div>

          {/* Professional Service */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Live Streaming</h3>
            <p className="text-gray-600 leading-relaxed">
              Broadcast-quality streaming services to capture and share your matches with professional coverage.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-5xl font-black bg-gradient-to-br from-green-600 to-emerald-500 bg-clip-text text-transparent mb-2">500+</div>
            <div className="text-gray-600 font-semibold text-sm">Premium Products</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-5xl font-black bg-gradient-to-br from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">1k+</div>
            <div className="text-gray-600 font-semibold text-sm">Happy Players</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-5xl font-black bg-gradient-to-br from-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">50+</div>
            <div className="text-gray-600 font-semibold text-sm">Tournaments</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="text-5xl font-black bg-gradient-to-br from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">10+</div>
            <div className="text-gray-600 font-semibold text-sm">Years Experience</div>
          </div>
        </div>
        </div>
      </section>

      {/* Services Section - Service Cards */}
      <section className="bg-gradient-to-br from-slate-50 via-white to-green-50 pb-24">
        <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Services</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our range of specialized services tailored for cricket enthusiasts and professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* STORE CARD */}
          <Link href="/store" className="group">
            <div className="relative h-[28rem] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500 border border-white/50 backdrop-blur-sm">
              <Image src="/sr1.webp" alt="Store" fill className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-green-500/20 backdrop-blur-md flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                <span className="text-white text-lg">🏏</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-green-400 font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                       <span className="w-8 h-0.5 bg-green-400"></span>
                       Shop Gear
                     </p>
                     <h3 className="text-4xl font-black text-white leading-tight mb-2">Cricket<br/>Store</h3>
                     <p className="text-gray-300 text-sm">Premium equipment & gear</p>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-green-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                     <span className="text-white text-2xl font-bold">→</span>
                   </div>
                 </div>
              </div>
            </div>
          </Link>

          {/* COACHING CARD */}
          <Link href="/coaching" className="group">
            <div className="relative h-[28rem] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 border border-white/50 backdrop-blur-sm">
              <Image src="/coach.jpeg" alt="Coaching" fill className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-blue-500/20 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                <span className="text-white text-lg">⚡</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-blue-400 font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                       <span className="w-8 h-0.5 bg-blue-400"></span>
                       Improve Skills
                     </p>
                     <h3 className="text-4xl font-black text-white leading-tight mb-2">Pro<br/>Coaching</h3>
                     <p className="text-gray-300 text-sm">Expert training & guidance</p>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-blue-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                     <span className="text-white text-2xl font-bold">→</span>
                   </div>
                 </div>
              </div>
            </div>
          </Link>

          {/* STREAMING CARD */}
          <Link href="/streaming" className="group">
            <div className="relative h-[28rem] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 border border-white/50 backdrop-blur-sm">
              <Image src="/sr2.jpeg" alt="Streaming" fill className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-md flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 transition-all duration-300">
                <span className="text-white text-lg">📡</span>
              </div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-purple-400 font-bold text-xs tracking-widest uppercase mb-3 flex items-center gap-2">
                       <span className="w-8 h-0.5 bg-purple-400"></span>
                       Broadcast
                     </p>
                     <h3 className="text-4xl font-black text-white leading-tight mb-2">Live<br/>Streaming</h3>
                     <p className="text-gray-300 text-sm">Professional coverage</p>
                   </div>
                   <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-purple-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                     <span className="text-white text-2xl font-bold">→</span>
                   </div>
                 </div>
              </div>
            </div>
          </Link>
        </div>
        </div>
      </section>

    </div>
  );
}