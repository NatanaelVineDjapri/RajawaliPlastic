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

const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken'); 
  }
  return null;
};

const getHeaders = (): Record<string, string> => { // 1. Ubah HeadersInit
  const token = getToken();
  const headers: Record<string, string> = { // 2. Ubah HeadersInit
    'Accept': 'application/json', 
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const addOrder = async (payload: any): Promise<ApiSuccessResponse> => {
  const headers = getHeaders();
  headers['Content-Type'] = 'application/json';

  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
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

export const getOrders = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    headers: getHeaders(), 
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to retrieve orders. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
}

export const getOrderById = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil order. Status: ${response.status}`);
  }

  return await response.json() as ApiSuccessResponse;
};


export const updateOrder = async (id: string | number, payload: any): Promise<ApiSuccessResponse> => {
  const headers = getHeaders();
  headers['Content-Type'] = 'application/json';

  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT', 
    headers: headers, 
    body: JSON.stringify(payload),
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

export const deleteOrder = async (id: string | number): Promise<ApiSuccessResponse> => {
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

export const getOrderSummary = async (): Promise<ApiSuccessResponse> => {
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

export const getOrderDetailSummary = async (): Promise<ApiSuccessResponse> => {
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

