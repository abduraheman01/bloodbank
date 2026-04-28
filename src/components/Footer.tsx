import { Droplet, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-red-500 p-1.5 rounded-md">
                <Droplet className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">BBDMS</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm">
              A modern, real-time blood bank and donor management system designed to connect donors with recipients efficiently.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/requests" className="text-gray-500 hover:text-red-500 transition-colors">Live Requests</a></li>
              <li><a href="/dashboard" className="text-gray-500 hover:text-red-500 transition-colors">Donor Dashboard</a></li>
              <li><a href="/register" className="text-gray-500 hover:text-red-500 transition-colors">Become a Donor</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-500 hover:text-red-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 hover:text-red-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} BBDMS. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500" /> for the community
          </p>
        </div>
      </div>
    </footer>
  )
}
