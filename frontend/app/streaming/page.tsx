export default function StreamingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <span className="inline-block py-1 px-4 rounded-full bg-white/20 text-white text-xs font-bold tracking-widest uppercase mb-6 border border-white/30">
            Professional Broadcasting
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Live Cricket <span className="text-yellow-300">Streaming</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto font-medium">
            Broadcast your tournament with professional quality. Multi-camera setup, live scorecards, and HD streaming that rivals TV coverage.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 text-center">
            Broadcast <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Features</span>
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Professional streaming equipment and expertise to make your tournament memorable
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Multi-Camera */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📹</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Multi-Camera Setup</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional 3-camera coverage capturing every angle - bowler's end, batsman's view, and wide field coverage for complete match visibility.
              </p>
            </div>

            {/* Live Scoreboard */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Live Scorecards</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time score updates with player statistics, run rates, partnerships, and fall of wickets - just like professional broadcasts.
              </p>
            </div>

            {/* HD Quality */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎥</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">HD Streaming</h3>
              <p className="text-gray-600 leading-relaxed">
                Crystal clear 1080p streaming with smooth playback. Your audience enjoys broadcast-quality viewing experience on any device.
              </p>
            </div>

            {/* Instant Replays */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">⏪</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Instant Replays</h3>
              <p className="text-gray-600 leading-relaxed">
                Slow-motion replays of key moments - wickets, boundaries, and spectacular catches. Never miss the action.
              </p>
            </div>

            {/* Commentary */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🎙️</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Live Commentary</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional commentary team providing expert analysis and match insights throughout your tournament.
              </p>
            </div>

            {/* Social Integration */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-gray-100 hover:border-purple-400 hover:shadow-2xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="font-black text-2xl text-gray-900 mb-3">Social Media Ready</h3>
              <p className="text-gray-600 leading-relaxed">
                Stream directly to YouTube, Facebook Live, or Instagram. Reach thousands of fans and family members instantly.
              </p>
            </div>
          </div>
        </div>

        {/* Streaming Packages */}
        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 mb-20 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Streaming <span className="text-yellow-300">Packages</span>
            </h2>
            <p className="text-purple-100 text-lg">Choose the perfect package for your tournament</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Basic Package */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="mb-6">
                <h3 className="font-black text-2xl mb-2">Basic</h3>
                <p className="text-purple-100 text-sm">Perfect for local matches</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Single camera setup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Basic scorecard overlay</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>HD 720p streaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Up to 4 hours coverage</span>
                </li>
              </ul>
              <p className="text-3xl font-black">₹15,000</p>
              <p className="text-purple-100 text-sm">per match day</p>
            </div>

            {/* Professional Package */}
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-yellow-300 hover:bg-white/30 transition-all relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-yellow-300 text-purple-900 px-4 py-1 rounded-full text-xs font-black uppercase">Popular</span>
              </div>
              <div className="mb-6 mt-2">
                <h3 className="font-black text-2xl mb-2">Professional</h3>
                <p className="text-purple-100 text-sm">Tournament standard</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Multi-camera (3 cameras)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Advanced graphics & stats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Full HD 1080p streaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Instant replays</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Up to 8 hours coverage</span>
                </li>
              </ul>
              <p className="text-3xl font-black">₹35,000</p>
              <p className="text-purple-100 text-sm">per match day</p>
            </div>

            {/* Premium Package */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20 hover:bg-white/20 transition-all">
              <div className="mb-6">
                <h3 className="font-black text-2xl mb-2">Premium</h3>
                <p className="text-purple-100 text-sm">Broadcast quality</p>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Multi-camera (5+ cameras)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Professional commentary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>4K streaming option</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Full production team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✓</span>
                  <span>Unlimited coverage hours</span>
                </li>
              </ul>
              <p className="text-3xl font-black">₹60,000</p>
              <p className="text-purple-100 text-sm">per match day</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-purple-100 text-sm">
              <span className="font-bold">Note:</span> Multi-day tournament packages available with discounted rates
            </p>
          </div>
        </div>

        {/* Platform Support */}
        <div className="bg-white rounded-3xl p-12 shadow-2xl border-2 border-gray-100 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Stream <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Anywhere</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We support streaming to all major platforms. Reach your audience wherever they are.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 text-center border-2 border-red-200">
              <div className="text-4xl mb-3">📺</div>
              <h4 className="font-black text-gray-900">YouTube</h4>
              <p className="text-xs text-gray-600 mt-1">Live streaming</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center border-2 border-blue-200">
              <div className="text-4xl mb-3">📘</div>
              <h4 className="font-black text-gray-900">Facebook</h4>
              <p className="text-xs text-gray-600 mt-1">Live broadcast</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center border-2 border-purple-200">
              <div className="text-4xl mb-3">📸</div>
              <h4 className="font-black text-gray-900">Instagram</h4>
              <p className="text-xs text-gray-600 mt-1">Live video</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center border-2 border-green-200">
              <div className="text-4xl mb-3">🌐</div>
              <h4 className="font-black text-gray-900">Custom</h4>
              <p className="text-xs text-gray-600 mt-1">Your platform</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
                <span className="text-6xl">🏆</span>
              </div>
              <p className="text-gray-600 font-bold text-xl">50+ Tournaments Covered</p>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-6">
              Why Choose SR Sports?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-black">✓</span>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Experienced Team</h4>
                  <p className="text-gray-600">Professional camera operators and production crew with years of live sports experience</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-black">✓</span>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Latest Equipment</h4>
                  <p className="text-gray-600">State-of-the-art cameras, encoders, and streaming technology for flawless broadcasts</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-black">✓</span>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Reliable Service</h4>
                  <p className="text-gray-600">Backup systems and contingency plans ensure your stream never drops</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600 font-black">✓</span>
                </div>
                <div>
                  <h4 className="font-black text-gray-900 mb-1">Full Support</h4>
                  <p className="text-gray-600">From setup to wrap-up, we handle everything so you can focus on the game</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Ready to Go Live?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Book our streaming services and give your tournament the professional broadcast it deserves
          </p>
          <a 
            href="https://wa.me/919550145568" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-purple-600 px-10 py-5 rounded-2xl font-black text-lg hover:bg-purple-50 transition-all shadow-2xl hover:scale-105"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Book Tournament Streaming
          </a>
          <p className="text-purple-100 text-sm mt-4">
            Free consultation • Custom packages • 24/7 support
          </p>
        </div>
      </div>
    </div>
  );
}