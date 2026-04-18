/**
 * lib/pusherClient.js — Browser-side Pusher singleton
 * Import this in client components instead of creating a new instance each time.
 */
import PusherJS from 'pusher-js';

let pusherClient = null;

export function getPusherClient() {
    if (!pusherClient) {
        pusherClient = new PusherJS(process.env.NEXT_PUBLIC_PUSHER_KEY, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        });
    }
    return pusherClient;
}
