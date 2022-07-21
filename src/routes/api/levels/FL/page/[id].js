import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    var { data, error } = await supabase
        .from('fl')
        .select('top, levels(*)')
        .range((params.id - 1) * 50, params.id * 50 - 1)
        .order('top', { ascending: true })
    for(const i in data){
        data[i].point = Math.round((2100 / (0.3 * data[i].top + 9) - 80) * 100) / 100;
    }
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: {
            data:data
        }
    };
}