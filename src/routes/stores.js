import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_DATABASE_API_URL, import.meta.env.VITE_DATABASE_API_KEY);
var dat1 = {
    metadata: null,
    data: {
        data:{
            isAdmin: false
        }
    },
    isLoggedIn: false
}
supabase.auth.onAuthStateChange((event, session) => {
    dat1.metadata = session.user
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/player/${session.user.id}`)
        .then((response) => response.json())
        .then((data) => {
            dat1.data = data
            dat1.isLoggedIn = true
            userdata.set(dat1)
        });
})


export const userdata = writable(dat1);
