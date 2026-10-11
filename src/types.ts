export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = 'SUPER_ADMIN' | 'HOSTEL_MANAGER' | 'EMPLOYER' | 'JOB_SEEKER' | 'GUEST';

export interface Hostel {
  id: string;
  slug: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  image: string;
  gallery: string[];
  name: string;
  description: string;
  rooms: RoomType[];
  published: boolean;
}

export interface RoomType {
  id: string;
  hostelId: string;
  type: 'dorm' | 'private';
  beds: number;
  pricePerNight: number;
  name: string;
  description: string;
}

export interface Booking {
  id: string;
  hostelId: string;
  userId: string;
  roomTypeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  createdAt: string;
  guestName: string;
  guestEmail: string;
  totalPrice: number;
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'EXPIRED' | 'COMPLETED';

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  city: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'remote';
  salaryMin: number;
  salaryMax: number;
  currency: string;
  deadline: string;
  languages: string[];
  title: string;
  description: string;
  requirements: string;
  published: boolean;
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  coverLetter: string;
  createdAt: string;
  applicantName: string;
  applicantEmail: string;
}

export type ApplicationStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';

export interface Business {
  id: string;
  category: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  languages: string[];
  hours: string;
  image: string;
  verified: boolean;
  name: string;
  description: string;
  services: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  coverImage: string;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  title: string;
  excerpt: string;
  content: string;
}
