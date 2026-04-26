'use client';

import { Droplet } from 'lucide-react';

export default function AcceptRequestButton({ contactNumber }: { contactNumber: string }) {
  const handleAccept = (e: React.MouseEvent) => {
    e.preventDefault();
    alert(`Thank you for accepting!\n\nPlease contact the patient or hospital directly at: ${contactNumber}`);
  };

  return (
    <button 
      onClick={handleAccept}
      className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white shadow-lg"
    >
      <Droplet className="w-4 h-4" />
      Accept Request
    </button>
  );
}
