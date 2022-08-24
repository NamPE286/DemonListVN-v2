import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
var dat1 = {
    metadata: {
        id:null
    },
    data: {
        data:{
            isAdmin: false
        }
    }
}
if(!supabase.auth.user()) dat1.metadata.id = 1
supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session.user.id)
    dat1.metadata = session.user
    fetch(`https://seademonlist-api.vercel.app/player/${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
            dat1.data = data
            userdata.set(dat1)
        });
})


export const userdata = writable(dat1);
