import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('flrank', {ascending: false})
        .range((params.id - 1) * 200, params.id * 200 - 1)
    for(const i in data){
        if(data[i].flrank == null) {
            delete data[i]
        }
    }
    console.log(error)
    return {
        status: 200,
        headers: {
            'access-control-allow-origin': '*'
        },
        body: data
    };
}