import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {

          }
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') {
    return new NextResponse('Forbidden', { status: 403 })
  }

  const { data: profiles } = await supabase.from('profiles').select('*')
  const { data: requests } = await supabase.from('requests').select('*, blood_groups(name)')

  let csvContent = "BBDMS FULL SYSTEM REPORT\n\n";

  csvContent += "--- REGISTERED USERS ---\n";
  csvContent += "ID,Name,Email,Role,Registered At\n";
  profiles?.forEach(p => {
    csvContent += `"${p.id}","${p.full_name}","${p.email}","${p.role}","${p.created_at}"\n`;
  });

  csvContent += "\n--- BLOOD REQUESTS ---\n";
  csvContent += "ID,Patient Name,Hospital,City,Blood Group,Urgency,Status,Date\n";
  requests?.forEach(r => {
    csvContent += `"${r.id}","${r.patient_name}","${r.hospital_name}","${r.location}","${r.blood_groups?.name}","${r.urgency}","${r.status}","${r.created_at}"\n`;
  });

  const now = new Date().toISOString().split('T')[0]
  return new NextResponse(csvContent, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="bbdms-report-${now}.csv"`,
    },
  })
}
