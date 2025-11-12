// services/partnerService.ts

const API_URL = 'http://localhost:8000/api/rs';

interface ApiSuccessResponse {
  message: string;
  data: any;
}

interface ApiErrorResponse {
  message?: string;
  messages?: Record<string, string[]>;
  errors?: Record<string, string[]>; 
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


export const addPartner = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/partners`, {
    method: 'POST',
    headers: getHeaders(), 
    body: formData,
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.errors) {
      const firstError = Object.values(errorData.errors)[0][0];
      throw new Error(firstError);
    }
    if (errorData.messages) {
      const firstError = Object.values(errorData.messages)[0][0];
      throw new Error(firstError);
    }
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to add partner. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getPartners = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/partners`, {
    method: 'GET',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to retrieve partners. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const deletePartner = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/partners/${id}`, {
    method: 'DELETE',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to delete partner. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getPartnersById = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/partners/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil data partner (ID: ${id}).`);
  }

  return await response.json() as ApiSuccessResponse;
};