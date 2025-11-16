import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo: Echo<any> | null; 
        Pusher: any; 
    }
}

const PUSHER_APP_KEY: string | undefined = process.env.NEXT_PUBLIC_PUSHER_APP_KEY; 
const PUSHER_APP_CLUSTER: string | undefined = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
const API_URL: string | undefined = process.env.NEXT_PUBLIC_API_URL; 

let EchoInstance: Echo<any> | null = null; 

if (typeof window !== 'undefined') {
    Pusher.logToConsole = process.env.NODE_ENV === 'development';
    
    if (PUSHER_APP_KEY && API_URL) {
        window.Pusher = Pusher as any; 

        const pusherHost = PUSHER_APP_CLUSTER ? `ws-${PUSHER_APP_CLUSTER}.pusher.com` : undefined;

        const apiUsesHttps = API_URL.startsWith('https://');


        EchoInstance = new Echo({
            broadcaster: 'pusher',
            key: PUSHER_APP_KEY,
            cluster: PUSHER_APP_CLUSTER,
            
            forceTLS: false, 
            
            wsHost: pusherHost,
            wsPort: 80,
            wssPort: 443,

            authEndpoint: `${API_URL}/broadcasting/auth`, 
            enabledTransports: ['ws', 'wss'],
            
            authorizer: (channel, options) => {
                return {
                    authorize: (socketId, callback) => {
                        fetch(options.authEndpoint, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest', 
                            },
                            body: JSON.stringify({
                                socket_id: socketId,
                                channel_name: channel.name,
                            }),
                            credentials: 'include',
                        })
                        .then(response => {
                            if (!response.ok) {

                                console.error(`[Echo/Auth Error]: Status ${response.status}. Cek routes/channels.php dan cookie.`);
                                throw new Error(`Authorization failed with status ${response.status}`);
                            }
                            return response.json();
                        })
                        .then(data => callback(false, data))
                        .catch(error => {
                            callback(true, error);
                        });
                    }
                };
            }
        });
    }
}

export const listenToChannel = (userId: string | number, callback: (event: any) => void): void => {
    if (EchoInstance) {

        EchoInstance.private(`chat.${userId}`)
            .listen('MessageSent', callback); 

        console.log(`[Echo/TS] Listening to private channel: chat.${userId}`);
    } else {
        console.warn("[Echo/TS] Laravel Echo not initialized. Env variable missing or not running in browser.");
    }
};

export default EchoInstance;