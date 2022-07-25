import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
var dat = supabase.auth.user()
var dat1 = {
    metadata: {},
    data: {}
}
dat1.metadata = dat
fetch(`https://demon-listv2-api.vercel.app/players/3a24c91a-d45f-4e93-83f6-569858aaa35b`)
    .then((response) => response.json())
    .then((data) => {
        dat1.data = data
    });
export const userdata = writable(dat1);
