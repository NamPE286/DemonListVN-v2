import { writable } from "svelte/store";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
var dat = supabase.auth.user()
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
dat1.metadata = dat
var interval = 0
function waitForElement(){
    if(dat){
        fetch(`https://demon-listv2-api.vercel.app/players/${dat.id}`)
        .then((response) => response.json())
        .then((data) => {
            dat1.data = data
        });
    }
    else{
        interval += 250
        if(interval >= 5000) return
        setTimeout(waitForElement, 250);
    }
}
waitForElement()

export const userdata = writable(dat1);
