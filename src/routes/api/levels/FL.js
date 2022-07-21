import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET() {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    var { data, error } = await supabase
        .from('fl')
        .select('*')
    var d = data
    var res = []
    for(const i in d){
        var { data, error } = await supabase
        .from('levels')
        .select('*')
        .eq('id', d[i].id)
        data[0]['top'] = d[i].top
        data[0]['point'] = Math.round((2100 / (0.3 * parseInt(d[0].top) + 9) - 80) * 100) / 100;
        res.push(data[0])
    }

    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: {
            data:res
        }
    };
}