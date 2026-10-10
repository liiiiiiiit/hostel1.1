import { User, UserRole } from '../types';

export const DEMO_USERS: User[] = [
  { id: 'u1', email: 'admin@demo.example.com', name: 'Super Admin', role: 'SUPER_ADMIN' as UserRole, createdAt: '2024-01-01' },
  { id: 'u2', email: 'hostel.manager@demo.example.com', name: 'Armen Hostel Manager', role: 'HOSTEL_MANAGER' as UserRole, createdAt: '2024-01-15' },
  { id: 'u3', email: 'employer@demo.example.com', name: 'Tech Armenia HR', role: 'EMPLOYER' as UserRole, createdAt: '2024-02-01' },
  { id: 'u4', email: 'jobseeker@demo.example.com', name: 'Maria Johnson', role: 'JOB_SEEKER' as UserRole, createdAt: '2024-03-10' },
  { id: 'u5', email: 'guest@demo.example.com', name: 'John Smith', role: 'GUEST' as UserRole, createdAt: '2024-04-05' },
];

export const DEMO_PASSWORDS: Record<string, string> = {
  'admin@demo.example.com': 'DemoAdmin!2026#Hub',
  'hostel.manager@demo.example.com': 'DemoHostel!2026#Hub',
  'employer@demo.example.com': 'DemoEmployer!2026#Hub',
  'jobseeker@demo.example.com': 'DemoSeeker!2026#Hub',
  'guest@demo.example.com': 'DemoGuest!2026#Hub',
};

export const CITIES = ['Yerevan', 'Gyumri', 'Sevan', 'Dilijan', 'Vanadzor'] as const;

export const BUSINESS_CATEGORIES = [
  'Dental Clinics', 'Beauty Salons', 'Barbershops', 'Pharmacies', 'Restaurants',
  'Cafes', 'Grocery Stores', 'Currency Exchange', 'Mobile Phone Repair',
  'Computer Repair', 'Laundry Services', 'Language Schools', 'Transportation',
  'Legal Services', 'Administrative Services', 'Fitness Centers', 'Healthcare'
] as const;

export const ARTICLE_CATEGORIES = [
  'Living in Armenia', 'Travel', 'Transportation', 'Cost of Living',
  'Housing', 'Employment', 'Education', 'Healthcare', 'Banking',
  'Internet', 'Culture', 'Cities', 'Newcomer Tips'
] as const;
