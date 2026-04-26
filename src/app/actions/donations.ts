'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logDonation(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const remarks = formData.get('remarks') as string
  const dateStr = formData.get('donation_date') as string
  const donationDate = new Date(dateStr)

  // 1. Insert into donations table
  const { error: insertError } = await supabase.from('donations').insert({
    donor_id: user.id,
    donation_date: donationDate.toISOString().split('T')[0], // YYYY-MM-DD
    remarks: remarks || null
  })

  if (insertError) {
    console.error('Insert error:', insertError)
    redirect(`/dashboard?error=${encodeURIComponent(insertError.message)}`)
  }

  // 2. Update last_donation_date in donors table
  const { error: updateError } = await supabase.from('donors')
    .update({ last_donation_date: donationDate.toISOString().split('T')[0] })
    .eq('id', user.id)

  if (updateError) {
    console.error('Update error:', updateError)
    redirect(`/dashboard?error=${encodeURIComponent(updateError.message)}`)
  }

  revalidatePath('/dashboard')
  redirect('/dashboard?success=Donation successfully logged')
}
