'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function closeRequest(requestId: string) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Not authenticated')
  }

  const { error } = await supabase
    .from('requests')
    .update({ status: 'Fulfilled' })
    .match({ id: requestId, requester_id: user.id })

  if (error) {
    throw error
  }

  revalidatePath('/requests')
  revalidatePath('/dashboard')
}
