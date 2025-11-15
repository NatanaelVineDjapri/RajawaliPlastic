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
            errorMessage = "Akses ditolak. Anda tidak login sebagai Admin atau token kedaluwarsa.";
        } else {
            errorMessage = `Server Error (${response.status}). Respons non-JSON/HTML: ${responseText.substring(0, 50)}...`;
        }
    }
    
    throw new Error(`${defaultErrorMessage}: ${errorMessage}`);
}


export async function fetchAllUsers(): Promise<UserData[]> {
    const defaultMessage = "Failed to fetch";
    
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            credentials: 'include', 
            headers: { "Accept": "application/json" },
        });

        if (!response.ok) {
            await handleResponse(response, defaultMessage);
        }
        
        const data = await response.json(); 
        
        return data.users as UserData[]; 
        
    } catch (error) {
        console.error(`Error di fetchAllUsers:`, error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<void> {
    const defaultMessage = "Failed to load user";

    try {
        await getCsrfCookie(); 

        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE',
            credentials: 'include', 
            headers: {
                 "Content-Type": "application/json",
                 "Accept": "application/json",
            },
        });

        if (!response.ok) {
            await handleResponse(response, defaultMessage);
        }

    } catch (error) {
        console.error(`Error di deleteUser:`, error);
        throw error;
    }
}