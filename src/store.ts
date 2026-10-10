import { User, Booking, JobApplication, Locale } from './types';
import { DEMO_USERS, DEMO_PASSWORDS } from './data/constants';
import { HOSTELS } from './data/hostels';
import { JOBS } from './data/jobs';
import { BUSINESSES, ARTICLES } from './data/content';

const STORAGE_KEYS = {
  USERS: 'alh_users',
  CURRENT_USER: 'alh_current_user',
  BOOKINGS: 'alh_bookings',
  APPLICATIONS: 'alh_applications',
  LOCALE: 'alh_locale',
  NOTIFICATIONS: 'alh_notifications',
};

// Initialize demo data
function initializeStore() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEMO_USERS));
  }
  if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
    const sampleBookings: Booking[] = generateSampleBookings();
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(sampleBookings));
  }
  if (!localStorage.getItem(STORAGE_KEYS.APPLICATIONS)) {
    const sampleApps: JobApplication[] = generateSampleApplications();
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(sampleApps));
  }
}

function generateSampleBookings(): Booking[] {
  const statuses: Booking['status'][] = ['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'];
  const bookings: Booking[] = [];
  for (let i = 0; i < 30; i++) {
    const hostel = HOSTELS[i % HOSTELS.length];
    const room = hostel.rooms[i % hostel.rooms.length];
    const checkIn = new Date(2026, 4, 1 + (i % 28));
    const nights = 1 + (i % 5);
    const checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + nights);
    bookings.push({
      id: `bk${i + 1}`,
      hostelId: hostel.id,
      userId: `u${(i % 5) + 1}`,
      roomTypeId: room.id,
      checkIn: checkIn.toISOString().split('T')[0],
      checkOut: checkOut.toISOString().split('T')[0],
      guests: 1 + (i % 3),
      status: statuses[i % statuses.length],
      createdAt: new Date(2026, 3, 1 + (i % 28)).toISOString(),
      guestName: `Guest ${i + 1}`,
      guestEmail: `guest${i + 1}@example.com`,
      totalPrice: room.pricePerNight * nights,
    });
  }
  return bookings;
}

function generateSampleApplications(): JobApplication[] {
  const statuses: JobApplication['status'][] = ['SUBMITTED', 'UNDER_REVIEW', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'];
  const apps: JobApplication[] = [];
  for (let i = 0; i < 20; i++) {
    const job = JOBS[i % JOBS.length];
    apps.push({
      id: `app${i + 1}`,
      jobId: job.id,
      userId: `u${(i % 4) + 2}`,
      status: statuses[i % statuses.length],
      coverLetter: `I am very interested in this position. I have relevant experience and skills.`,
      createdAt: new Date(2026, 2, 1 + (i % 28)).toISOString(),
      applicantName: `Applicant ${i + 1}`,
      applicantEmail: `applicant${i + 1}@example.com`,
    });
  }
  return apps;
}

// Auth functions
export function login(email: string, password: string): User | null {
  const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  const demoUser = DEMO_USERS.find(u => u.email === email);
  if (demoUser && DEMO_PASSWORDS[email] === password) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(demoUser));
    return demoUser;
  }
  const user = users.find(u => u.email === email);
  if (user) {
    const storedPasswords: Record<string, string> = JSON.parse(localStorage.getItem('alh_passwords') || '{}');
    if (storedPasswords[email] === password) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return user;
    }
  }
  return null;
}

export function register(email: string, password: string, name: string): User | null {
  const users: User[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
  if (users.find(u => u.email === email) || DEMO_USERS.find(u => u.email === email)) {
    return null;
  }
  const newUser: User = {
    id: `u${Date.now()}`,
    email,
    name,
    role: 'GUEST',
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  const passwords: Record<string, string> = JSON.parse(localStorage.getItem('alh_passwords') || '{}');
  passwords[email] = password;
  localStorage.setItem('alh_passwords', JSON.stringify(passwords));
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
  return newUser;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
}

// Locale
export function getLocale(): Locale {
  return (localStorage.getItem(STORAGE_KEYS.LOCALE) as Locale) || 'en';
}

export function setLocale(locale: Locale) {
  localStorage.setItem(STORAGE_KEYS.LOCALE, locale);
}

// Bookings
export function getBookings(): Booking[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]');
}

export function getUserBookings(userId: string): Booking[] {
  return getBookings().filter(b => b.userId === userId);
}

export function getHostelBookings(hostelId: string): Booking[] {
  return getBookings().filter(b => b.hostelId === hostelId);
}

export function createBooking(booking: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
  const bookings = getBookings();
  const newBooking: Booking = {
    ...booking,
    id: `bk${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'PENDING',
  };
  bookings.push(newBooking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  return newBooking;
}

export function updateBookingStatus(bookingId: string, status: Booking['status']) {
  const bookings = getBookings();
  const idx = bookings.findIndex(b => b.id === bookingId);
  if (idx >= 0) {
    bookings[idx].status = status;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }
}

// Job Applications
export function getApplications(): JobApplication[] {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.APPLICATIONS) || '[]');
}

export function getUserApplications(userId: string): JobApplication[] {
  return getApplications().filter(a => a.userId === userId);
}

export function getJobApplications(jobId: string): JobApplication[] {
  return getApplications().filter(a => a.jobId === jobId);
}

export function createApplication(app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>): JobApplication {
  const apps = getApplications();
  const newApp: JobApplication = {
    ...app,
    id: `app${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'SUBMITTED',
  };
  apps.push(newApp);
  localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  return newApp;
}

export function updateApplicationStatus(appId: string, status: JobApplication['status']) {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === appId);
  if (idx >= 0) {
    apps[idx].status = status;
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  }
}

// Data exports
export { HOSTELS, JOBS, BUSINESSES, ARTICLES };
export { initializeStore };
