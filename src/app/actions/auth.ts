'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/login?error=' + encodeURIComponent(error.message))
  }

  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const fullName = formData.get('full_name') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const role = formData.get('role') as string
  const bloodGroupId = formData.get('blood_group_id') as string
  const phone = formData.get('phone') as string
  const city = formData.get('city') as string

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    redirect('/register?error=' + encodeURIComponent(authError.message))
  }

  if (!authData.user) {
    redirect('/register?error=' + encodeURIComponent('Failed to create user account'))
  }

  const { error: profileError } = await supabase.from('profiles').insert({
    id: authData.user.id,
    full_name: fullName,
    email: email,
    role: role,
  })

  if (profileError) {
    redirect('/register?error=' + encodeURIComponent('Failed to create user profile: ' + profileError.message))
  }

  if (role === 'donor') {
    const { error: donorError } = await supabase.from('donors').insert({
      id: authData.user.id,
      blood_group_id: parseInt(bloodGroupId, 10),
      city: city,
      phone: phone,
      is_available: true,
    })

    if (donorError) {
      redirect('/register?error=' + encodeURIComponent('Failed to create donor profile: ' + donorError.message))
    }
  }

  redirect('/dashboard')
}

export async function signout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
