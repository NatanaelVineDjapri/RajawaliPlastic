// const API_URL = 'https://rajawaliplastic.onrender.com/api/rs';
const API_URL = 'http://localhost:8000/api/rs';

interface ApiSuccessResponse {
  message: string;
  data: any;
}

interface ApiErrorResponse {
  message?: string;
  messages?: Record<string, string[]>;
}

const getHeaders = (): HeadersInit => ({
  Accept: "application/json", 
});

export const addGallery = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const headers = getHeaders();
  
  const response = await fetch(`${API_URL}/galleries`, {
    method: 'POST',
    credentials: 'include',
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
    message: rawData.message,
    data: rawData.data,
  } as ApiSuccessResponse;
};

export const updateGallery = async (id: string | number, formData: FormData): Promise<ApiSuccessResponse> => {
  
  formData.append('_method', 'PUT');

  const response = await fetch(`${API_URL}/galleries/${id}`, {
    method: 'POST', 
    credentials: 'include',
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
    credentials: 'include',
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