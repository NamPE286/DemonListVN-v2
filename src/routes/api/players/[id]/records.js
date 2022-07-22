import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    const { data, error } = await supabase
        .from('records')
        .select('*')
        .eq('userid', params.id)
    console.log(error)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data
    };
}