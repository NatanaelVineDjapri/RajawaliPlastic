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

export async function getTestimonials(): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/testimonials`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil testimonials. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export async function addTestimonial(formData: FormData): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/testimonials`, {
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
    throw new Error(`Gagal menambahkan testimonial. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export async function updateTestimonial(id: string | number, formData: FormData): Promise<ApiSuccessResponse> {
  
  formData.append('_method', 'PUT'); 

  const response = await fetch(`${API_URL}/testimonials/${id}`, {
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
    throw new Error(`Gagal mengupdate testimonial. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export async function deleteTestimonial(id: string | number): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal menghapus testimonial. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getTestimonialById = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil data testimonial (ID: ${id}).`);
  }

  return await response.json() as ApiSuccessResponse;
};
