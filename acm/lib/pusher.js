/**
 * lib/pusher.js — Server-side Pusher instance
 * Used by API routes to trigger events.
 */
import Pusher from 'pusher';

const pusher = new Pusher({
    appId:   process.env.PUSHER_APP_ID,
    key:     process.env.NEXT_PUBLIC_PUSHER_KEY,
    secret:  process.env.PUSHER_SECRET,
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS:  true,
});

export default pusher;
