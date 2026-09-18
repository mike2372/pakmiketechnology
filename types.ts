
export type Language = 'en' | 'zh' | 'ms';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ContactInfo {
  phone: string[];
  address: string;
  blog: string;
  facebook: string;
  youtube: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
}

export type FulfillmentMethod = 'standard_courier' | 'self_pickup' | 'direct_installer';

export interface CheckoutData {
  name: string;
  email: string;
  phone: string;
  address: string;
  fulfillmentMethod: FulfillmentMethod;
  postcode?: string;
}
