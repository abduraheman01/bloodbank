import { AlertCircle, MapPin, Clock, Droplet, Plus, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { closeRequest } from '../actions/closeRequest';
import AcceptRequestButton from '@/components/AcceptRequestButton';

export default async function RequestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: dbRequests } = await supabase
    .from('requests')
    .select('*, blood_groups(name)')
    .order('created_at', { ascending: false });

  const displayedRequests = dbRequests?.map(r => ({
    id: r.id,
    requester_id: r.requester_id,
    bloodGroup: r.blood_groups?.name || '?',
    location: `${r.hospital_name}, ${r.location}`,
    contact_number: r.contact_number,
    urgency: r.urgency,
    time: new Date(r.created_at).toLocaleDateString(),
    status: r.status,
  })) || [];

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Live Blood Requests</h1>
          <p className="text-gray-500">Real-time synchronized urgent blood requirements.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-full border border-red-100 font-medium text-sm">
             <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Live Updates
          </div>
          <Link href="/requests/new" className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-red-500/30 transition-transform hover:scale-105 active:scale-95">
             <Plus className="w-5 h-5"/> Post Request
          </Link>
        </div>
      </div>

      <div className="grid gap-6">
        {displayedRequests.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
            No active emergency requests found.
          </div>
        )}
        {displayedRequests.map((req) => (
          <div key={req.id} className={`p-6 rounded-2xl border ${req.status === 'Open' ? 'bg-white border-red-100 shadow-sm shadow-red-50' : 'bg-gray-50 border-gray-200 opacity-75'} transition-all hover:shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6`}>
            
            <div className="flex items-center gap-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold bg-gradient-to-br ${req.status === 'Open' ? 'from-red-500 to-red-600 text-white shadow-inner' : 'from-gray-300 to-gray-400 text-gray-100'}`}>
                {req.bloodGroup}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-900">{req.location}</h3>
                  {req.urgency === 'High' && req.status === 'Open' && (
                    <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">
                      <AlertCircle className="w-3 h-3" /> Critical
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {req.time}</span>
                </div>
              </div>
            </div>

            <div className="w-full sm:w-auto flex flex-col gap-2">
              {req.status === 'Open' ? (
                <AcceptRequestButton contactNumber={req.contact_number} />
              ) : (
                <button disabled className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-gray-200 text-gray-500 cursor-not-allowed">
                  <Droplet className="w-4 h-4" />
                  Fulfilled
                </button>
              )}
              
              {user && user.id === req.requester_id && req.status === 'Open' && (
                <form action={async () => {
                  'use server';
                  await closeRequest(req.id);
                }}>
                  <button type="submit" className="w-full sm:w-auto px-6 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 border border-green-500 text-green-600 hover:bg-green-50">
                    <CheckCircle className="w-4 h-4" />
                    Mark Fulfilled
                  </button>
                </form>
              )}
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
