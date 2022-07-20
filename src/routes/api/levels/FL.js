import { createClient } from '@supabase/supabase-js'
import { page } from '$app/stores';

export async function GET() {
    const supabase = createClient('https://qdwpenfblwdmhywwszzj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3BlbmZibHdkbWh5d3dzenpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgzMTk1ODEsImV4cCI6MTk3Mzg5NTU4MX0.b_j2bXu26CYSCMDPei6vGGm9P_QG3I-LsB8OBPm0ZOg')
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