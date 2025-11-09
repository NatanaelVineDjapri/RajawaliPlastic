// types.ts
export type StatusType = 'pending' | 'paid' | 'failed' | 'unpaid' | 'proses' | 'kirim' | 'selesai';

export interface Product {
  id: string | number;
  product_id?: string | number;
  name: string;
  quantity: number;
}

export interface Order {
  id: string | number;
  order_no: string;
  user_email: string;
  total_price: number;
  products?: Product[];
  status_payment: StatusType;
  status_delivery: StatusType;
  address?: string;
  notes?: string;
  product_name?: string;
  quantity?: number;
  created_at: string;
}
