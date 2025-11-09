// services/galleryService.ts

const API_URL = 'http://localhost:8000/api/rs';

interface ApiSuccessResponse {
  message: string;
  data: any;
}

interface ApiErrorResponse {
  message?: string;
  messages?: Record<string, string[]>;
}

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken'); 
  }
  return null;
};

const getHeaders = (): HeadersInit => {
  const token = getToken();
  
  const headers: HeadersInit = {
    'Accept': 'application/json', 
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};


export const addGallery = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const headers = getHeaders();
  
  const response = await fetch(`${API_URL}/galleries`, {
    method: 'POST',
    headers: headers,
    body: formData,
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.messages) {
      const firstError = Object.values(errorData.messages)[0][0];
      throw new Error(firstError);
    }
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to add gallery item. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getGalleries = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/galleries`, {
    method: 'GET',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to retrieve gallery data. Status: ${response.status}`);
  }

  const rawData = await response.json();
  
  return {
    message: "Galleries retrieved successfully",
    // Mengasumsikan respons API Gallery telah diperbaiki atau kita menangani struktur array seperti ini:
    data: Array.isArray(rawData) ? (rawData.length > 0 ? rawData[0] : []) : rawData 
  } as ApiSuccessResponse;
}

export const updateGallery = async (id: string | number, formData: FormData): Promise<ApiSuccessResponse> => {
  
  formData.append('_method', 'PUT');

  const response = await fetch(`${API_URL}/galleries/${id}`, {
    method: 'POST', 
    headers: getHeaders(), 
    body: formData,
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.messages) {
      const firstError = Object.values(errorData.messages)[0][0];
      throw new Error(firstError);
    }
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to update gallery item. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const deleteGallery = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/galleries/${id}`, {
    method: 'DELETE',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to delete gallery item. Status: ${response.status}`);
  }

  return { message: 'Gallery item deleted successfully', data: null } as ApiSuccessResponse;
}