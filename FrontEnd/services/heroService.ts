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


export const addSlider = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const headers = getHeaders();
  
  const response = await fetch(`${API_URL}/sliders`, {
    method: 'POST',
    credentials: 'include',
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
    throw new Error(`Failed to add slider. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getSliders = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/sliders`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to retrieve slider data. Status: ${response.status}`);
  }

  const rawData = await response.json();
  
  return {
    message: "Sliders retrieved successfully",
    data: Array.isArray(rawData) ? rawData : (rawData.data || rawData)
  } as ApiSuccessResponse;
}

export const deleteSlider = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/sliders/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to delete slider. Status: ${response.status}`);
  }
  
  return { message: 'Slider deleted successfully', data: null } as ApiSuccessResponse;
}