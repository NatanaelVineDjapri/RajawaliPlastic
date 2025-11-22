import { getCsrfCookie } from './authService';

export type UserData = { 
    id: string; 
    name: string; 
    role: string; 
    email: string;
    phone_number: string;
    address: string;
    image?: string; 
};

const API_BASE_URL = 'http://localhost:8000/api/rs'; 

export type MessageData = {
    _id: string; 
    sender_id: string;
    receiver_id: string;
    message: string;
    image_url: string | null;
    is_read: boolean;
    created_at: string;
    updated_at: string;
    image_base64?: string; 
};

export type ConversationData = MessageData & {
    sender: UserData; 
    receiver: UserData;
};

function getSessionHeaders(includeContentTypeJson = false): HeadersInit {
    const headers: HeadersInit = {
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    };

    if (includeContentTypeJson) {
        headers["Content-Type"] = "application/json";
    }
    return headers;
}

async function handleResponse(response: Response, defaultErrorMessage: string): Promise<any> {
    if (response.ok) {
        return response.json();
    }
    
    let errorMessage: string;
    try {
        const errorData = await response.json();
        if (response.status === 422 && errorData.errors) {
            const validationMessages = Object.keys(errorData.errors).map(key => 
                `${key}: ${errorData.errors[key].join(', ')}`
            ).join('; ');
            errorMessage = `Validasi Gagal: ${validationMessages}`;
        } else {
            errorMessage = errorData.message || response.statusText;
        }
    } catch (_e) {
        const responseText = await response.text();
        if (response.status === 401 || response.status === 403) {
            errorMessage = "Akses ditolak. Anda belum login atau sesi telah berakhir.";
        } else {
            errorMessage = `Server Error (${response.status}). Respons non-JSON/HTML: ${responseText.substring(0, 50)}...`;
        }
    }
    
    throw new Error(`${defaultErrorMessage}: ${errorMessage}`);
}

export async function fetchConversations(): Promise<ConversationData[]> {
    const defaultMessage = "Gagal mengambil daftar percakapan";

    try {
        const response = await fetch(`${API_BASE_URL}/conversations`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);
        return data.data as ConversationData[];
        
    } catch (error) {
        console.error(`Error di fetchConversations:`, error);
        throw error;
    }
}

export async function fetchMessages(receiverId: string): Promise<MessageData[]> {
    const defaultMessage = "Gagal mengambil riwayat pesan";

    try {
        const response = await fetch(`${API_BASE_URL}/messages/${receiverId}`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);
        return data.data as MessageData[];
        
    } catch (error) {
        console.error(`Error di fetchMessages:`, error);
        throw error;
    }
}

export async function fetchMessageImage(messageId: string): Promise<string> {
    const defaultMessage = `Gagal mengambil data gambar untuk ID ${messageId}`;

    try {
        const response = await fetch(`${API_BASE_URL}/messages/${messageId}/image`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);
        
        if (!data.image_base64) {
             throw new Error("Server tidak mengembalikan data Base64 gambar.");
        }
        return data.image_base64 as string;
        
    } catch (error) {
        console.error(`Error di fetchMessageImage:`, error);
        throw error;
    }
}


export async function sendMessage(receiverId: string, messageText: string, imageFile: File | null = null): Promise<MessageData> {
    const defaultMessage = "Gagal mengirim pesan";

    if (!receiverId) {
        throw new Error(`${defaultMessage}: ID Penerima (receiverId) kosong.`);
    }
    if ((!messageText || messageText.trim() === '') && !imageFile) {
        throw new Error(`${defaultMessage}: Pesan harus memiliki teks atau gambar.`);
    }

    try {
        await getCsrfCookie();

        const formData = new FormData();
        formData.append('receiver_id', receiverId);
        
        if (messageText && messageText.trim().length > 0) { 
            formData.append('message', messageText.trim());
        }
        
        if (imageFile) {
            formData.append('image', imageFile);
        }

        const response = await fetch(`${API_BASE_URL}/messages`, {
            method: 'POST',
            credentials: 'include',
            headers: getSessionHeaders(false),
            body: formData,
        });

        const data = await handleResponse(response, defaultMessage);
        return data.data as MessageData;
        
    } catch (error) {
        console.error(`Error di sendMessage:`, error);
        throw error;
    }
}

export async function fetchAllUsers(): Promise<UserData[]> {
    const defaultMessage = "Failed to fetch all users";
    
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);
        return data.users as UserData[];
        
    } catch (error) {
        console.error(`Error di fetchAllUsers:`, error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<void> {
    const defaultMessage = "Failed to delete user";

    try {
        await getCsrfCookie();

        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: getSessionHeaders(true),
        });

        await handleResponse(response, defaultMessage);

    } catch (error) {
        console.error(`Error di deleteUser:`, error);
        throw error;
    }
}