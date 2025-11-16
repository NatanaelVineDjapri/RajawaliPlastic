const API_URL = 'http://localhost:8000/api/rs';

const getHeaders = (): HeadersInit => ({
  Accept: "application/json",
});

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

export const getCsrfCookie = async () => {
  try {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      credentials: 'include',
    });
  } catch (error) {
    console.error("Gagal mengambil CSRF cookie:", error);
  }
};

export const login = async (credentials: any): Promise<AuthResponse> => {
  await getCsrfCookie(); 

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'include', 
    headers: {
      "Content-Type": "application/json", 
      Accept: "application/json",
    },
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

  if (typeof window !== 'undefined' && data.user) {
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  return data;
};


export const register = async (userData: any): Promise<AuthResponse> => {
  await getCsrfCookie(); 

  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    credentials: 'include',
    headers: { 
      "Content-Type": "application/json", 
      "Accept": "application/json",
    },
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
      credentials: 'include', 
      headers: getHeaders(), 
    });
  } catch (err) {
    console.error('Logout error:', err);
  }

  // Hanya perlu hapus data 'user'
  if (typeof window !== 'undefined') {
    localStorage.removeItem('user');
  }
};

  export const getProfile = async (): Promise<User> => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'GET',
      credentials: 'include', 
      headers: getHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal ambil profile');
    }

    const data = await response.json();
    return data.user;
  };

export const updateProfile = async (formData: FormData): Promise<User> => {
    formData.append('_method', 'PUT');
    await getCsrfCookie();

    const response = await fetch(`${API_URL}/profile/update`, {
        method: 'POST', 
        credentials: 'include',
        headers: getHeaders(), 
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal update profile');
    }

    const data = await response.json();
    return data.user;
};