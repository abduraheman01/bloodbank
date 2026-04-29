'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const fullName = formData.get('full_name') as string
  const city = formData.get('city') as string
  const phone = formData.get('phone') as string

  // Update profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', user.id)

  if (profileError) {
    redirect('/dashboard/profile?error=' + encodeURIComponent(profileError.message))
  }

  // Update donors table if they have a donor record
  const { data: donor } = await supabase.from('donors').select('id').eq('id', user.id).maybeSingle()
  if (donor) {
    const { error: donorError } = await supabase
      .from('donors')
      .update({ city, phone })
      .eq('id', user.id)

    if (donorError) {
      redirect('/dashboard/profile?error=' + encodeURIComponent(donorError.message))
    }
  }

  revalidatePath('/dashboard')
  revalidatePath('/search')
  redirect('/dashboard')
}
