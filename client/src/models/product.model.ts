export interface AllProductsResponse {
  products: Product[];
  success: boolean;
  message?: string;
  title: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  created_at: string;
  updated_at: string;
}
