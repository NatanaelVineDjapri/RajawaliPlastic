// const API_URL = 'https://rajawaliplastic.onrender.com/api/rs';
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

const getHeaders = (): HeadersInit => ({
  Accept: "application/json", 
});


export const addPartner = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/partners`, {
    method: 'POST',
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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