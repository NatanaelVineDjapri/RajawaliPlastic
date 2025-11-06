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

// POST: (Route::post('/orders', ...))
export async function addOrder(formData: FormData): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/orders`, {
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
    throw new Error(`Gagal menambahkan order. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

// UPDATE: (Route::put('/orders/{id}', ...))
export async function updateOrder(id: string | number, formData: FormData): Promise<ApiSuccessResponse> {
  
  formData.append('_method', 'PUT'); 

  const response = await fetch(`${API_URL}/orders/${id}`, {
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
    throw new Error(`Gagal mengupdate order. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

// DELETE: (Route::delete('/orders/{id}', ...))
export async function deleteOrder(id: string | number): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal menghapus order. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

// GET: (Route::get('/orders/summary', ...))
export async function getOrderSummary(): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/orders/summary`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil summary. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

// GET: (Route::get('/orders/summary-detail', ...))
export async function getOrderDetailSummary(): Promise<ApiSuccessResponse> {
  const response = await fetch(`${API_URL}/orders/summary-detail`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil detail summary. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}