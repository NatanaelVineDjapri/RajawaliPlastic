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


export const addProduct = async (formData: FormData): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/products`, {
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
    throw new Error(`Gagal menambahkan produk. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getProducts = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil data produk. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}
export const updateProduct = async (id: string | number, formData: FormData): Promise<ApiSuccessResponse> => {
  formData.append('_method', 'PUT');
  formData.append('last_edited', new Date().toISOString());

  const response = await fetch(`${API_URL}/products/${id}`, {
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
    throw new Error(`Gagal mengupdate produk. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
};

export const deleteProduct = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal menghapus produk. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getLastEditedProducts = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/products/last-edited`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil produk terakhir diedit. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
};

export const getProductById = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'GET',
    credentials: 'include',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil data produk (ID: ${id}).`);
  }

  return await response.json() as ApiSuccessResponse;
};
