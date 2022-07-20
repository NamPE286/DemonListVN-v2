import { createClient } from '@supabase/supabase-js'
import { page } from '$app/stores';

export async function GET() {
    function roundNumber(num, scale) {
        if (!("" + num).includes("e")) {
            return +(Math.round(parseInt(num + "e+" + scale)) + "e-" + scale);
        } else {
            var arr = ("" + num).split("e");
            var sig = ""
            if (+arr[1] + scale > 0) {
                sig = "+";
            }
            return +(Math.round(parseInt(+arr[0] + "e" + sig + (+arr[1] + scale))) + "e-" + scale);
        }
    }
    function getPoint(rank) {
        return roundNumber((100 / Math.sqrt(((rank - 1) / 50) + 0.444444)) - 50, 3);
    }
    const supabase = createClient('https://qdwpenfblwdmhywwszzj.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkd3BlbmZibHdkbWh5d3dzenpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTgzMTk1ODEsImV4cCI6MTk3Mzg5NTU4MX0.b_j2bXu26CYSCMDPei6vGGm9P_QG3I-LsB8OBPm0ZOg')
    var { data, error } = await supabase
        .from('dl')
        .select('*')
    var d = data
    var res = []
    for(const i in d){
        var { data, error } = await supabase
        .from('levels')
        .select('*')
        .eq('id', d[i].id)
        data[0]['top'] = d[i].top
        data[0]['point'] = getPoint(d[i].top)
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