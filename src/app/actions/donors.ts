'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleAvailability(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Not authenticated')
  }

  const isAvailable = formData.get('is_available') === 'true'

  const { error } = await supabase
    .from('donors')
    .update({ is_available: isAvailable })
    .eq('id', user.id)

  if (error) {
    throw error
  }

  revalidatePath('/dashboard')
  revalidatePath('/search')
}
