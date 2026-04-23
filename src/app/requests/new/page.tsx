import { Activity, AlertCircle, Phone, MapPin, Building, User, ArrowRight } from 'lucide-react';
import { createRequest } from '@/app/actions/requests';

export default function CreateRequestPage() {
  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 shadow-red-100/50">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-500 p-3 rounded-xl text-white">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Emergency Blood Request</h1>
            <p className="text-gray-500 text-sm">Post a requirement to notify nearby donors instantly</p>
          </div>
        </div>

        <form className="space-y-6" action={createRequest}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Patient Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="patient_name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  placeholder="Patient Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Required Blood Group</label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select 
                  name="blood_group_id"
                  required
                  defaultValue=""
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all appearance-none"
                >
                  <option value="" disabled>Select Group</option>
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
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hospital Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="hospital_name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  placeholder="Apollo Hospital"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">City / Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="text" 
                  name="location"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                  placeholder="New Delhi"
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
               <label className="text-sm font-medium text-gray-700">Urgency Level</label>
               <div className="flex gap-4">
                  <label className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full border border-red-100 cursor-pointer">
                    <input type="radio" name="urgency" value="High" defaultChecked className="text-red-600 focus:ring-red-500" />
                    <span className="text-red-700 font-semibold text-sm">High</span>
                  </label>
                  <label className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100 cursor-pointer">
                    <input type="radio" name="urgency" value="Medium" className="text-orange-600 focus:ring-orange-500" />
                    <span className="text-orange-700 font-semibold text-sm">Medium</span>
                  </label>
                  <label className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100 cursor-pointer">
                    <input type="radio" name="urgency" value="Low" className="text-green-600 focus:ring-green-500" />
                    <span className="text-green-700 font-semibold text-sm">Low</span>
                  </label>
               </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Attendant Contact Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="tel" 
                name="contact_number"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                placeholder="+91 9876543210"
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-red-500/40 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
            Broadcast Request <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
