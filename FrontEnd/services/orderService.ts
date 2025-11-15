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


export const addOrder = async (payload: any): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    credentials: 'include', 
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.messages) throw new Error(Object.values(errorData.messages)[0][0]);
    if (errorData.message) throw new Error(errorData.message);
    throw new Error(`Gagal menambahkan order. Status: ${response.status}`);
  }

  return response.json() as Promise<ApiSuccessResponse>;
};

export const getOrders = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'GET',
    credentials: 'include',
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
    credentials: 'include',
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
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      ...getHeaders(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.messages) {
      throw new Error(Object.values(errorData.messages)[0][0]);
    }
    if (errorData.message){
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengupdate order. Status: ${response.status}`);
  }

  return response.json() as Promise<ApiSuccessResponse>;
};

export const deleteOrder = async (id: string | number): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    credentials: 'include',
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
    credentials: 'include',
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
    credentials: 'include',
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

