import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
var dat1 = {
    metadata: null,
    data: {
        data:{
            isAdmin: false
        }
    }
}
supabase.auth.onAuthStateChange((event, session) => {
    dat1.metadata = session.user
    fetch(`https://api.vnpower.tech//player/${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
            dat1.data = data
            userdata.set(dat1)
        });
})


export const userdata = writable(dat1);
