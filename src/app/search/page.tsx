import { Search, MapPin, Activity, Droplet } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';

export default async function SearchDonorsPage({
  searchParams,
}: {
  searchParams: { blood_group_id?: string; city?: string };
}) {
  const supabase = await createClient();
  const searchPromise = Promise.resolve(searchParams);
  const params = await searchPromise;
  
  let donors = [] as any[];

  if (params.blood_group_id || params.city) {
    let query = supabase
      .from('donors')
      .select(`
        id,
        city,
        phone,
        last_donation_date,
        is_available,
        profiles ( full_name, email ),
        blood_groups!inner( id, name )
      `)
      .eq('is_available', true);

    if (params.blood_group_id) {
      query = query.eq('blood_group_id', params.blood_group_id);
    }
    if (params.city) {
      query = query.ilike('city', `%${params.city}%`);
    }

    const { data, error } = await query;
    if (!error && data) {
      donors = data;
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Find a Donor</h1>
        <p className="text-gray-500">Search for available blood donors matching your exact needs in real-time.</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
        <form className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select 
              name="blood_group_id"
              defaultValue={params.blood_group_id || ""}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all appearance-none"
            >
              <option value="">Any Blood Group</option>
              <option value="1">A+</option>
              <option value="2">A-</option>
              <option value="3">B+</option>
              <option value="4">B-</option>
              <option value="5">O+</option>
              <option value="6">O-</option>
              <option value="7">AB+</option>
              <option value="8">AB-</option>
            </select>
          </div>

          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              name="city"
              defaultValue={params.city || ""}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
              placeholder="e.g. New Delhi"
            />
          </div>

          <button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-red-500/30 transition-all active:scale-95 flex items-center justify-center gap-2">
            <Search className="w-5 h-5" /> Search
          </button>
        </form>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {(params.blood_group_id || params.city) && (
           <h2 className="text-lg font-semibold text-gray-700">Found {donors.length} matching donor(s)</h2>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {donors.map((donor) => (
            <div key={donor.id} className="bg-white p-6 rounded-2xl border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
               <div className="w-14 h-14 rounded-2xl bg-red-50 flex flex-col items-center justify-center text-red-600 border border-red-100 shrink-0">
                 <span className="font-bold text-lg">{donor.blood_groups?.name}</span>
               </div>
               <div className="flex-1 min-w-0">
                 <h3 className="font-bold text-gray-900 truncate">{donor.profiles?.full_name}</h3>
                 <div className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                   <MapPin className="w-3 h-3" /> {donor.city}
                 </div>
                 <div className="mt-3 flex gap-2">
                    <a href={`tel:${donor.phone}`} className="flex-1 bg-gray-900 hover:bg-gray-800 text-white text-center py-2 rounded-lg text-sm font-semibold transition-colors">
                      Contact
                    </a>
                 </div>
               </div>
            </div>
          ))}
          {donors.length === 0 && (params.blood_group_id || params.city) && (
            <div className="col-span-1 md:col-span-2 text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
              No available donors found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
