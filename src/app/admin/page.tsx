import { Users, Activity, Droplet, CheckCircle, BarChart3, List, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()

  if (profile?.role !== 'admin') {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center">
        <div className="bg-red-50 text-red-600 p-8 rounded-3xl inline-block mb-4">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="mt-2 text-red-500">You must be an administrator to view this page.</p>
        </div>
      </div>
    )
  }

  const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
  const { count: donorCount } = await supabase.from('donors').select('*', { count: 'exact', head: true });
  const { count: activeRequests } = await supabase.from('requests').select('*', { count: 'exact', head: true }).eq('status', 'Open');

  const { data: recentRequests } = await supabase.from('requests').select('*, profiles(full_name), blood_groups(name)').order('created_at', { ascending: false }).limit(5);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Administrator Console</h1>
        <p className="text-gray-500">System overview, reports, and activity monitoring.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{userCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Registered Donors</p>
            <p className="text-2xl font-bold text-gray-900">{donorCount || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center">
             <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Requests</p>
            <p className="text-2xl font-bold text-gray-900">{activeRequests || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-center text-center">
           <a href="/api/report" download="bbdms-report.csv" target="_blank" rel="noopener noreferrer" className="bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg">
             <BarChart3 className="w-4 h-4"/> Download Full Report
           </a>
        </div>
      </div>

      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><List className="w-5 h-5"/> Recent Blood Requests</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-medium text-gray-500 border-b border-gray-100">
                <th className="pb-4 pr-4">Patient / Hospital</th>
                <th className="pb-4 px-4">Group</th>
                <th className="pb-4 px-4">Urgency</th>
                <th className="pb-4 px-4">Status</th>
                <th className="pb-4 pl-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
               {recentRequests?.map(req => (
                 <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 pr-4">
                      <p className="font-bold text-gray-900">{req.patient_name}</p>
                      <p className="text-sm text-gray-500 break-all">{req.hospital_name}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold text-sm border border-red-100">{req.blood_groups?.name}</span>
                    </td>
                    <td className="py-4 px-4">
                       <span className={`font-semibold text-sm ${req.urgency === 'High' ? 'text-red-600' : req.urgency === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}>{req.urgency}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${req.status === 'Open' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>{req.status}</span>
                    </td>
                    <td className="py-4 pl-4 text-right text-sm text-gray-500">
                      {new Date(req.created_at).toLocaleDateString()}
                    </td>
                 </tr>
               ))}
               {(!recentRequests || recentRequests.length === 0) && (
                 <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500 text-sm">No recent requests found.</td>
                 </tr>
               )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
