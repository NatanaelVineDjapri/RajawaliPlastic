const API_URL = 'http://localhost:8000/api/rs';

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const getHeaders = (): HeadersInit => {
  const token = getToken();
  
  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone_number: string;
  role: string;
}

interface AuthResponse {
  message?: string;
  user?: User;
  token?: string;
}


export const login = async (credentials: any): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof data.message === 'object'
        ? Object.values(data.message).flat().join(', ')
        : data.message || 'Login gagal.';
    throw new Error(errorMessage);
  }

  if (typeof window !== 'undefined' && data.token) {
    localStorage.setItem('authToken', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};

export const register = async (userData: any): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      typeof data.message === 'object'
        ? Object.values(data.message).flat().join(', ')
        : data.message || 'Registrasi gagal.';
    throw new Error(errorMessage);
  }

  return data; 
};

export const logout = async (): Promise<void> => {
  try {
    await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: getHeaders(),
    });
  } catch (err) {
    console.error('Logout error:', err);
  }

  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

export const getProfile = async (): Promise<User> => {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Gagal ambil profile');
  }

  const data = await response.json();
  return data.user;
};
