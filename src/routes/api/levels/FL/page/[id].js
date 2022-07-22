import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

export async function GET({params}) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    var { data, error } = await supabase
        .from('levels')
        .select('*')
        .order('flTop', { ascending: true })
        .range((params.id - 1) * 200, params.id * 200 - 1)
        for(const i in data){
            if(data[i].flTop == null) {
                //delete from i to end
                data.splice(parseInt(i), data.length - parseInt(i))
                break
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