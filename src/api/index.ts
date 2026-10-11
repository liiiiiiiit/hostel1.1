// API Layer - Simulates Express.js REST API
// In production, this would be a separate Node.js server

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export class APIError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

// Middleware simulation
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

// Response helpers
export function success<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

export function error(message: string, statusCode?: number): ApiResponse<null> {
  return { success: false, error: message };
}

// API Routes simulation
export const API = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      try {
        if (!validateEmail(email)) {
          return error('Invalid email format', 400);
        }
        if (!validatePassword(password)) {
          return error('Password must be at least 8 characters', 400);
        }
        
        const { AuthService } = await import('../services/auth.service');
        const user = await AuthService.login(email, password);
        
        if (!user) {
          return error('Invalid credentials', 401);
        }
        
        return success({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }, 'Login successful');
      } catch (err) {
        return error('Internal server error', 500);
      }
    },

    register: async (email: string, password: string, name: string) => {
      try {
        if (!validateEmail(email)) {
          return error('Invalid email format', 400);
        }
        if (!validatePassword(password)) {
          return error('Password must be at least 8 characters', 400);
        }
        if (!name || name.trim().length < 2) {
          return error('Name must be at least 2 characters', 400);
        }
        
        const { AuthService } = await import('../services/auth.service');
        const user = await AuthService.register(email, password, name);
        
        if (!user) {
          return error('Email already exists', 409);
        }
        
        return success({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }, 'Registration successful');
      } catch (err) {
        return error('Internal server error', 500);
      }
    },
  },

  // Hostel endpoints
  hostels: {
    getAll: async (publishedOnly = true) => {
      try {
        const { HostelService } = await import('../services/hostel.service');
        const hostels = await HostelService.getAll(publishedOnly);
        return success(hostels);
      } catch (err) {
        return error('Failed to fetch hostels', 500);
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { HostelService } = await import('../services/hostel.service');
        const hostel = await HostelService.getBySlug(slug);
        if (!hostel) {
          return error('Hostel not found', 404);
        }
        return success(hostel);
      } catch (err) {
        return error('Failed to fetch hostel', 500);
      }
    },
  },

  // Booking endpoints
  bookings: {
    create: async (data: {
      hostelId: number;
      userId: number;
      roomTypeId: number;
      checkIn: string;
      checkOut: string;
      guests: number;
      guestName: string;
      guestEmail: string;
    }) => {
      try {
        // Validation
        if (!data.guestName || data.guestName.trim().length < 2) {
          return error('Guest name is required', 400);
        }
        if (!validateEmail(data.guestEmail)) {
          return error('Invalid email format', 400);
        }
        if (data.guests < 1) {
          return error('At least 1 guest required', 400);
        }
        if (new Date(data.checkIn) >= new Date(data.checkOut)) {
          return error('Check-out must be after check-in', 400);
        }

        // Check availability
        const { BookingService } = await import('../services/hostel.service');
        const isAvailable = await BookingService.checkAvailability(
          data.hostelId,
          data.roomTypeId,
          data.checkIn,
          data.checkOut
        );

        if (!isAvailable) {
          return error('Room not available for selected dates', 409);
        }

        // Calculate total price
        const { db } = await import('../database/schema');
        const room = await db.roomTypes.get(data.roomTypeId);
        if (!room) {
          return error('Room type not found', 404);
        }

        const nights = Math.ceil(
          (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24)
        );
        const totalPrice = room.pricePerNight * nights;

        // Create booking
        const booking = await BookingService.create({
          ...data,
          totalPrice,
        });

        return success(booking, 'Booking created successfully');
      } catch (err) {
        return error('Failed to create booking', 500);
      }
    },

    updateStatus: async (id: number, status: string) => {
      try {
        const { BookingService } = await import('../services/hostel.service');
        await BookingService.updateStatus(id, status as any);
        return success(null, 'Booking status updated');
      } catch (err) {
        return error('Failed to update booking', 500);
      }
    },

    getByUserId: async (userId: number) => {
      try {
        const { BookingService } = await import('../services/hostel.service');
        const bookings = await BookingService.getByUserId(userId);
        return success(bookings);
      } catch (err) {
        return error('Failed to fetch bookings', 500);
      }
    },

    getAll: async () => {
      try {
        const { BookingService } = await import('../services/hostel.service');
        const bookings = await BookingService.getAll();
        return success(bookings);
      } catch (err) {
        return error('Failed to fetch bookings', 500);
      }
    },
  },

  // Job endpoints
  jobs: {
    getAll: async (publishedOnly = true) => {
      try {
        const { JobService } = await import('../services/job.service');
        const jobs = await JobService.getAll(publishedOnly);
        return success(jobs);
      } catch (err) {
        return error('Failed to fetch jobs', 500);
      }
    },

    getById: async (id: number) => {
      try {
        const { JobService } = await import('../services/job.service');
        const job = await JobService.getById(id);
        if (!job) {
          return error('Job not found', 404);
        }
        return success(job);
      } catch (err) {
        return error('Failed to fetch job', 500);
      }
    },
  },

  // Job Application endpoints
  jobApplications: {
    create: async (data: {
      jobId: number;
      userId: number;
      coverLetter: string;
      applicantName: string;
      applicantEmail: string;
    }) => {
      try {
        if (!data.coverLetter || data.coverLetter.trim().length < 10) {
          return error('Cover letter must be at least 10 characters', 400);
        }
        if (!validateEmail(data.applicantEmail)) {
          return error('Invalid email format', 400);
        }

        const { JobApplicationService } = await import('../services/job.service');
        const application = await JobApplicationService.create(data);
        return success(application, 'Application submitted successfully');
      } catch (err) {
        return error('Failed to submit application', 500);
      }
    },

    getByUserId: async (userId: number) => {
      try {
        const { JobApplicationService } = await import('../services/job.service');
        const applications = await JobApplicationService.getByUserId(userId);
        return success(applications);
      } catch (err) {
        return error('Failed to fetch applications', 500);
      }
    },

    getAll: async () => {
      try {
        const { JobApplicationService } = await import('../services/job.service');
        const applications = await JobApplicationService.getAll();
        return success(applications);
      } catch (err) {
        return error('Failed to fetch applications', 500);
      }
    },
  },

  // Business endpoints
  businesses: {
    getAll: async () => {
      try {
        const { BusinessService } = await import('../services/content.service');
        const businesses = await BusinessService.getAll();
        return success(businesses);
      } catch (err) {
        return error('Failed to fetch businesses', 500);
      }
    },
  },

  // Article endpoints
  articles: {
    getAll: async (status?: 'draft' | 'published' | 'archived') => {
      try {
        const { ArticleService } = await import('../services/content.service');
        const articles = await ArticleService.getAll(status);
        return success(articles);
      } catch (err) {
        return error('Failed to fetch articles', 500);
      }
    },

    getBySlug: async (slug: string) => {
      try {
        const { ArticleService } = await import('../services/content.service');
        const article = await ArticleService.getBySlug(slug);
        if (!article) {
          return error('Article not found', 404);
        }
        return success(article);
      } catch (err) {
        return error('Failed to fetch article', 500);
      }
    },
  },

  // Admin endpoints
  admin: {
    getStats: async () => {
      try {
        const { AuthService } = await import('../services/auth.service');
        const { HostelService, BookingService } = await import('../services/hostel.service');
        const { JobService, JobApplicationService } = await import('../services/job.service');
        const { BusinessService, ArticleService } = await import('../services/content.service');

        const [
          totalUsers,
          totalHostels,
          pendingBookings,
          totalJobs,
          totalBusinesses,
          publishedArticles,
        ] = await Promise.all([
          (await AuthService.getAllUsers()).length,
          HostelService.count(),
          BookingService.countByStatus('PENDING'),
          JobService.count(),
          BusinessService.count(),
          ArticleService.countByStatus('published'),
        ]);

        return success({
          totalUsers,
          totalHostels,
          pendingBookings,
          totalJobs,
          totalBusinesses,
          publishedArticles,
        });
      } catch (err) {
        return error('Failed to fetch stats', 500);
      }
    },
  },
};
