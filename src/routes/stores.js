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
    notifications: [],
    isLoggedIn: false
}
async function updateNotification(id){
    console.log(id)
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('to', id)
    dat1.notifications = data
    userdata.set(dat1)
    console.log(data, error)
    const sub = supabase
        .from(`notifications:to=eq.${id}`)
        .on('INSERT', (payload) => {
            console.log(payload.new)
            dat1.notifications.push(payload.new)
            userdata.set(dat1)
        })
        .subscribe()
    return () => {supabase.removeSubscription(sub)}
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
    updateNotification(session.user.id)
})


export const userdata = writable(dat1);
