// types/index.ts
export interface User {
  id: string;
  name: string | undefined;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  role: "USER" | "ADMIN" | "AGENT";
  phone?: string;
  address?: string;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  accounts?: Account[];
  properties?: Property[];
}

export interface Account {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  details: string;
  images: Array<{
    url: string;
    alt?: string;
  }>;
  videoUrl?: string;
  propertyType: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  taxes: number;
  features: string[];
  agentId?: string;
}

export interface Leads {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  interest?: string;
  status: 'New' | 'Contacted' | "In Negotiation" ;
  createdAt: Date;
  convertedAt?: string;
}

export interface Clients {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: "Interested" | "In Negotiation" | "Contract Signed" | "Canceled";
  birthday: string;
  address: string;
  zip: string;
  city: string;
  state: string;
  idDocument: string;
  createdAt: Date;
  convertedFrom?: number;
}

export interface Agents {
  id: string;
  name: string;
  idDocument: string;
  license: string;
  phone: string;
  email: string;
  address?: string;
  avatar: Array<{
    url: string;
    type?: string;
  }>;
  role: string;
  createdAt: Date ;
  updatedAt: Date ;
  accounts?: Account[];
  properties?: Property[];
}

export interface Sales {
  id: number;
  buyer: string;
  address: string;
  value: number;
  agent: string;
  status: "Pending" | "In progress" | "Canceled" | "Completed";
  date: string;
  commission: number;
}

