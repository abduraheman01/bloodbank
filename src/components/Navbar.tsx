import Link from 'next/link'
import { Droplet, Menu, Bell } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { signout } from '@/app/actions/auth'

export default async function Navbar() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let unreadCount = 0
  if (user) {
    const { count } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false)
    unreadCount = count || 0
  }
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
          <Link href="/search" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Find Donors
          </Link>
          <Link href="/requests" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
            Live Requests
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
                Dashboard
              </Link>
              <Link href="/dashboard" className="relative cursor-pointer">
                <Bell className="w-6 h-6 text-gray-600 hover:text-red-500 transition-colors" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md">
                    {unreadCount}
                  </span>
                )}
              </Link>
              <form action={signout}>
                <button type="submit" className="text-gray-600 hover:text-red-500 transition-colors font-medium">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Log in
              </Link>
              <Link href="/register" className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/30">
                Donate Now
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2 text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </nav>
  )
}
