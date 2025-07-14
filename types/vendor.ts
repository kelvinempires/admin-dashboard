// types/vendor.ts
export interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  verified: boolean;
  price: string;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  services: string[];
  companyName: string;
  businessNumber: string;
  storeLocation: string;
  verifiedDate: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  date: string;
  rating: number;
}

export interface Booking {
  id: string;
  eventName: string;
  dates: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "completed";
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  description: string;
  status: "pending" | "paid" | "completed";
}

export interface Offer {
  id: string;
  amount: number;
  message: string;
  status: "pending" | "accepted" | "rejected";
  submittedDate: string;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  date: string;
}