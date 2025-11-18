import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo: Echo<any> | null;
        Pusher: any;
    }
}

const PUSHER_APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY;
const PUSHER_APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

let EchoInstance: Echo<any> | null = null;

const getCsrfToken = (): string | null => {
    const xsrf = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
    if (xsrf) {
        try {
            return decodeURIComponent(xsrf.split('=')[1]);
        } catch { return null; }
    }
    return null;
};

if (typeof window !== 'undefined') {
    window.Pusher = Pusher;

    if (PUSHER_APP_KEY && API_URL) {
        EchoInstance = new Echo({
            broadcaster: 'pusher',
            key: PUSHER_APP_KEY,
            cluster: PUSHER_APP_CLUSTER,
            forceTLS: true,
            disableStats: true,
            withCredentials: true,
            authEndpoint: `${API_URL}/broadcasting/auth`,
            authorizer: (channel, options) => {
                return {
                    authorize: async (socketId, callback) => {
                        const csrfToken = getCsrfToken();
                        let headers: HeadersInit = {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        };
                        if (csrfToken) headers['X-XSRF-TOKEN'] = csrfToken;

                        fetch(options.authEndpoint, {
                            method: 'POST',
                            headers,
                            body: JSON.stringify({ socket_id: socketId, channel_name: channel.name }),
                            credentials: 'include',
                        })
                        .then(async res => {
                            if (res.status === 401 || res.status === 403 || res.status === 419) {
                                callback(true, new Error(`Authorization failed with status ${res.status}`));
                                return;
                            }
                            return res.json();
                        })
                        .then(data => { if (data) callback(false, data); })
                        .catch(err => callback(true, err));
                    },
                };
            },
        });

        window.Echo = EchoInstance;
    }
}

export const listenToChannel = (userId: string, callback: (event: any) => void) => {
    const channel = `chat.${userId}`;

    if (!window.Echo) {
        const interval = setInterval(() => {
            if (window.Echo) {
                clearInterval(interval);
                window.Echo.private(channel).listen('MessageSent', callback);
            }
        }, 200);
        return;
    }

    window.Echo.private(channel).listen('MessageSent', callback);
};

export default EchoInstance;