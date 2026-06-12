
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
