import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({ params }) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    if (isNaN(params.id)) {
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
    else {
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .eq('id', params.id)
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


}