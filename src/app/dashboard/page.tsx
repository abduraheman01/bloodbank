import { BadgeCheck, Calendar, Activity, Edit2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const { data: donorFields } = await supabase.from('donors').select('*, blood_groups(name)').eq('id', user.id).maybeSingle()

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
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">Donor Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-red-600 to-red-500 rounded-3xl p-8 text-white shadow-xl shadow-red-500/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
          <div className="relative z-10 flex flex-col h-full justify-between gap-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-red-100 font-medium mb-1">Welcome back,</p>
                <h2 className="text-3xl font-bold">{fullName}</h2>
              </div>
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <span className="text-2xl font-black tracking-tighter">{bloodGroup}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 w-max px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
              <MapPin className="w-4 h-4" /> {city}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center gap-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center border-4 ${isEligible ? 'border-green-100 bg-green-50 text-green-600' : 'border-red-100 bg-red-50 text-red-600'}`}>
            {isEligible ? <BadgeCheck className="w-10 h-10" /> : <Activity className="w-10 h-10" />}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Eligibility Status</h3>
            <p className={`font-medium ${isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {isEligible ? 'Ready to Donate' : 'In 90-Day Cooldown'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Donation History (Audit Trail)</h3>
          <button className="text-sm font-semibold text-red-600 flex items-center gap-1 hover:text-red-700">
            <Edit2 className="w-4 h-4" /> Update Medical Profile
          </button>
        </div>

        <div className="space-y-4">
          {[
            { date: '12 Jan 2024', location: 'AIIMS Camp', status: 'Successful Match' },
            { date: '05 Sep 2023', location: 'Red Cross Society', status: 'Successful Match' },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-50 bg-gray-50">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-gray-400 border border-gray-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{entry.location}</div>
                  <div className="text-sm text-gray-500">{entry.date}</div>
                </div>
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {entry.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Temporary inline import mock for MapPin
const MapPin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
);
