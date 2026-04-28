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

  // Find matching donors in the same location (simple matching)
  console.log('Searching for donors with blood group:', bloodGroupId, 'and location:', location)
  const { data: matchingDonors, error: donorSearchError } = await supabase
    .from('donors')
    .select('id')
    .eq('blood_group_id', parseInt(bloodGroupId, 10))
    .ilike('city', `%${location}%`)
    .eq('is_available', true)

  console.log('Donor search result:', matchingDonors, 'Error:', donorSearchError)

  if (matchingDonors && matchingDonors.length > 0) {
    const notifications = matchingDonors.map(donor => ({
      user_id: donor.id,
      message: `URGENT: Blood request for ${patientName} (${location}). Please check Live Requests.`,
      is_read: false
    }))
    
    console.log('Inserting notifications:', notifications)
    // Insert notifications for all matched donors
    const { error: insertError } = await supabase.from('notifications').insert(notifications)
    console.log('Notification insert error:', insertError)
  } else {
    console.log('No matching donors found for notification.')
  }

  redirect('/requests')
}
