import { createClient } from '@supabase/supabase-js'
import autocorrect from 'autocorrect'
import 'dotenv/config'

export async function GET({ params }) {
    const supabase = createClient(process.env.API_URL, process.env.API_KEY)
    //autocorrect all word in params.id
    var id = params.id.split(' ')
    for (var i = 0; i < id.length; i++) {
        id[i] = autocorrect()(id[i])
    }
    id = id.join(' ')
    if (isNaN(params.id)) {
        var d = []
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .textSearch('name', `'${params.id}'`, {
                type: 'websearch',
                config: 'english'
            })
        d = JSON.parse(JSON.stringify(data))
        var set = new Set()
        for (var i = 0; i < d.length; i++) {
            set.add(d[i])
        }
        var { data, error } = await supabase
            .from('levels')
            .select('*')
            .textSearch('name', `'${id}'`, {
                type: 'websearch',
                config: 'english'
            })
        for (var i = 0; i < data.length; i++) {
            set.add(data[i])
        }
        var list = []
        for (var item of set) {
            list.push(item)
        }
        return {
            status: 200,
            headers: {
                'access-control-allow-origin': '*'
            },
            body: d            
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
            body: data,
        };
    }


}