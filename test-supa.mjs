import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://svhkagcdpccsuayotwjk.supabase.co'
const supabaseKey = 'sb_publishable_7t4MVSSOMPBW3eRLaNSKmg_q4bQ74In'
const supabase = createClient(supabaseUrl, supabaseKey)

async function runTest() {
  console.log('Fetching donors...')
  const { data: donors, error: fetchError } = await supabase.from('donors').select('id')
  
  if (fetchError) {
    console.error('Fetch error:', fetchError)
    return
  }
  
  console.log(`Found ${donors?.length} donors.`)
  
  if (donors && donors.length > 0) {
    console.log(`Attempting to insert notification for donor ${donors[0].id}...`)
    const { data, error: insertError } = await supabase.from('notifications').insert([{
      user_id: donors[0].id,
      message: 'System test notification via Anon Key',
      is_read: false
    }])
    
    if (insertError) {
      console.error('Insert Failed! Reason:', insertError)
    } else {
      console.log('Insert Success!', data)
    }
  }
}

runTest()
