export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center font-semibold text-sm">
            V
          </div>
          <span className="text-lg font-semibold tracking-tight">
            VoiceAI
          </span>
        </div>

        {/* Center: Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Platform", "Analytics", "Reliability", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-normal text-gray-300 hover:text-white transition">
            Sign in
          </button>

          <button className="text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition">
            Get started
          </button>
        </div>
      </div>
    </nav>
  );
}
