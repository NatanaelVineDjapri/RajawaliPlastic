const API_URL = 'http://localhost:8000/api/rs';

interface ApiSuccessResponse {
    message: string;
    data: any;
}

interface ApiErrorResponse {
    message?: string;
    messages?: Record<string, string[]>;
}

export const addProduct = async (formData: FormData): Promise<ApiSuccessResponse> => {
    const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
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