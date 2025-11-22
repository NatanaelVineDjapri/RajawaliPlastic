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

// const API_BASE_URL = 'http://localhost:8000/api/rs';
const API_BASE_URL = 'https://rajawaliplastic.onrender.com/api/rs';
// const API_URL = 'https://rajawaliplastic.onrender.com/api/rs';

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

async function handleResponse(response: Response, defaultErrorMessage: string) {
    if (response.ok) {
        return response.json();
    }
    
    let errorMessage: string;
    try {
        const errorData = await response.json();
        errorMessage = errorData.message || response.statusText;
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

export async function fetchCurrentUserProfile(): Promise<UserData> {
    const defaultMessage = "Gagal mengambil profil user yang sedang login";
    
    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);
        return data.user as UserData;
        
    } catch (error) {
        console.error(`Error di fetchCurrentUserProfile:`, error);
        throw error;
    }
}

export async function fetchAllUsers(): Promise<UserData[]> {
    const defaultMessage = "Gagal mengambil daftar semua user";

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

export async function fetchAdminUserForChat(): Promise<UserData> {
    const defaultMessage = "Gagal menemukan Admin Support untuk chat";
    
    try {
        const response = await fetch(`${API_BASE_URL}/admin-for-chat`, {
            method: 'GET',
            credentials: 'include',
            headers: getSessionHeaders(),
        });

        const data = await handleResponse(response, defaultMessage);

        if (!data.admin) {
            throw new Error("Admin support tidak ditemukan.");
        }

        return data.admin as UserData;
        
    } catch (error) {
        console.error(`Error di fetchAdminUserForChat:`, error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<void> {
    const defaultMessage = "Gagal menghapus user";

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