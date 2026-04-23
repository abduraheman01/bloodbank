import { ArrowRight, ShieldCheck, Activity, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 rounded-3xl bg-gradient-to-br from-red-50 via-white to-red-50 mt-4 overflow-hidden border border-red-100 shadow-xl shadow-red-100/50">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <Activity className="w-96 h-96 text-red-500" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 font-semibold text-sm tracking-wide">
            Save Lives Today
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            The Modern <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Blood Bank</span> Ecosystem
          </h1>
          <p className="text-xl text-gray-600">
            A real-time, sophisticated ecosystem designed to connect blood donors with critical recipients instantly. Every drop counts.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-red-500/40 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
              Become a Donor <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/requests" className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 rounded-full font-bold text-lg transition-all hover:bg-gray-50 flex items-center justify-center">
              View Urgent Requests
            </Link>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6">
            <Activity className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Real-Time Sync</h3>
          <p className="text-gray-600 leading-relaxed">
            By leveraging Supabase subscriptions, our 'Available Donors' list and 'Urgent Requests' update instantly without page refreshes.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6">
            <ShieldCheck className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Transparent</h3>
          <p className="text-gray-600 leading-relaxed">
            Role-Based Access Control and Row Level Security protect sensitive health data, ensuring an unassailable audit trail.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-6">
            <Users className="w-7 h-7 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Automated Lifecycle</h3>
          <p className="text-gray-600 leading-relaxed">
            Donor eligibility is automatically managed. Wait the mandatory 90 days? Our system seamlessly handles transitions.
          </p>
        </div>
      </section>

      {/* Stats / Mock Viva Explanation block */}
      <section className="bg-gray-900 text-white p-12 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-700">
          <div className="p-4">
            <div className="text-4xl font-extrabold text-red-400 mb-2">10k+</div>
            <div className="text-gray-400">Registered Donors</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-extrabold text-red-400 mb-2">24/7</div>
            <div className="text-gray-400">Real-time Matching</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-extrabold text-red-400 mb-2">Next.js</div>
            <div className="text-gray-400">Serverless Architecture</div>
          </div>
          <div className="p-4">
            <div className="text-4xl font-extrabold text-red-400 mb-2">90 Days</div>
            <div className="text-gray-400">Eligibility Cycle</div>
          </div>
        </div>
      </section>
    </div>
  );
}
