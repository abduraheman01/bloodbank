'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function createRequest(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login?error=' + encodeURIComponent('You must be logged in to create a request'))
  }

  const patientName = formData.get('patient_name') as string
  const hospitalName = formData.get('hospital_name') as string
  const contactNumber = formData.get('contact_number') as string
  const location = formData.get('location') as string
  const urgency = formData.get('urgency') as string
  const bloodGroupId = formData.get('blood_group_id') as string

  const { error } = await supabase.from('requests').insert({
    requester_id: user.id,
    blood_group_id: parseInt(bloodGroupId, 10),
    patient_name: patientName,
    hospital_name: hospitalName,
    contact_number: contactNumber,
    location: location,
    urgency: urgency,
    status: 'Open'
  })

  if (error) {
    redirect('/requests/new?error=' + encodeURIComponent(error.message))
  }

  redirect('/requests')
}
