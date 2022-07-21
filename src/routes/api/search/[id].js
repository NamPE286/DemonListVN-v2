import { createClient } from '@supabase/supabase-js'
import AES from 'crypto-js/aes'
import 'dotenv/config'

export async function GET({ params }) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    var { data, error } = await supabase
        .from('levels')
        .select('*')
        .textSearch('name', params.id, {
            type: 'websearch',
            config: 'english'
        })
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: {
            data: data
        }
    };

}