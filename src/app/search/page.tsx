import { createClient } from '@/lib/supabase/server'
import { Search, MapPin, Droplet, User as UserIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SearchDonorsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login?error=Please login to search donors')

  const params = await searchParams
  const queryCity = typeof params.city === 'string' ? params.city : ''
  const queryGroup = typeof params.blood_group === 'string' ? params.blood_group : ''

  const { data: bloodGroups } = await supabase.from('blood_groups').select('*').order('id')

  let donors: any[] = []
  if (queryCity || queryGroup) {
    let query = supabase
      .from('donors')
      .select(`
        id,
        city,
        is_available,
        profiles ( full_name ),
        blood_groups ( name )
      `)
      .eq('is_available', true)

    if (queryCity) {
      query = query.ilike('city', `%${queryCity}%`)
    }

    if (queryGroup) {

      const targetGroup = bloodGroups?.find(g => g.name === queryGroup)
      if (targetGroup) {
        query = query.eq('blood_group_id', targetGroup.id)
      }
    }

    const { data } = await query
    if (data) donors = data
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Find a Blood Donor</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search our database of registered donors by city and blood group. Contact them securely during emergencies.
        </p>
      </div>

      {/* Search Filter Bar */}
      <div className="bg-white p-6 rounded-3xl shadow-xl shadow-red-500/5 border border-red-100 max-w-3xl mx-auto mb-10">
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" method="GET" action="/search">
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="city"
              placeholder="City (e.g., Delhi)"
              defaultValue={queryCity}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 transition-colors"
            />
          </div>

          <div className="relative">
            <Droplet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              name="blood_group"
              defaultValue={queryGroup}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-red-500 transition-colors appearance-none"
            >
              <option value="">Any Blood Group</option>
              {bloodGroups?.map(bg => (
                <option key={bg.id} value={bg.name}>{bg.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" /> Search
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {(queryCity || queryGroup) ? (
          <div>
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm">{donors.length}</span>
              Donors Found
            </h2>

            {donors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>

                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-500" />
                      </div>
                      <div className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-lg">
                        {donor.blood_groups?.name}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 mb-1">{donor.profiles?.full_name || 'Anonymous Donor'}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-6">
                      <MapPin className="w-4 h-4" /> {donor.city}
                    </div>

                    <Link href="/requests/new" className="w-full block text-center py-2.5 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-700 font-medium rounded-xl transition-colors border border-gray-200 hover:border-red-200">
                      Request Blood
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">No matching donors found</h3>
                <p className="text-gray-500">Try adjusting your search filters or broadening your city.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">Enter a city or select a blood group to find available donors.</p>
          </div>
        )}
      </div>
    </div>
  )
}
