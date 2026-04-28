import { BadgeCheck, Calendar, Activity, Edit2, PlusCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { logDonation } from '../actions/donations';
import { markNotificationsAsRead } from '../actions/notifications';

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: donorFields } = await supabase.from('donors').select('*, blood_groups(name)').eq('id', user.id).maybeSingle()
  const { data: donationsHistory } = await supabase.from('donations').select('*').eq('donor_id', user.id).order('donation_date', { ascending: false })

  const { data: notifications } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5)
  const unreadCount = notifications?.filter((n: any) => !n.is_read).length || 0;

  const fullName = profile?.full_name || 'Anonymous User'
  const city = donorFields?.city || 'Unknown Location'
  const bloodGroup = donorFields?.blood_groups?.name || 'N/A'
  
  let isEligible = true
  if (donorFields?.last_donation_date) {
    const lastDonation = new Date(donorFields.last_donation_date)
    const ninetyDaysAgo = new Date()
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)
    if (lastDonation > ninetyDaysAgo) {
      isEligible = false
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
        {profile?.role === 'donor' ? 'Donor Dashboard' : 'User Dashboard'}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-gradient-to-br from-red-600 to-red-500 rounded-3xl p-8 text-white shadow-xl shadow-red-500/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="relative z-10 flex flex-col h-full gap-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 font-medium mb-1">Welcome back,</p>
                <h2 className="text-3xl font-bold">{fullName}</h2>
              </div>
              {profile?.role === 'donor' && (
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                  <span className="text-2xl font-black tracking-tighter">{bloodGroup}</span>
                </div>
              )}
            </div>
            {profile?.role === 'donor' && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-auto">
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
                  <MapPin className="w-4 h-4" /> {city}
                </div>
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${isEligible ? 'bg-green-400 text-green-900' : 'bg-red-400 text-white'}`}>
                  {isEligible ? <BadgeCheck className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                  {isEligible ? 'Ready to Donate' : 'In 90-Day Cooldown'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col h-full max-h-[250px] overflow-hidden" id="notifications">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Activity className="w-5 h-5 text-red-600" />
                {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
              </div>
              <h3 className="font-bold text-gray-900">Notifications</h3>
            </div>
            {unreadCount > 0 && (
              <form action={markNotificationsAsRead}>
                <button type="submit" className="text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 px-2 py-1 rounded-md transition-colors">
                  Mark as read
                </button>
              </form>
            )}
          </div>
          
          <div className="overflow-y-auto pr-2 space-y-3 flex-1">
            {notifications && notifications.length > 0 ? (
              notifications.map((notif: any) => (
                <div key={notif.notification_id} className={`p-3 rounded-xl text-sm ${notif.is_read ? 'bg-gray-50 text-gray-600' : 'bg-red-50 text-red-900 font-medium border border-red-100'}`}>
                  {notif.message}
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(notif.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500 text-sm h-full flex items-center justify-center">
                You're all caught up!
              </div>
            )}
          </div>
        </div>
      </div>

      {profile?.role === 'donor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Log Donation Form */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex items-center gap-2 mb-6 text-red-600">
              <PlusCircle className="w-6 h-6" />
              <h3 className="text-xl font-bold text-gray-900">Log New Donation</h3>
            </div>
            <form action={logDonation} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Donation</label>
                <input 
                  type="date" 
                  name="donation_date" 
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Hospital / Camp)</label>
                <input 
                  type="text" 
                  name="remarks" 
                  placeholder="e.g., Red Cross Blood Camp"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-xl transition-all active:scale-[0.98]"
              >
                Save Donation Record
              </button>
            </form>
          </div>

          {/* History */}
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Donation History</h3>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {donationsHistory && donationsHistory.length > 0 ? (
                donationsHistory.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 border border-gray-100">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{entry.remarks || 'Standard Donation'}</div>
                        <div className="text-sm text-gray-500">
                          {new Date(entry.donation_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full whitespace-nowrap">
                      Completed
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No donations recorded yet. Log your first donation!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Temporary inline import mock for MapPin
const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
