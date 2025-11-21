// const API_URL = 'https://rajawaliplastic.onrender.com/api/rs';

const API_URL = "http://localhost:8000/api/rs";

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

export const addBlog = async (
  formData: FormData
): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    credentials: "include",
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
    throw new Error(`Failed to add blog. Status: ${response.status}`);
  }

  return (await response.json()) as ApiSuccessResponse;
};

export const getBlogs = async (): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/blogs`, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to retrieve blogs. Status: ${response.status}`);
  }

  return (await response.json()) as ApiSuccessResponse;
};

export const updateBlog = async (
  id: string | number,
  formData: FormData
): Promise<ApiSuccessResponse> => {
  formData.append("_method", "PUT");

  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "POST",
    credentials: "include",
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
    throw new Error(`Failed to update blog. Status: ${response.status}`);
  }

  return (await response.json()) as ApiSuccessResponse;
};

export const deleteBlog = async (
  id: string | number
): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Failed to delete blog. Status: ${response.status}`);
  }

  return (await response.json()) as ApiSuccessResponse;
};

export const getBlogsById = async (
  id: string | number
): Promise<ApiSuccessResponse> => {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "GET",
    credentials: "include",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData: ApiErrorResponse = await response.json();
    if (errorData.message) {
      throw new Error(errorData.message);
    }
    throw new Error(`Gagal mengambil data blog (ID: ${id}).`);
  }

  return (await response.json()) as ApiSuccessResponse;
};
