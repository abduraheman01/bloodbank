import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User, MapPin, Phone, AlertTriangle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { updateProfile } from '@/app/actions/profile'

export default async function ProfileEditPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams;
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: donor } = await supabase.from('donors').select('*').eq('id', user.id).maybeSingle()

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <div className="mb-6">
        <Link href="/dashboard" className="text-red-600 hover:text-red-700 flex items-center gap-2 font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 shadow-red-100/50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Profile</h1>
          <p className="text-gray-500">Update your personal details and location.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-start gap-3">
             <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
             <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form action={updateProfile} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                name="full_name"
                defaultValue={profile?.full_name || ''}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
              />
            </div>
          </div>

          {donor && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">City / Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text" 
                    name="city"
                    defaultValue={donor.city || ''}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Contact Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="tel" 
                    name="phone"
                    defaultValue={donor.phone || ''}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  )
}
