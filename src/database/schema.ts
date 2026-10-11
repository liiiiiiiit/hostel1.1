import Dexie, { Table } from 'dexie';

// Database Schema - Mirrors PostgreSQL structure
export interface UserDB {
  id?: number;
  email: string;
  passwordHash: string;
  name: string;
  role: 'SUPER_ADMIN' | 'HOSTEL_MANAGER' | 'EMPLOYER' | 'JOB_SEEKER' | 'GUEST';
  createdAt: Date;
  updatedAt: Date;
}

export interface HostelDB {
  id?: number;
  slug: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  imageUrl: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface HostelTranslationDB {
  id?: number;
  hostelId: number;
  locale: string;
  name: string;
  description: string;
}

export interface RoomTypeDB {
  id?: number;
  hostelId: number;
  type: 'dorm' | 'private';
  beds: number;
  pricePerNight: number;
}

export interface RoomTypeTranslationDB {
  id?: number;
  roomTypeId: number;
  locale: string;
  name: string;
  description: string;
}

export interface BookingDB {
  id?: number;
  hostelId: number;
  userId: number;
  roomTypeId: number;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'EXPIRED' | 'COMPLETED';
  guestName: string;
  guestEmail: string;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobDB {
  id?: number;
  companyId: number;
  companyName: string;
  city: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'remote';
  salaryMin: number;
  salaryMax: number;
  currency: string;
  deadline: string;
  languages: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface JobTranslationDB {
  id?: number;
  jobId: number;
  locale: string;
  title: string;
  description: string;
  requirements: string;
}

export interface JobApplicationDB {
  id?: number;
  jobId: number;
  userId: number;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'SHORTLISTED' | 'INTERVIEW' | 'REJECTED' | 'HIRED' | 'WITHDRAWN';
  coverLetter: string;
  applicantName: string;
  applicantEmail: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessDB {
  id?: number;
  category: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  website: string;
  languages: string[];
  hours: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessTranslationDB {
  id?: number;
  businessId: number;
  locale: string;
  name: string;
  description: string;
  services: string;
}

export interface ArticleDB {
  id?: number;
  slug: string;
  category: string;
  readingTime: number;
  publishedAt: Date;
  updatedAt: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface ArticleTranslationDB {
  id?: number;
  articleId: number;
  locale: string;
  title: string;
  excerpt: string;
  content: string;
}

// Database class
export class ArmeniaLifeHubDB extends Dexie {
  users!: Table<UserDB, number>;
  hostels!: Table<HostelDB, number>;
  hostelTranslations!: Table<HostelTranslationDB, number>;
  roomTypes!: Table<RoomTypeDB, number>;
  roomTypeTranslations!: Table<RoomTypeTranslationDB, number>;
  bookings!: Table<BookingDB, number>;
  jobs!: Table<JobDB, number>;
  jobTranslations!: Table<JobTranslationDB, number>;
  jobApplications!: Table<JobApplicationDB, number>;
  businesses!: Table<BusinessDB, number>;
  businessTranslations!: Table<BusinessTranslationDB, number>;
  articles!: Table<ArticleDB, number>;
  articleTranslations!: Table<ArticleTranslationDB, number>;

  constructor() {
    super('ArmeniaLifeHubDB');
    
    this.version(1).stores({
      users: '++id, &email, role, createdAt',
      hostels: '++id, &slug, city, published, createdAt',
      hostelTranslations: '++id, hostelId, locale, [hostelId+locale]',
      roomTypes: '++id, hostelId, type',
      roomTypeTranslations: '++id, roomTypeId, locale, [roomTypeId+locale]',
      bookings: '++id, hostelId, userId, status, checkIn, checkOut, createdAt',
      jobs: '++id, companyId, city, employmentType, published, createdAt',
      jobTranslations: '++id, jobId, locale, [jobId+locale]',
      jobApplications: '++id, jobId, userId, status, createdAt',
      businesses: '++id, category, city, verified, createdAt',
      businessTranslations: '++id, businessId, locale, [businessId+locale]',
      articles: '++id, &slug, category, status, publishedAt',
      articleTranslations: '++id, articleId, locale, [articleId+locale]',
    });
  }
}

export const db = new ArmeniaLifeHubDB();
