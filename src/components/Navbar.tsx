import Link from 'next/link'
import { Droplet, Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-red-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-500 p-2 rounded-lg group-hover:bg-red-600 transition-colors">
            <Droplet className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
            BBDMS
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/requests" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Live Requests
          </Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Dashboard
          </Link>
          <div className="w-px h-6 bg-gray-200"></div>
          <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
            Log in
          </Link>
          <Link href="/register" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30">
            Donate Now
          </Link>
        </div>

        <button className="md:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
