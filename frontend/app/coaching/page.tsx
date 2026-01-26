export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/30">
            Professional Training
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Elite Cricket <span className="text-yellow-300">Coaching</span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto font-medium">
            Transform your game with expert guidance from certified coaches. Master technique, build strength, and achieve your cricket goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Training Programs */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">Programs</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Specialized training modules designed for players of all skill levels
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Batting */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏏</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Batting Mastery</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Perfect your stance, timing, and shot selection. Learn advanced techniques for power hitting and placement.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Footwork & Balance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Shot Selection
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Power Training
                </li>
              </ul>
            </div>

            {/* Bowling */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Bowling Excellence</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Develop pace, accuracy, and variation. Master both fast bowling and spin bowling techniques.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Pace & Accuracy
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Spin Variations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                  Action Analysis
                </li>
              </ul>
            </div>

            {/* Fielding & Fitness */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Fielding & Fitness</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Enhance agility, reflexes, and overall fitness. Become a complete player with sharp fielding skills.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Catching Practice
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Agility Drills
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Strength Training
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Session Timings */}
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-12 mb-20 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Session <span className="text-yellow-300">Timings</span>
            </h2>
            <p className="text-blue-100 text-lg">Choose the slot that fits your schedule</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Morning Session */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌅</span>
                </div>
                <div>
                  <h3 className="font-black text-2xl">Morning Batch</h3>
                  <p className="text-blue-100 text-sm">Start your day strong</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-4xl font-black mb-2">6:00 AM - 8:00 AM</p>
                <p className="text-blue-100">Monday to Saturday</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Perfect weather conditions
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Best for serious training
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Small batch sizes (8-10 players)
                </li>
              </ul>
            </div>

            {/* Evening Session */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-orange-400 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌆</span>
                </div>
                <div>
                  <h3 className="font-black text-2xl">Evening Batch</h3>
                  <p className="text-blue-100 text-sm">After school/work</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 mb-4">
                <p className="text-4xl font-black mb-2">4:00 PM - 6:00 PM</p>
                <p className="text-blue-100">Monday to Saturday</p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Ideal for students & professionals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Focused skill development
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-yellow-300">✓</span>
                  Small batch sizes (8-10 players)
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-100 text-sm">
              <span className="font-bold">Note:</span> Sunday special sessions available for tournaments and match practice
            </p>
          </div>
        </div>

        {/* Video Analysis Feature */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-gray-100 mb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">📹</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Video Analysis
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Get detailed insights into your technique with professional video analysis. Identify areas for improvement and track your progress over time.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Slow Motion Review</h4>
                    <p className="text-sm text-gray-600">Frame-by-frame analysis of your technique</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Side-by-Side Comparison</h4>
                    <p className="text-sm text-gray-600">Compare with professional players</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Progress Tracking</h4>
                    <p className="text-sm text-gray-600">Monitor improvements over sessions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-5xl">🎥</span>
                </div>
                <p className="text-gray-600 font-semibold">Professional Analysis</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our coaching program today and start your journey to cricket excellence
          </p>
          <a 
            href="https://wa.me/919550145568" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-2xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book Your Session on WhatsApp
          </a>
          <p className="text-blue-100 text-sm mt-4">
            Quick response • Free consultation • Flexible timings
          </p>
        </div>
      </div>
    </div>
  );
}